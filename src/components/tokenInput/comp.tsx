"use client";

import { useDropzone } from "react-dropzone";
import styles from "./comp.module.css";

interface TokenInputProps {
  index: number;
  tokenName: string;
  tokenDescription: string;
  tokenType: string | null;
  previewUrl: string | null;
  imageFile: File | null;
  onInputChange: (index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (index: number, acceptedFiles: File[]) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  isLast: boolean;
  inputLength: number;
}

export default function TokenInput({
  index,
  tokenName,
  tokenDescription,
  previewUrl,
  imageFile,
  onInputChange,
  onImageChange,
  onRemove,
  onAdd,
  isLast,
  inputLength,
  tokenType
}: TokenInputProps) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => onImageChange(index, acceptedFiles),
    multiple: false,
  });

  return (
    <div>
      <div className={styles.details}>
        <p className={styles.top}>#{index + 1}</p>
        <div className={styles.addInput}>
          <button
            type="button"
            className={`${styles.modifyInputs} ${inputLength === 1 ? styles.disabled : ""}`}
            onClick={() => onRemove(index)}
            disabled={inputLength === 1}
          >
            ×
          </button>
          {isLast && (
            <button type="button" className={styles.modifyInputs} onClick={onAdd}>
              +
            </button>
          )}
        </div>
      </div>
      <div className={styles.mdInputs}>
        <div className={styles.mdInput}>
          <p className={styles.label}>Token Name</p>
          <input
          className={`${styles.input} ${tokenName === "" && styles.error}`}
            placeholder="ATXDAO REP"
            name="tokenName"
            value={tokenName}
            onChange={(event) => onInputChange(index, event)}
          />
        </div>
        <div className={styles.mdInput}>
          <p className={styles.label}>Token Description</p>
          <input
            className={`${styles.input} ${tokenDescription === "" && styles.error}`}
            placeholder="This token tracks the reputation of DAO members."
            name="tokenDescription"
            value={tokenDescription}
            onChange={(event) => onInputChange(index, event)}
          />
        </div>
      </div>
      <div {...getRootProps()} className={`${styles.dropzone} ${previewUrl == null && styles.errorDropzone}`}>
        <input {...getInputProps()} />
        <p>
          {previewUrl != null
            ? `${imageFile?.name} uploaded! Click or drag and drop an image here to change the file.`
            : "Drag & drop an image here, or click to select one"}
        </p>
      </div>
      <div className={styles.threeWayRadio}>
        <input
          type="radio"
          id={`option1-${index}`}
          name="tokenType"
          value="option1"
          checked={tokenType === "option1"}
          onChange={(e) => onInputChange(index, e)}
          className={styles.hiddenRadio}
        />
        <label htmlFor={`option1-${index}`}className={`${styles.radioButton} ${tokenType === "option1" && styles.checked}`}>
          Transferable
        </label>
        <input
          type="radio"
          id={`option2-${index}`}
          name="tokenType"
          value="option2"
          checked={tokenType === "option2"}
          onChange={(e) => onInputChange(index, e)}
          className={styles.hiddenRadio}
        />
        <label htmlFor={`option2-${index}`} className={`${styles.radioButton} ${tokenType === "option2" && styles.checked}`}>
          Soulbound
        </label>
        <input
          type="radio"
          id={`option3-${index}`}
          name="tokenType"
          value="option3"
          checked={tokenType === "option3"}
          onChange={(e) => onInputChange(index, e)}
          className={styles.hiddenRadio}
        />
        <label htmlFor={`option3-${index}`} className={`${styles.radioButton} ${tokenType === "option3" && styles.checked}`}>
          Redeemable
        </label>
      </div>
    </div>
  );
}