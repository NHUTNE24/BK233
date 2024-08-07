import { useSelector } from 'react-redux';
import WordEditor from '../WordEditor';
import AssessmentSchemeCreate from './../AssignmentSchemaCreate/index';
import TimeAllocation from './../TimeAllocation/index';
import styles from './style.module.scss';
import TrainingPrinciple from './TrainingPrinciple';
import './OtherTabCreate.scss';
import { Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';

OthersTabCreate.PropTypes = {
    dataSource: PropTypes.object,
};

function OthersTabCreate({
    dataSource,
    outputStandardList,
    deliveryTypeList,
    form,
}) {
    const syllabusDays = useSelector(
        (state) => state.updateSyllabus.syllabusDays
    );

    const data = useSelector((state) => state.updateSyllabus);
    const flattenUnitChapters = data.syllabusDay.reduce((acc, cur) => {
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
        <div className="others-tab-create">
            <Form form={form}>
                <div className={styles.container}>
                    <div className={styles.criteria}>
                        <Row gutter={[20, 10]}>
                            <Col span={10}>
                                <TimeAllocation
                                    id="time-allocation"
                                    minHeight="385.33px"
                                    height="100%"
                                    data={percentDurationPerDeliveryType}
                                />
                            </Col>
                            <Col span={14}>
                                <AssessmentSchemeCreate />
                            </Col>
                        </Row>
                    </div>
                    <div className={styles['principle-wrapper']}>
                        <TrainingPrinciple />
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default OthersTabCreate;
