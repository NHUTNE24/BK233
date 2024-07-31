import PropTypes from 'prop-types';
import styles from './style.module.scss';

LegendItem.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

function LegendItem({ color, name, value }) {
    return (
        <div className={styles.container}>
            <div
                style={{ backgroundColor: color }}
                className={styles.dot}
            ></div>
            <p className={styles.title}>{name}</p>
            <span className={styles.percent}>{`(${value}%)`}</span>
        </div>
    );
}

export default LegendItem;
