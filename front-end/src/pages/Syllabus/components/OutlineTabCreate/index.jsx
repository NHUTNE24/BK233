import { Button } from 'antd';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import SyllabusDayCreate from '../SyllabusDayCreate';
import TimeAllocationVertical from '../TimeAllocationVertical/index';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import { addDay } from '../../../../store/syllabus/updateSyllabusSlice';

OutlineTabCreate.PropTypes = {
    dataSource: PropTypes.object,
    outputStandardList: PropTypes.object,
    deliveryTypeList: PropTypes.object,
};

function OutlineTabCreate({
    dataSource,
    outputStandardList,
    deliveryTypeList,
}) {
    const dispatch = useDispatch();

    const syllabusDays = useSelector(
        (state) => state.updateSyllabus.syllabusDay
    );

    const flattenUnitChapters = syllabusDays.reduce((acc, cur) => {
        const chapters = cur.syllabusUnits.reduce((acc1, cur1) => {
            if (cur1.unitChapters) {
                return [...acc1, ...cur1.unitChapters];
            } else {
                return acc1;
            }
        }, []);
        return [...acc, ...chapters];
    }, []);

    const totalDuration = flattenUnitChapters.reduce(
        (acc, cur) => acc + cur.duration,
        0
    );

    const deliveryType = flattenUnitChapters.reduce(
        (acc, cur) => [...acc, cur.deliveryTypeId],
        []
    );

    const filterDeliveryType = [];

    deliveryType.forEach((item) => {
        if (!filterDeliveryType.includes(item)) {
            filterDeliveryType.push(item);
        }

    });

    const totalDurationPerDeliveryType = filterDeliveryType.map((type) => {
        return {
            name: deliveryTypeList.find((typ) => typ.id === type)?.name || null,
            duration: flattenUnitChapters.reduce((acc, cur) => {
                return cur.deliveryTypeId === type
                    ? acc + cur.duration
                    : acc + 0;
            }, 0),
        };
    });

    const percentDurationPerDeliveryType = totalDurationPerDeliveryType.map(
        (type) => {
            return {
                ...type,
                value: ((type.duration / totalDuration) * 100).toFixed(0),
            };
        }
    );

    const headLegendList = percentDurationPerDeliveryType.slice(
        0,
        percentDurationPerDeliveryType.length - 1
    );

    const headTotalPercent = headLegendList.reduce(
        (acc, cur) => acc + Number(cur.value),
        0
    );

    if (percentDurationPerDeliveryType.length >= 1) {
        percentDurationPerDeliveryType[
            percentDurationPerDeliveryType.length - 1
        ].value = 100 - headTotalPercent;
    }

    return (
        <div className={styles.container + ' outline-tab-create'}>
            <div className={styles.body}>
                {syllabusDays.map((day, idx) => (
                    <div className={styles['day-container']} key={idx}>
                        <SyllabusDayCreate
                            dayInfo={day}
                            indexDay={idx}
                            dataSource={dataSource}
                            outputStandardList={outputStandardList}
                            deliveryTypeList={deliveryTypeList}
                        />
                    </div>
                ))}
                <div className={styles['add-day-btn']}>
                    <Button
                        style={{
                            backgroundColor: '#2D3748',
                            color: '#fff',
                            fontWeight: 700,
                        }}
                        icon=<IoAddCircleOutline size={20} />
                        onClick={() => dispatch(addDay())}
                    >
                        Add day
                    </Button>
                </div>
            </div>
            <div className={styles['time-wrapper']}>
                <TimeAllocationVertical data={percentDurationPerDeliveryType} />
            </div>
        </div>
    );
}

export default OutlineTabCreate;
