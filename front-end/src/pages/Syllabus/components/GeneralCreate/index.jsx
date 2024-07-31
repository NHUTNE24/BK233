import { Col, Form, InputNumber, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import WordEditor from '../../components/WordEditor';
import { formRules } from '../../constants/formRules';
import {
    changeAttendeeNumber,
    setCourseObjective,
    setLevel,
    setTechnicalRequirement,
} from '../../store/syllabus/updateSyllabusSlice';
import './GeneralCreate.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
GeneralCreate.propTypes = {
    dataSource: PropTypes.object,
};
function GeneralCreate({ dataSource }) {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.updateSyllabus);

    const setTechnicalContent = (value) => {
        dispatch(
            setTechnicalRequirement({
                technicalRequirement: value,
            })
        );
    };

    const setCourseContent = (value) => {
        dispatch(
            setCourseObjective({
                courseObjective: value,
            })
        );
    };

    return (
        <>
            <Row style={{ marginBottom: '16px' }}>
                <Col span={12}>
                    <label
                        style={{ marginRight: '36px' }}
                        htmlFor="encoding-type"
                    >
                        Encoding type
                        <span style={{ marginLeft: '4px', color: 'red' }}>
                            *
                        </span>
                    </label>

                    <Select
                        onChange={(value) =>
                            dispatch(setLevel({ level: value }))
                        }
                        id="encoding-type"
                        value={data.general.level || 'Beginner'}
                        style={{ minWidth: '140px' }}
                    >
                        {/* <Select.Option value="Beginner">Auto detect</Select.Option> */}
                        <Select.Option value="Beginner">Beginner</Select.Option>
                        <Select.Option value="Intermediate">
                            Intermediate
                        </Select.Option>
                        <Select.Option value="Advanced">Advanced</Select.Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <label
                        style={{ marginRight: '16px' }}
                        htmlFor="attendee-number"
                    >
                        Attendee number
                        <span style={{ marginLeft: '4px', color: 'red' }}>
                            *
                        </span>
                    </label>
                    <InputNumber
                        id="attendee-number"
                        onChange={(value) =>
                            dispatch(
                                changeAttendeeNumber({ attendeeNumber: value })
                            )
                        }
                        min={1}
                        value={data.general.attendeeNumber}
                        className={
                            !data.general.attendeeNumber
                                ? 'input-error'
                                : 'input-normal'
                        }
                    />
                    {!data.general.attendeeNumber && (
                        <div
                            style={{
                                color: 'red',
                                fontSize: '12px',
                                padding: '4px',
                            }}
                        >
                            Attendee number is required!
                        </div>
                    )}
                </Col>
            </Row>

            <div className="contenteditable">
                <p className="subtitle1 ">Technical Requirement(s)</p>
                <WordEditor
                    content={data.general.technicalContent}
                    setContent={setTechnicalContent}
                />
                <p className="subtitle1 ">Course Objectives</p>
                <WordEditor
                    content={data.general.courseContent}
                    setContent={setCourseContent}
                />
            </div>
        </>
    );
}

export default GeneralCreate;
