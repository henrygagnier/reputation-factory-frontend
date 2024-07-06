"use client"

import React, { useState } from 'react';
import styles from "./comp.module.css";
import { useStorageUpload } from '@thirdweb-dev/react';
import { useWriteContract, useAccount } from 'wagmi';
import { factoryContract } from '@/constants/config';

interface InputStrings {
    tokenName: string;
    tokenDescription: string;
    tokenType: string;
}

interface InputFiles {
    imageFile: File | null;
    previewUrl: string | null;
}

interface AdminRolesProps {
    admins: string[];
    updaters: string[];
    owner: string;
    tokenData: InputStrings[];
    files: InputFiles[];
}

const Deployer: React.FC<AdminRolesProps> = ({ admins, updaters, owner, tokenData, files }) => {
    const { chainId } = useAccount();
    const { mutateAsync: upload } = useStorageUpload();
    const { data: hash, writeContract, isPending,error } = useWriteContract();
    console.log(error)

    const [ state, setState ] = useState<number>(0);
    // 0 = nothing
    // 1 = ipfs
    // 2 = eth

    const uploadToIpfs = async (file: File) => {
        const uploadUrl = await upload({
            data: [file],
            options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
        });
        return uploadUrl;
    };

    const formatMetadata = (name: string, desc: string, IPFS: string) => {
        const obj = {
            "name": name,
            "description": desc,
            "image": IPFS,
        };
        const strObj = JSON.stringify(obj);
        const blob = new Blob([strObj], { type: 'application/json' });
        const file = new File([blob], 'data.json', { type: 'application/json' });
        return file;
    }

    function convertOptions(arr: string[]): number[] {
        const optionMapping: { [key: string]: number } = {
            "option1": 0,
            "option2": 1,
            "option3": 2
        };

        return arr.map(option => optionMapping[option]);
    }

    const deploy = async () => {
        try {
            setState(1);
    
            // Upload image files to IPFS
            const IPFS = await Promise.all(files.map(async (file) => {
                if (file.imageFile) {
                    const result = await uploadToIpfs(file.imageFile);
                    return result[0];
                }
                return null;
            }));
    
            // Remove any null values that might have been returned
            const validIPFS = IPFS.filter((url) => url !== null);
    
            // Upload metadata to IPFS
            const metadata = await Promise.all(validIPFS.map(async (ipfsUrl, index) => {
                const tokenDataItem = tokenData[index];
                const metadataFile = formatMetadata(tokenDataItem.tokenName, tokenDataItem.tokenDescription, ipfsUrl);
                const result = await uploadToIpfs(metadataFile);
                return result[0];
            }));
            const tokenTypes = tokenData.map(item => item.tokenType);
    
            setState(0);
            await writeContract({
                ...factoryContract[chainId ? chainId : 10],
                functionName: 'deploy',
                args: [owner as `0x${string}`, admins as `0x${string}`[], updaters as `0x${string}`[], convertOptions(tokenTypes), metadata]
            });
        } catch (error) {
            console.error("Error deploying contract:", error);
        }
    };
    
    return (
        <div className={styles.createToken}>
            <div className={styles.title}>
                <p className={styles.header}>Deploy</p>
                <p className={styles.subheader}>Deploy your reputation tokens and earn OP!</p>
            </div>
            <div className={styles.inputs}>
                <button className={`${styles.deployButton} ${state !== 0 || isPending ? styles.deployButtonDisabled : ""}`} onClick={() => deploy()}>{isPending ? "Deploying..." : state === 1 ? "Uploading Data..." : "Deploy"}</button>
            </div>
        </div>
    );
};

export default Deployer;