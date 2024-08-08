import { Collapse, Input, Popconfirm, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { IoIosAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import UnitChapterCreate from '../UnitChapterCreate';
import {
    addChapter,
    changeUnitName,
    deleteUnit,
} from '../../../../store/syllabus/updateSyllabusSlice';

UnitCreate.propTypes = {
    indexDay: PropTypes.number.isRequired,
    indexUnit: PropTypes.number.isRequired,
};

function UnitCreate({
    indexDay,
    indexUnit,
    unitInfo,
    dataSource,
    deliveryTypeList,
    outputStandardList,
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
                            <div className={styles['unit-header']}>
                                <p
                                    className={styles['unit-no']}
                                >{`Unit ${indexUnit + 1}`}</p>
                                <div className={styles['delete-unit-btn']}>
                                    <Popconfirm
                                        title=<div
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
                                                Delete unit
                                            </p>
                                        </div>
                                        description=<p
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: '#000',
                                                marginBottom: '24px',
                                                marginTop: '12px',
                                            }}
                                        >
                                            Delete all content of the Unit?
                                        </p>
                                        onConfirm={() =>
                                            dispatch(
                                                deleteUnit({
                                                    indexDay,
                                                    indexUnit,
                                                })
                                            )
                                        }
                                        // onCancel={(e) => console.log(e)}
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
                            <div className={styles['unit-body']}>
                                <div className={styles['unit-name-wrapper']}>
                                    <label
                                        style={{ marginRight: '16px' }}
                                        htmlFor="unitName"
                                    >
                                        Name
                                    </label>
                                    <div>
                                        <Input
                                            id="unitName"
                                            onChange={(e) =>
                                                dispatch(
                                                    changeUnitName({
                                                        indexDay,
                                                        indexUnit,
                                                        name: e.target.value,
                                                    })
                                                )
                                            }
                                            value={
                                                syllabusDays[indexDay]
                                                    .syllabusUnits[indexUnit]
                                                    .unitName
                                            }
                                            name="unitName"
                                            placeholder="Unit name"
                                            className={
                                                !syllabusDays[indexDay]
                                                    .syllabusUnits[indexUnit]
                                                    .unitName
                                                    ? styles['input-error']
                                                    : styles['input-normal']
                                            }
                                        />
                                        {!syllabusDays[indexDay].syllabusUnits[
                                            indexUnit
                                        ].unitName && (
                                            <div
                                                style={{
                                                    color: 'red',
                                                    fontSize: '12px',
                                                    padding: '4px',
                                                }}
                                            >
                                                Unit name is required!
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {syllabusDays[indexDay].syllabusUnits[indexUnit]
                                    .unitChapters &&
                                    syllabusDays[indexDay].syllabusUnits[
                                        indexUnit
                                    ].unitChapters.map((chapter, idx) => (
                                        <UnitChapterCreate
                                            key={idx}
                                            indexDay={indexDay}
                                            indexUnit={indexUnit}
                                            indexChapter={idx}
                                            dataSource={dataSource}
                                            outputStandardList={
                                                outputStandardList
                                            }
                                            deliveryTypeList={deliveryTypeList}
                                        />
                                    ))}

                                <div
                                    onClick={() =>
                                        dispatch(
                                            addChapter({ indexDay, indexUnit })
                                        )
                                    }
                                    className={styles['add-chapter-btn']}
                                >
                                    <Tooltip
                                        placement="left"
                                        title="Add new chapter"
                                    >
                                        <IoIosAddCircleOutline size={20} />
                                    </Tooltip>
                                </div>
                            </div>
                        ),
                    },
                ]}
                collapsible="icon"
            ></Collapse>
        </div>
    );
}

export default UnitCreate;
