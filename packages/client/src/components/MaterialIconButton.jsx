import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "../styles/components/MaterialIconButton.module.scss";

const MaterialIconButton = ({ iconName: initialIconName, className, clickSound, onClick }) => {
    const navigate = useNavigate();

    const [currentIconName, setCurrentIconName] = useState(initialIconName);
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [isMusicOn, setIsMusicOn] = useState(true);

    const audioRef = useRef(null);

    const handleClick = async (e) => {
        if (audioRef.current && clickSound) {
            audioRef.current.currentTime = 0;
            await audioRef.current.play().catch(error => {
                console.error("Erreur lors de la lecture du son :", error);
            });
        }

        if (onClick) {
            setTimeout(() => {
                onClick(e);
            }, 800);
        }

        if (initialIconName === "west") {
            setTimeout(() => {
                navigate(-1);
            }, 800);
        }
        else if (initialIconName === "volume_up" || initialIconName === "volume_off") {
            setCurrentIconName(currentIconName === "volume_up" ? "volume_off" : "volume_up");
        }
        else if (initialIconName === "music_note" || initialIconName === "music_off") {
            setCurrentIconName(currentIconName === "music_note" ? "music_off" : "music_note");
        }
    };

    return (
        <>
            <span
                className={`material-symbols-outlined ${styles.materialButton} ${className}`}
                onClick={handleClick}
            >
                {currentIconName}
            </span>
            {clickSound && <audio ref={audioRef} src={clickSound} preload="auto" />}
        </>
    );
};

export default MaterialIconButton;