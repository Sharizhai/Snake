import React, { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/Grid.module.scss";

const Grid = ({ size = 20, children}) => {
    const grid = useMemo(() => {
        const rows = [];
        
        for (let i = 0; i < size; i++) {
            const cells = [];
            
            for (let j = 0; j < size; j++) {
                cells.push(
                    <div 
                        key={`cell-${i}-${j}`} 
                        className={styles.cell} 
                        data-position={`${i}-${j}`}
                    />
                );
            }
            
            rows.push(
                <div key={`row-${i}`} className={styles.row}>
                    {cells}
                </div>
            );
        }
        
        return rows;
    }, [size]);

    return <div className={styles.grid}>{grid}{children}</div>;
};

Grid.propTypes = {
    size: PropTypes.number
};

export default Grid;