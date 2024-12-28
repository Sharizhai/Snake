import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Button from "../components/Button";
import Snake_image from "../assets/Snake.png";
import clickSound from "../assets/sounds/click-sound.wav";

import styles from "../styles/pages/HomePage.module.scss";

const HomePage = () => {
    const navigate = useNavigate();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [playerThreeScore, setPlayerThreeScore] = useState(0);

    const handlePlayClick = () => {
        setIsButtonDisabled(true);
        navigate("/game");
    };

    return (
        <>
            <main className={styles.mainContainer}>
                <section>
                    <img src={Snake_image}
                        alt="image de serpent dans un style cyberpunk dans des tons rose bleu et violet"
                        className={styles.snake} />
                    <h1 className={styles.mainTitle}>SNAKE GAME</h1>
                    <h2 className={styles.title}>BEST SCORES</h2>
                    <p className={styles.playerScrore}>Player 1 : {playerOneScore}</p>
                    <p className={styles.playerScrore}>Player 2 : {playerTwoScore}</p>
                    <p className={styles.playerScrore}>Player 3 : {playerThreeScore}</p>
                </section>

                <Button 
                    label="Jouer"
                    clickSound={clickSound}
                    onClick={handlePlayClick}
                    disabled={isButtonDisabled}
                />
            </main>
        </>
    )
}

export default HomePage;