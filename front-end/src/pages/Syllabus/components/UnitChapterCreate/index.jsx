import { IoMdRemoveCircleOutline } from 'react-icons/io';
import styles from './style.module.scss';
import { Input, InputNumber, Select, Switch, Popconfirm } from 'antd';
import { MdOutlineWarningAmber } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
    changeChapterName,
    changeDeliveryType,
    changeDuration,
    changeMethod,
    changeOutputStandard,
    deleteChapter,
} from '../../../../store/syllabus/updateSyllabusSlice';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';

UnitChapterCreate.propTypes = {
    indexDay: PropTypes.number.isRequired,
    indexUnit: PropTypes.number.isRequired,
    indexChapter: PropTypes.number.isRequired,
};

function UnitChapterCreate({
    indexDay,
    indexUnit,
    outputStandardList = [],
    indexChapter,
    dataSource,
    deliveryTypeList = [],
}) {
    const dispatch = useDispatch();

    const syllabusDays = useSelector((state) => state.updateSyllabus.syllabusDay);

    // console.log('out: ', outputStandardList);

    // console.log('deliveryy', deliveryTypeList);
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', margin: '0 8px' }}>
                <label
                    style={{ marginRight: '16px' }}
                    htmlFor="chapter-name"
                >
                    Content
                </label>
                <div>
                    <Input
                        id="chapter-name"
                        onChange={(e) =>
                            dispatch(changeChapterName({ indexDay, indexUnit, indexChapter, name: e.target.value }))
                        }
                        value={syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].name}
                        name="chapterName"
                        placeholder="Chapter name"
                        className={
                            !syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].name
                                ? styles['input-error']
                                : styles['input-normal']
                        }
                    />
                    {!syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].name && (
                        <div style={{ color: 'red', fontSize: '12px', padding: '4px' }}>Chapter name is required!</div>
                    )}
                </div>
            </div>
            <div>
                <Select
                    style={{ flex: 1, margin: '0 8px', minWidth: '180px' }}
                    name="outputStandardName"
                    onChange={(value) =>
                        dispatch(changeOutputStandard({ indexDay, indexUnit, indexChapter, outputStandard: value }))
                    }
                    value={
                        outputStandardList.find(
                            (out) =>
                                out.id ===
                                syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
                                    .outputStandardId,
                        )?.code || null
                    }
                    placeholder="Output standard"
                    className={
                        !syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].outputStandardId
                            ? styles['input-error']
                            : styles['input-normal']
                    }
                >
                    {outputStandardList.length > 0 && (
                        <>
                            <Select.Option value={outputStandardList[0].id}>Engineering Knowledge</Select.Option>
                            <Select.Option value={outputStandardList[1].id}>Experimental Skills</Select.Option>
                            <Select.Option value={outputStandardList[2].id}>Design Skills</Select.Option>
                            <Select.Option value={outputStandardList[3].id}>Teamwork</Select.Option>
                            <Select.Option value={outputStandardList[4].id}>Problem Solving</Select.Option>
                        </>
                    )}
                </Select>

                {!syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].outputStandardId && (
                    <div style={{ color: 'red', fontSize: '12px', padding: '4px' }}>Output standard is required!</div>
                )}
            </div>

            <div>
                <InputNumber
                    style={{ flex: 1, margin: '0 8px', minWidth: '100px' }}
                    name="duration"
                    value={syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].duration || ''}
                    onChange={(value) =>
                        dispatch(changeDuration({ indexDay, indexUnit, indexChapter, duration: value }))
                    }
                    placeholder="Duration"
                    className={
                        !syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].duration
                            ? styles['input-error']
                            : styles['input-normal']
                    }
                />
                {!syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].duration && (
                    <div style={{ color: 'red', fontSize: '12px', padding: '4px' }}>Duration is required!</div>
                )}
            </div>

            <div>
                <Select
                    style={{ flex: 1, margin: '0 8px', minWidth: '200px' }}
                    onChange={(value) =>
                        dispatch(changeDeliveryType({ indexDay, indexUnit, indexChapter, deliveryType: value }))
                    }
                    name="deliveryType"
                    placeholder="Delivery type"
                    value={
                        deliveryTypeList.find(
                            (typ) =>
                                typ.id ===
                                syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter]
                                    .deliveryTypeId,
                        )?.name || null
                    }
                    className={
                        !syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].deliveryTypeId
                            ? styles['input-error']
                            : styles['input-normal']
                    }
                >
                    {deliveryTypeList.length > 0 && (
                        <>
                            <Select.Option value={deliveryTypeList.find((deli) => deli.name === 'Assignment/Lab').id}>
                                Assignment/Lab
                            </Select.Option>
                            <Select.Option value={deliveryTypeList.find((deli) => deli.name === 'Concept/Lecture').id}>
                                Concept/Lecture
                            </Select.Option>
                            <Select.Option value={deliveryTypeList.find((deli) => deli.name === 'Guide/Review').id}>
                                Guide/Review
                            </Select.Option>
                            <Select.Option value={deliveryTypeList.find((deli) => deli.name === 'Test/Quiz').id}>
                                Test/Quiz
                            </Select.Option>
                            <Select.Option value={deliveryTypeList.find((deli) => deli.name === 'Exam').id}>
                                Exam
                            </Select.Option>
                            <Select.Option value={deliveryTypeList.find((deli) => deli.name === 'Seminar/Workshop').id}>
                                Seminar/Workshop
                            </Select.Option>
                        </>
                    )}
                </Select>
                {!syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].deliveryTypeId && (
                    <div style={{ color: 'red', fontSize: '12px', padding: '4px' }}>Delivery type is required!</div>
                )}
            </div>

            <Switch
                style={{ padding: '0 4px', margin: '6px 8px' }}
                name="isOnline"
                onChange={(value) => dispatch(changeMethod({ indexDay, indexUnit, indexChapter, isOnline: value }))}
                className="switch-custom"
                defaultChecked={syllabusDays[indexDay].syllabusUnits[indexUnit].unitChapters[indexChapter].isOnline}
                checkedChildren="Online"
                unCheckedChildren="Offline"
            />

            <div className={styles['delete-unit-btn']}>
                <Popconfirm
                    title=<div
                        style={{
                            display: 'flex',
                            borderBottom: '1px solid #E2E8F0',
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
                            Delete chapter
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
                        Delete all content of the Chapter?
                    </p>
                    onConfirm={() => dispatch(deleteChapter({ indexDay, indexUnit, indexChapter }))}
                    onCancel={(e) => console.log(e)}
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
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                </Popconfirm>
            </div>
        </div>
    );
}

export default UnitChapterCreate;
