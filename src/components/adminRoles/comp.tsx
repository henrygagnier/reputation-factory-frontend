import React, { useState } from 'react';
import styles from "./comp.module.css";

import { nullAddress } from '@/constants/config';
import { isAddress } from 'viem';

interface AdminRolesProps {
  setAdmins: React.Dispatch<React.SetStateAction<string[]>>;
  setUpdaters: React.Dispatch<React.SetStateAction<string[]>>;
  setOwner: React.Dispatch<React.SetStateAction<string>>;
  admins: string[];
  updaters: string[];
  owner: string;
}

const AdminRoles: React.FC<AdminRolesProps> = ({ setAdmins, setUpdaters, setOwner, admins, updaters, owner }) => {
  const [adminInputs, setAdminInputs] = useState<string[]>(['']);
  const [updaterInputs, setUpdaterInputs] = useState<string[]>(['']);

  const handleAdminChange = (index: number, value: string) => {
    const newAdmins = [...adminInputs];
    newAdmins[index] = value;
    setAdminInputs(newAdmins);
    setAdmins(newAdmins);
  };

  const handleUpdaterChange = (index: number, value: string) => {
    const newUpdaters = [...updaterInputs];
    newUpdaters[index] = value;
    setUpdaterInputs(newUpdaters);
    setUpdaters(newUpdaters);
  };

  const handleOwnerChange = (value: string) => {
    setOwner(value)
  };

  const addAdminInput = () => {
    setAdminInputs([...adminInputs, '']);
  };

  const addUpdaterInput = () => {
    setUpdaterInputs([...updaterInputs, '']);
  };

  const removeAdminInput = (index: number) => {
    const newAdmins = adminInputs.filter((_, i) => i !== index);
    setAdminInputs(newAdmins);
    setAdmins(newAdmins);
  };

  const removeUpdaterInput = (index: number) => {
    const newUpdaters = updaterInputs.filter((_, i) => i !== index);
    setUpdaterInputs(newUpdaters);
    setUpdaters(newUpdaters);
  };

  const isErrorOwner = !isAddress(owner);

  return (
    <div className={styles.createToken}>
      <div className={styles.title}>
        <p className={styles.header}>Admin Roles</p>
        <p className={styles.subheader}>The admins who can change details about your tokens.</p>
      </div>
      <div className={styles.inputs}>
        <div>
        <p className={styles.role}>Owner</p>
        <p className={styles.roledesc}>The owner modifies collection details in marketplaces.</p>
        <input
                type="text"
                onChange={(e) => handleOwnerChange(e.target.value)}
                placeholder={nullAddress}
                className={`${styles.roleInputFull} ${isErrorOwner && styles.error}`}
              />
        </div>
        <div>
          <p className={styles.role}>Admins</p>
          <p className={styles.roledesc}>Admins add and remove token updaters.</p>
          {adminInputs.map((input, index) => (
            <div key={index} className={styles.inputRow}>
              <input
                type="text"
                value={input}
                onChange={(e) => handleAdminChange(index, e.target.value)}
                placeholder={nullAddress}
                className={`${styles.roleInput} ${!isAddress(admins[index]) && styles.error}`}
              />
              <button onClick={adminInputs.length === 1 ? () => {} : () => removeAdminInput(index)} className={`${styles.modifyInputs} ${adminInputs.length === 1 && styles.disabled}`}>×</button>
              {index === adminInputs.length - 1 && <button onClick={addAdminInput} className={styles.modifyInputs}>+</button>}
            </div>
          ))}
        </div>
        <div>
          <p className={styles.role}>Updaters</p>
          <p className={styles.roledesc}>Updaters can update the type of token (Transferable, Soulbound, or Redeemable), and the token Metadata.</p>
          {updaterInputs.map((input, index) => (
            <div key={index} className={styles.inputRow}>
              <input
                type="text"
                value={input}
                onChange={(e) => handleUpdaterChange(index, e.target.value)}
                placeholder={nullAddress}
                className={`${styles.roleInput} ${!isAddress(updaters[index]) && styles.error}`}
              />
              <button onClick={updaterInputs.length === 1 ? () => {} : () => removeUpdaterInput(index)} className={`${styles.modifyInputs} ${updaterInputs.length === 1 && styles.disabled}`}>×</button>
              {index === updaterInputs.length - 1 && <button onClick={addUpdaterInput} className={styles.modifyInputs}>+</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminRoles;