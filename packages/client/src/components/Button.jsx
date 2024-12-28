import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from "../styles/components/Button.module.scss";

const Button = ({ onClick,
    label,
    type = "button",
    className,
    style,
    disabled = false,
    clickSound,
    ...props
}) => {
    const combinedClassName = `${styles.buttonDefault} ${className || ''}`;

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
    };

    return (
        <>
            <button
                type={type}
                onClick={handleClick}
                className={combinedClassName}
                disabled={disabled}
                style={style}
                {...props}
            >
                {label}
            </button>
            {clickSound && <audio ref={audioRef} src={clickSound} preload="auto" />}
        </>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    className: PropTypes.string,
    style: PropTypes.object,
    clickSound: PropTypes.string
};

export default Button;