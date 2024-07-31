import { useEffect, useState } from 'react';
import { Col, Form, InputNumber, Row, Select } from 'antd';
import { formRules } from '../../constants/formRules';
import WordEditor from '../../components/WordEditor';
import { useDispatch, useSelector } from 'react-redux';
import { updateGeneral } from '../../store/syllabus/createSyllabusSlice';

function General() {
    const dispatch = useDispatch();
    // const general = useSelector((state) => state.createSyllabus.general);
    const [level, setLevel] = useState('Beginner');
    const [attendeeNumber, setAttendeeNumber] = useState(null);
    const [technicalContent, setTechnicalContent] = useState(`<ul>
      <li>Microsoft SQL Server 2005 Express (in which the trainees can create & manipulate on their own database)</li>
      <li>Microsoft Visual Studio 2017</li>
      <li>Microsoft Office 2007 (Visio, Word, PowerPoint)</li>
    </ul>`);
    const [courseContent, setCourseContent] = useState(`
                            <p>This topic is to introduce about C# programming language knowledge; adapt trainees with skills, lessons and practices which
is specifically used in the</p>
<p>
Fsoft projects.
</p>

        <p>In details, after completing the topic, trainees will:</p>
        <ul>
            <li>Understand basic concepts of high-level programming languages (keyword, statement, operator, control-of-flow)</li>
            <li>Understand and distinguish two concepts: class (Class) and object (Object)</li>
            <li>Understand and apply object-oriented programming knowledge to resolve simple problems (Inheritance, Encapsulation, Abstraction, Polymorphism)</li>
        </ul>
    `);

    useEffect(() => {
        dispatch(
            updateGeneral({
                level,
                attendeeNumber,
                technicalContent,
                courseContent,
            })
        );
    }, [technicalContent, courseContent, level, attendeeNumber]);

    return (
        <>
            <Row>
                <Col span={6}>
                    <Form.Item
                        className="form-group"
                        labelAlign="left"
                        label={<b>Level</b>}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        name="level"
                        // rules={rules}
                    >
                        <Select
                            // className="custom-select-one"
                            defaultValue={'Beginner'}
                            value={level}
                            onChange={(e) => setLevel(e)}
                        >
                            <Select.Option value="Beginner">
                                Beginner
                            </Select.Option>
                            <Select.Option value="Intermediate">
                                Intermediate
                            </Select.Option>
                            <Select.Option value="Advanced">
                                Advanced
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Form.Item
                        className="form-group"
                        label={<b>Attendee Number</b>}
                        labelCol={{ span: 14 }}
                        labelAlign="left"
                        wrapperCol={{ span: 10 }}
                        validateTrigger="onBlur"
                        name="attendeeNumber"
                        rules={formRules}
                    >
                        <InputNumber
                            min={1}
                            className="width-100"
                            value={attendeeNumber}
                            onChange={(e) => {
                                setAttendeeNumber(e || null);
                            }}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <div className="contenteditable">
                <p className="subtitle1 ">Technical Requirement(s)</p>
                <WordEditor
                    content={technicalContent}
                    setContent={setTechnicalContent}
                />
                <p className="subtitle1 ">Course Objectives</p>
                <WordEditor
                    content={courseContent}
                    setContent={setCourseContent}
                />
            </div>
        </>
    );
}

export default General;
