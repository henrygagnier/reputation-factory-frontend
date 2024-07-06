"use client";

import styles from "./page.module.css";
import { useState } from "react";
import AdminRoles from "@/components/adminRoles/comp";
import Deployer from "@/components/deploy/comp";
import TokenInput from "@/components/tokenInput/comp";
import TokensDeployed from "@/components/tokensDeployed/comp";

interface InputStrings {
  tokenName: string;
  tokenDescription: string;
  tokenType: string;
}

interface InputFiles {
  imageFile: File | null;
  previewUrl: string | null;
}

export default function Home() {
  const [inputStrings, setInputStrings] = useState<InputStrings[]>([
    { tokenName: "", tokenDescription: "", tokenType: "option1" },
  ]);

  const [inputFiles, setInputFiles] = useState<InputFiles[]>([
    { imageFile: null, previewUrl: null },
  ]);

  const [admins, setAdmins] = useState<string[]>([]);
  const [updaters, setUpdaters] = useState<string[]>([]);
  const [owner, setOwner] = useState<string>("");

  const addInput = () => {
    setInputStrings([...inputStrings, { tokenName: "", tokenDescription: "", tokenType: "option1" }]);
    setInputFiles([...inputFiles, { imageFile: null, previewUrl: null }]);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newInputStrings = [...inputStrings];
    newInputStrings[index][name as keyof InputStrings] = value;
    setInputStrings(newInputStrings);
  };

  const handleImageChange = (index: number, acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    const newInputFiles = [...inputFiles];
    newInputFiles[index].imageFile = selectedFile;

    const reader = new FileReader();
    reader.onloadend = () => {
      newInputFiles[index].previewUrl = reader.result as string;
      setInputFiles(newInputFiles);
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeInput = (index: number) => {
    const newInputStrings = [...inputStrings];
    const newInputFiles = [...inputFiles];
    newInputStrings.splice(index, 1);
    newInputFiles.splice(index, 1);
    setInputStrings(newInputStrings);
    setInputFiles(newInputFiles);
  };

  return (
    <main className={styles.main}>
      <div className={styles.createToken}>
        <div className={styles.title}>
          <p className={styles.header}>Token Metadata</p>
          <p className={styles.subheader}>The basic details of your NFTs.</p>
        </div>
        <div className={styles.inputs}>
          {inputStrings.map((inputString, index) => (
            <TokenInput
              key={index}
              index={index}
              tokenName={inputString.tokenName}
              tokenDescription={inputString.tokenDescription}
              previewUrl={inputFiles[index].previewUrl}
              imageFile={inputFiles[index].imageFile}
              onInputChange={handleInputChange}
              onImageChange={handleImageChange}
              onRemove={removeInput}
              onAdd={addInput}
              isLast={index === inputStrings.length - 1}
              inputLength={inputStrings.length}
              tokenType={inputString.tokenType}
            />
          ))}
        </div>
      </div>
      <AdminRoles setAdmins={setAdmins} setUpdaters={setUpdaters} setOwner={setOwner} admins={admins} updaters={updaters} owner={owner}/>
      <Deployer updaters={updaters} owner={owner} admins={admins} tokenData={inputStrings} files={inputFiles} />
      <TokensDeployed/>
    </main>
  );
}