import PropTypes from 'prop-types';
import styles from './style.module.scss';
import UnitCreate from '../UnitCreate';
import { Button, Collapse, Popconfirm } from 'antd';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddCircleOutline } from 'react-icons/io5';
import {
    addUnit,
    deleteDay,
} from '../../../../store/syllabus/updateSyllabusSlice';

SyllabusDayCreate.propTypes = {
    indexDay: PropTypes.number.isRequired,
};

function SyllabusDayCreate({
    indexDay,
    dayInfo,
    dataSource,
    outputStandardList,
    deliveryTypeList,
}) {
    const dispatch = useDispatch();

    const syllabusDays = useSelector(
        (state) => state.updateSyllabus.syllabusDay
    );

    return (
        <div className={styles.container}>
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[
                    {
                        key: '1',
                        label: (
                            <div className={styles['day-header']}>
                                <p
                                    className={styles['day-no']}
                                >{`Day ${indexDay + 1}`}</p>
                                <div className={styles['delete-day-btn']}>
                                    <Popconfirm
                                        title={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    borderBottom:
                                                        '1px solid #E2E8F0',
                                                }}
                                            >
                                                <MdOutlineWarningAmber
                                                    size={20}
                                                    style={{
                                                        color: 'red',
                                                        marginRight: '12px',
                                                    }}
                                                />
                                                <p
                                                    style={{
                                                        color: '#2A4365',
                                                        fontSize: '16px',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    Delete day
                                                </p>
                                            </div>
                                        }
                                        description={
                                            <p
                                                style={{
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    color: '#000',
                                                    marginBottom: '24px',
                                                    marginTop: '12px',
                                                }}
                                            >
                                                Delete all content of the Day?
                                            </p>
                                        }
                                        onConfirm={() =>
                                            dispatch(deleteDay({ indexDay }))
                                        }
                                        // onCancel={}
                                        okText="Delete"
                                        icon={null}
                                        cancelButtonProps={{
                                            style: {
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                            },
                                        }}
                                        okButtonProps={{
                                            style: {
                                                backgroundColor: '#2D3748',
                                                fontSize: '14px',
                                                fontWeight: 700,
                                                padding: '15px 25px',
                                            },
                                        }}
                                        cancelText=<p
                                            style={{
                                                color: 'red',
                                                textDecoration: 'underline',
                                            }}
                                        >
                                            Cancel
                                        </p>
                                    >
                                        <IoMdRemoveCircleOutline
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        ),
                        children: (
                            <div className={styles['day-body']}>
                                {syllabusDays[indexDay].syllabusUnits &&
                                    syllabusDays[indexDay].syllabusUnits.map(
                                        (unit, idx) => (
                                            <div key={idx}>
                                                <UnitCreate
                                                    unitInfo={unit}
                                                    indexDay={indexDay}
                                                    indexUnit={idx}
                                                    dataSource={dataSource}
                                                    deliveryTypeList={
                                                        deliveryTypeList
                                                    }
                                                    outputStandardList={
                                                        outputStandardList
                                                    }
                                                />
                                                {idx !==
                                                    syllabusDays[indexDay]
                                                        .syllabusUnits.length -
                                                        1 && (
                                                    <div
                                                        className={
                                                            styles.separate
                                                        }
                                                    ></div>
                                                )}
                                            </div>
                                        )
                                    )}

                                <div className={styles['add-unit-btn']}>
                                    <Button
                                        style={{
                                            backgroundColor: '#474747',
                                            color: 'white',
                                            fontWeight: 700,
                                        }}
                                        icon={<IoAddCircleOutline size={20} />}
                                        onClick={() =>
                                            dispatch(addUnit({ indexDay }))
                                        }
                                    >
                                        Add unit
                                    </Button>
                                </div>
                            </div>
                        ),
                    },
                ]}
                collapsible="icon"
            />
        </div>
    );
}

export default SyllabusDayCreate;
