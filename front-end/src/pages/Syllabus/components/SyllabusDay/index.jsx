import PropTypes from 'prop-types';
import styles from './style.module.scss';
import Unit from '../Unit';

SyllabusDay.propTypes = {
    dayInfo: PropTypes.object.isRequired,
    unitInfo: PropTypes.object.isRequired,
};

function SyllabusDay({ dayInfo, chapterInfo, unitInfo }) {
    const flattenUnit = unitInfo.reduce((accumulator, current) => [...accumulator, ...current], []);

    const filterUnit = flattenUnit.filter((unit) => unit.syllabusDayId === dayInfo.id);

    const unitRender = filterUnit.filter((unit) => unit.isDeleted === false || unit.isDeleted === null);

    return (
        <div className={styles.container}>
            <div className={styles['day-header']}>
                <div className={styles['day-content']}>
                    <p className={styles['day-id']}>{`Day ${dayInfo.dayNo}`}</p>
                </div>
            </div>
            <div className={styles['unit-list']}>
                <ul className={styles['unit-list-wrapper']}>
                    {unitRender.map((unit, idx) => (
                        <li
                            className={styles['unit-item']}
                            key={idx}
                        >
                            <Unit
                                unitInfo={unit}
                                chapterInfo={chapterInfo}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SyllabusDay;
