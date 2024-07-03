"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import AdminRoles from "@/components/adminRoles/comp";

interface InputStrings {
  tokenName: string;
  tokenDescription: string;
}

interface InputFiles {
  imageFile: File | null;
  previewUrl: string | null;
}

export default function Home() {
  const [inputStrings, setInputStrings] = useState<InputStrings[]>([
    { tokenName: "", tokenDescription: "" },
  ]);

  const [inputFiles, setInputFiles] = useState<InputFiles[]>([
    { imageFile: null, previewUrl: null },
  ]);

  const [admins, setAdmins] = useState<string[]>([])
  const [updaters, setUpdaters] = useState<string[]>([])

  const addInput = () => {
    setInputStrings([...inputStrings, { tokenName: "", tokenDescription: "" }]);
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {"image/*":[]},
    onDrop: (acceptedFiles) => handleImageChange(inputFiles.length - 1, acceptedFiles),
    multiple: false,
  });

  return (
    <main className={styles.main}>
      <div className={styles.createToken}>
        <div className={styles.title}>
          <p className={styles.header}>Token Metadata</p>
          <p className={styles.subheader}>The basic details of your NFTs.</p>
        </div>
        <div className={styles.inputs}>
          {inputStrings.map((inputString, index) => (
            <div key={index}>
              <div className={styles.details}>
                <p className={styles.top}>#{index + 1}</p>
                <div className={styles.addInput}>
                  <button
                    type="button"
                    className={`${styles.modifyInputs} ${inputStrings.length === 1 ? styles.disabled : ""}`}
                    onClick={() => removeInput(index)}
                    disabled={inputStrings.length === 1}
                  >
                    ×
                  </button>
                  {index === inputStrings.length - 1 && (
                    <button type="button" className={styles.modifyInputs} onClick={addInput}>
                      +
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.mdInputs}>
                <div className={styles.mdInput}>
                  <p className={styles.label}>Token Name</p>
                  <input
                    className={styles.input}
                    placeholder="ATXDAO REP"
                    name="tokenName"
                    value={inputString.tokenName}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
                <div className={styles.mdInput}>
                  <p className={styles.label}>Token Description</p>
                  <input
                    className={styles.input}
                    placeholder="This token tracks the reputation of DAO members."
                    name="tokenDescription"
                    value={inputString.tokenDescription}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
              </div>
              <div {...getRootProps()} className={styles.dropzone}>
                <input {...getInputProps()} />
                <p>
                  {inputFiles[index].previewUrl != null
                    ? `${inputFiles[index].imageFile?.name} uploaded! Click or drag and drop an image here to change the file.`
                    : "Drag & drop an image here, or click to select one"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
          <AdminRoles setAdmins={setAdmins} setUpdaters={setUpdaters}/>
    </main>
  );
}
