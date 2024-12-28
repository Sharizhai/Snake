import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/Apple.module.scss";

const Apple = ({ color, position }) => {
    const style = {
        top: `${position.y * 15}px`,
        left: `${position.x * 15}px`,
        backgroundColor: color,
    };

    return (
        <div className={styles.apple} style={style} />
    );
};

Apple.propTypes = {
    color: PropTypes.string.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

export default Apple;