import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAudio } from '../context/AudioContext';

import styles from "../styles/components/MaterialIconButton.module.scss";

const MaterialIconButton = ({ iconName: initialIconName, className, clickSound, onClick }) => {
    const navigate = useNavigate();

    const [currentIconName, setCurrentIconName] = useState(initialIconName);

    const audioRef = useRef(null);
    const { isSoundEnabled, setIsSoundEnabled, isMusicEnabled, setIsMusicEnabled } = useAudio();

    const handleClick = async (e) => {
        if (audioRef.current && clickSound && isSoundEnabled) {
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
            setIsSoundEnabled(!isSoundEnabled);
        }
        else if (initialIconName === "music_note" || initialIconName === "music_off") {
            setIsMusicEnabled(!isMusicEnabled);
        }
    };

    const getIconName = () => {
        if (initialIconName === "volume_up" || initialIconName === "volume_off") {
            return isSoundEnabled ? "volume_up" : "volume_off";
        }
        if (initialIconName === "music_note" || initialIconName === "music_off") {
            return isMusicEnabled ? "music_note" : "music_off";
        }
        return initialIconName;
    };

    return (
        <>
            <span
                className={`material-symbols-outlined ${styles.materialButton} ${className}`}
                onClick={handleClick}
            >
                {getIconName()}
            </span>
            {clickSound && <audio ref={audioRef} src={clickSound} preload="auto" />}
        </>
    );
};

export default MaterialIconButton;