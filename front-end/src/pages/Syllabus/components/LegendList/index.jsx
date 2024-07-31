import styles from './style.module.scss';
import LegendItem from '../LegendItem';
import PropTypes from 'prop-types';

LegendList.propTypes = {};

function LegendList({ data }) {
    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <LegendItem
                    key={index}
                    color={item.color}
                    name={item.name}
                    value={item.value}
                />
            ))}
        </div>
    );
}

export default LegendList;
