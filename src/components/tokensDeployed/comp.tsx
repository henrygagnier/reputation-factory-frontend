import { useAccount, useReadContract } from "wagmi";
import { factoryContract, nullAddress } from "@/constants/config";
import styles from "./comp.module.css";
import { type Chain } from 'viem'

export default function TokensDeployed() {
    const { address, isConnected, chainId } = useAccount();
    const { data: _tokensDeployed } : {data: string[] | undefined} = useReadContract({
        ...factoryContract[chainId ? chainId : 10],
        functionName: 'getTokensDeployed',
        args: [address || nullAddress]
    })

    const tokensDeployed = _tokensDeployed ? _tokensDeployed : [];
    const burl = chainId === 11155420 ? "https://sepolia-optimism.etherscan.io/" : "https://optimistic.etherscan.io/";
    return (
        <div className={styles.createToken}>
            <div className={styles.title}>
                <p className={styles.header}>Tokens Deployed</p>
                <p className={styles.subheader}>The tokens you've created.</p>
            </div>
            <div className={styles.inputs}>
                
                {tokensDeployed.length === 0 ? <p>No tokens deployed!</p> : tokensDeployed.map((token: string, index: number) => {
                    return (
                        <div className={styles.tokenContainer} onClick={() => { navigator.clipboard.writeText(token) }}>
                            <p className={styles.index}>#{index + 1}</p>
                            <p className={`${styles.address} ${styles.big}`}>{token}</p>
                            <p className={`${styles.address} ${styles.small}`}>{token.slice(0, 6) + "..." + token.slice(38)}</p>
                            <p className={styles.explorer}><a href={burl + "/address/" + token} target="_blank">Etherscan</a></p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}