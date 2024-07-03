"use client";

import styles from "./comp.module.css";

interface OverlayProps {
    onClick: undefined | (() => void);
}

export const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className={styles.overlay}></div>
    )
}