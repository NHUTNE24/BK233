import TrainingDeliveryPrinciple from '../TrainingDeliveryPrinciple';
import AssessmentScheme from './../AssesmentScheme/index';
import TimeAllocation from './../TimeAllocation/index';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';

function OthersTab() {
    const data = useSelector((state) => state.syllabusDetail);

    const flattenUnitChapters = data.unitChapters ? data.unitChapters.reduce((acc, cur) => [...acc, ...cur], []) : [];

    const availableChapters = flattenUnitChapters.filter((ch) => ch.isDeleted === false || ch.isDeleted === null);

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
            <div className={styles.criteria}>
                <div
                    className="width50"
                    style={{ width: '50%' }}
                >
                    <div className={styles['time-wrapper']}>
                        <TimeAllocation
                            height="310px"
                            data={percentDurationPerDeliveryType}
                        />
                    </div>
                </div>
                <AssessmentScheme schema={data.assignmentSchema} />
            </div>
            <div className={styles['principle-wrapper']}>
                <TrainingDeliveryPrinciple />
            </div>
        </div>
    );
}

export default OthersTab;
