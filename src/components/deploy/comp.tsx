import React, { useState } from 'react';
import styles from "./comp.module.css";

import { nullAddress } from '@/constants/config';

interface AdminRolesProps {
  setAdmins: React.Dispatch<React.SetStateAction<string[]>>;
  setUpdaters: React.Dispatch<React.SetStateAction<string[]>>;
}

const AdminRoles: React.FC<AdminRolesProps> = ({ setAdmins, setUpdaters }) => {


  return (
    <div className={styles.createToken}>
      <div className={styles.title}>
        <p className={styles.header}>Admin Roles</p>
        <p className={styles.subheader}>The admins who can change details about your tokens.</p>
      </div>
      <div className={styles.inputs}>
      </div>
    </div>
  );
};

export default AdminRoles;