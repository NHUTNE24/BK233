import { BsFilter } from 'react-icons/bs';
import styles from './style.module.css';
FilterButton.propTypes = {};

function FilterButton() {
    return (
        <button className={styles['filter-btn']}>
            <BsFilter style={{ fontSize: '24px' }} />
            <p className={styles['filter-title']}>Filter</p>
        </button>
    );
}

export default FilterButton;
