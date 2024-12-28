import { useState, useEffect, useCallback, useRef } from "react";
import confetti from 'canvas-confetti';

import Grid from "../components/Grid";
import Snake from "../components/Snake";
import Apple from "../components/Apple";
import Button from "../components/Button";
import MaterialIconButton from "../components/MaterialIconButton";

import eatSound from '../assets/sounds/eat-sound.mp3';
import clickSound from "../assets/sounds/click-sound.wav";
import gameOverSound from '../assets/sounds/game-over-sound.wav';
import backgroundMusic from '../assets/music/game-music.wav';

import styles from "../styles/pages/GamePage.module.scss";

const GamePage = () => {
  const gridSize = 20;
  const initialSnake = [{ x: 10, y: 10 }];
  const initialDirection = { x: 0, y: 0 };
  const initialApple = { x: 5, y: 5, color: "red" };

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [playerScore, setPlayerScore] = useState(0);
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState(initialDirection);
  const [apple, setApple] = useState(initialApple);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [volume, setVolume] = useState(0.1);
  const backgroundMusicRef = useRef(null);

  const playEatSound = () => {
    const audio = new Audio(eatSound);
    audio.play();
  };

  const playGameOverSound = () => {
    const audio = new Audio(gameOverSound);
    audio.play();
  };

  const generateApple = useCallback(() => {
    let newApple;
    do {
      newApple = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
        color: Math.random() < 0.1 ? "purple" : "red",
      };
    } while (snake.some(segment => segment.x === newApple.x && segment.y === newApple.y));
  
    setApple(newApple);
  
    if (newApple.color === "purple") {
      setTimeout(() => {
        const redApple = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
          color: "red"
        };
        setApple(redApple);
      }, 8000);
    }
  }, [snake, gridSize]);

  const moveSnake = useCallback(() => {
    if (!isPlaying) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true); 
        setIsPlaying(false); 
        return initialSnake;
      }

      if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setIsPlaying(false);
        return initialSnake;
      }

      newSnake.unshift(head);

      if (apple && head.x === apple.x && head.y === apple.y) {
        playEatSound();
        triggerConfetti(apple.x, apple.y);
        setPlayerScore((prevScore) => prevScore + (apple.color === "purple" ? 10 : 1));
        generateApple();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, apple, generateApple, isPlaying]);

  const triggerConfetti = (x, y) => {

    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    angles.forEach(angle => {
      confetti({
        particleCount: 8,
        angle: angle,
        spread: 30, 
        origin: { y: 0.6 },
        gravity: 0.8,
        scalar: 0.7, 
        startVelocity: 15,
      });
    });
  };

  const startGame = () => {
    setSnake(initialSnake);
    setDirection({ x: 1, y: 0 });
    generateApple();
    setPlayerScore(0);
    setGameOver(false);
    setIsPlaying(true);
    handleBackgroundMusic('play');
  };

  const handleBackgroundMusic = useCallback((action) => {
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new Audio(backgroundMusic);
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = volume;
    }
  
    switch (action) {
      case 'play':
        backgroundMusicRef.current.play();
        break;
      case 'stop':
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
        break;
    }
  }, [volume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " ") {
        setIsPlaying((prev) => !prev);
      }

      if (!isPlaying) return;

      setDirection((prevDirection) => {
        switch (e.key) {
          case "ArrowUp":
          case "z":
            return prevDirection.y === 1 ? prevDirection : { x: 0, y: -1 };
          case "ArrowDown":
          case "s":
            return prevDirection.y === -1 ? prevDirection : { x: 0, y: 1 };
          case "ArrowLeft":
          case "q":
            return prevDirection.x === 1 ? prevDirection : { x: -1, y: 0 };
          case "ArrowRight":
          case "d":
            return prevDirection.x === -1 ? prevDirection : { x: 1, y: 0 };
          default:
            return prevDirection;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };
  
  const handleTouchMove = (e) => {
    if (!isPlaying) return;
  
    const touchEnd = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  
    const dx = touchEnd.x - touchStart.x;
    const dy = touchEnd.y - touchStart.y;
  
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 50) {
        setDirection(prev => prev.x === -1 ? prev : { x: 1, y: 0 });
      } else if (dx < -50) {
        setDirection(prev => prev.x === 1 ? prev : { x: -1, y: 0 });
      }
    } else {
      if (dy > 50) { 
        setDirection(prev => prev.y === -1 ? prev : { x: 0, y: 1 });
      } else if (dy < -50) {
        setDirection(prev => prev.y === 1 ? prev : { x: 0, y: -1 });
      }
    }
  
    setTouchStart({
      x: touchEnd.x,
      y: touchEnd.y
    });
  };

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [moveSnake, isPlaying]);

  useEffect(() => {
    if (gameOver) {
      handleBackgroundMusic('stop');
      playGameOverSound();
    }
  }, [gameOver, handleBackgroundMusic]);

  useEffect(() => {
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <main className={styles.mainContainer}>
        <MaterialIconButton clickSound={clickSound}
          iconName="west"
          className={styles.backButton} />

        <div className={styles.volumeButton}>
        <MaterialIconButton clickSound={clickSound}
          iconName="volume_up" />
          <MaterialIconButton clickSound={clickSound}
          iconName="music_note" 
          className={styles.musicIcon}/>
        </div>

        <section className={styles.gameContainer}>
          <p className={styles.playerScore}>Score : {playerScore}</p>
          <Grid size={gridSize}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}>
            <Snake segments={snake} />
            {apple && <Apple color={apple.color} position={{ x: apple.x, y: apple.y }} />}
          </Grid>

          {!isPlaying && (
            <div className={styles.buttonContainer}>
              <Button
                label={gameOver ? "Rejouer" : "Jouer"}
                onClick={startGame}
                clickSound={clickSound}
                className={styles.playButton}
              />
            </div>
          )}

        </section>
      </main>
    </>
  )
}

export default GamePage;