import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/Snake.module.scss";

const Snake = ({ segments }) => {
    return (
        <div className={styles.snakeContainer}>
            {segments.map((segment, index) => (
                <div
                    key={index}
                    className={`${styles.segment} ${index === 0 ? styles.head : ''}`}
                    style={{
                        transform: `translate(${segment.x * 15.1}px, ${segment.y * 15}px)`
                    }}
                />
            ))}
        </div>
    );
};

Snake.propTypes = {
    segments: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Snake;