import { useSelector } from 'react-redux';
import TimeAllocationVertical from '../TimeAllocationVertical';
import styles from './style.module.scss';
import SyllabusDay from '../SyllabusDay';

function OutlineTab() {
    // Redux state
    const data = useSelector((state) => state.syllabusDetail);

    const flattenUnitChapters = data.unitChapters ? data.unitChapters.reduce((acc, cur) => [...acc, ...cur], []) : [];

    const availableChapters = flattenUnitChapters.filter(
        (chapter) => chapter.isDeleted === false || chapter.isDeleted === null,
    );

    const totalDuration = availableChapters.reduce((acc, cur) => acc + cur.duration, 0);

    const deliveryType = data.deliveryTypes;

    const totalDurationPerDeliveryType = deliveryType.map((type) => {
        return {
            name: type.name,
            duration: availableChapters.reduce((acc, cur) => {
                return cur.deliveryTypeId === type.id ? acc + cur.duration : acc + 0;
            }, 0),
        };
    });

    const percentDurationPerDeliveryType = totalDurationPerDeliveryType.map((type) => {
        return {
            ...type,
            value: ((type.duration / totalDuration) * 100).toFixed(0),
        };
    });

    if (percentDurationPerDeliveryType.length > 0) {
        percentDurationPerDeliveryType[percentDurationPerDeliveryType.length - 1].value =
            100 -
            percentDurationPerDeliveryType
                .slice(0, percentDurationPerDeliveryType.length - 1)
                .reduce((acc, cur) => acc + cur.value, 0);
    }
    return (
        <div className={styles.container}>
            <div className={styles['day-list']}>
                <ul className={styles['day-list-wrapper']}>
                    {data.syllabusDays.map((day, index) => (
                        <li
                            key={index}
                            className={styles['day-item']}
                        >
                            <SyllabusDay
                                dayInfo={day}
                                chapterInfo={data.unitChapters}
                                unitInfo={data.syllabusUnits}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <TimeAllocationVertical data={percentDurationPerDeliveryType} />
        </div>
    );
}

export default OutlineTab;
