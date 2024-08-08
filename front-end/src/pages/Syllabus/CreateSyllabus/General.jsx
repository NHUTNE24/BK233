import { InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAttendeeNumber,
    setCourseObjective,
    setLevel,
    setTechnicalRequirement,
} from '../../../store/syllabus/updateSyllabusSlice';
import WordEditor from '../components/WordEditor';
import ErrorText from './ErrorText';

function General({
    courseRef,
    dataSource,
    onFormChange,
    form,
    attendeeNumberRef,
    technicalRef,
    levelRef,
}) {
    const data = useSelector((state) => state.updateSyllabus);

    const dispatch = useDispatch();

    const changeCourseContent = (value) => {
        dispatch(setCourseObjective({ courseObjective: value }));
    };

    const changeTechnicalContent = (value) => {
        dispatch(setTechnicalRequirement({ technicalRequirement: value }));
    };

    return (
        <>
            <div className="general-tab-create">
                <div ref={levelRef} style={{ paddingTop: '12px' }}>
                    <label style={{ marginRight: '89px', marginLeft: '8px' }}>
                        Level <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                        className={
                            data.isGeneralValid.errorSection.includes('level')
                                ? 'input-error'
                                : 'input-normal'
                        }
                        style={{ minWidth: '200px' }}
                        value={data.general.level}
                        onChange={(e) => dispatch(setLevel({ level: e }))}
                    >
                        <Select.Option value="Beginner">Beginner</Select.Option>
                        <Select.Option value="Intermediate">
                            Intermediate
                        </Select.Option>
                        <Select.Option value="Advanced">Advanced</Select.Option>
                    </Select>
                </div>
                {data.isGeneralValid.errorSection.includes('level') && (
                    <p
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: '12px',
                            marginLeft: '148px',
                            padding: '2px',
                        }}
                    >
                        Level is required!
                    </p>
                )}

                <div
                    ref={attendeeNumberRef}
                    style={{
                        display: 'flex',
                        marginTop: '16px',
                        alignItems: 'center',
                    }}
                >
                    <label style={{ marginRight: '4px', marginLeft: '8px' }}>
                        Attendee number
                    </label>
                    <span style={{ color: 'red', marginRight: '8px' }}>*</span>

                    <InputNumber
                        min={1}
                        style={{ width: '200px' }}
                        value={data.general.attendeeNumber}
                        onChange={(e) => {
                            dispatch(setAttendeeNumber({ attendeeNumber: e }));
                        }}
                        className={
                            data.isGeneralValid.errorSection.includes(
                                'attendee-number'
                            )
                                ? 'input-error'
                                : 'input-normal'
                        }
                    />
                </div>
                {data.isGeneralValid.errorSection.includes(
                    'attendee-number'
                ) && (
                    <p
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: '12px',
                            marginLeft: '140px',
                            padding: '2px',
                        }}
                    >
                        Attendee number is required!
                    </p>
                )}

                <div className="contenteditable">
                    <p className="subtitle1 ">
                        Technical Requirement(s){' '}
                        <span style={{ color: 'red' }}>*</span>
                    </p>
                    <div ref={technicalRef}>
                        <WordEditor
                            content={data.general.technicalContent}
                            setContent={(value) =>
                                changeTechnicalContent(value)
                            }
                            errorStyle={
                                data.isGeneralValid.errorSection.includes(
                                    'technical'
                                )
                                    ? true
                                    : false
                            }
                        />
                        {data.isGeneralValid.errorSection.includes(
                            'technical'
                        ) && (
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: 'red',
                                    fontStyle: 'italic',
                                }}
                            >
                                Technical requirement is require!
                            </p>
                        )}
                    </div>
                    <ErrorText />
                    {/* </Form.Item> */}
                    <p className="subtitle1 ">
                        Course Objectives{' '}
                        <span style={{ color: 'red' }}>*</span>
                    </p>
                    <div ref={courseRef}>
                        <WordEditor
                            content={data.general.courseContent}
                            setContent={changeCourseContent}
                            errorStyle={
                                data.isGeneralValid.errorSection.includes(
                                    'course-objective'
                                )
                                    ? true
                                    : false
                            }
                        />
                    </div>
                    {data.isGeneralValid.errorSection.includes(
                        'course-objective'
                    ) && (
                        <p
                            style={{
                                fontSize: '12px',
                                color: 'red',
                                fontStyle: 'italic',
                            }}
                        >
                            Course objective is require!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default General;
