import { Col, Form, InputNumber, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import {
    changeAssignment,
    changeFinal,
    changeFinalPractice,
    changeFinalTheory,
    changeGpa,
    changeQuiz,
} from '../../../../store/syllabus/updateSyllabusSlice';
import './AssignmentSchema.scss';
import { formRules } from '../../../../constants/formRules';
import ErrorText from '../../CreateSyllabus/ErrorText';
function AssessmentSchemeCreate({ dataSource }) {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.updateSyllabus);

    const assessmentSchema = useSelector(
        (state) => state.updateSyllabus.assignmentSchema
    );
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Assessment scheme</h2>
            <div className={styles.body}>
                <div className="assessment-schema">
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="quiz"
                                labelCol={{
                                    span: 4,
                                }}
                                label=<p>Quiz</p>
                                colon={false}
                                labelAlign="left"
                                rules={formRules}
                                initialValue={assessmentSchema.quiz}
                            >
                                <InputNumber
                                    onChange={(value) => {
                                        // checkErrorComponentMark();
                                        dispatch(changeQuiz({ value }));
                                    }}
                                    min={1}
                                    max={100}
                                    addonAfter="%"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{
                                    span: 4,
                                }}
                                colon={false}
                                name="assignment"
                                label="Assignment"
                                labelAlign="left"
                                rules={formRules}
                                initialValue={assessmentSchema.assignment}
                            >
                                <InputNumber
                                    min={1}
                                    max={100}
                                    onChange={(value) => {
                                        // checkErrorComponentMark();
                                        dispatch(changeAssignment({ value }));
                                    }}
                                    addonAfter="%"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{
                                    span: 4,
                                }}
                                name="final"
                                label="Final"
                                colon={false}
                                labelAlign="left"
                                rules={formRules}
                                initialValue={assessmentSchema.finalAssessment}
                            >
                                <InputNumber
                                    min={1}
                                    max={100}
                                    onChange={(value) => {
                                        // checkErrorComponentMark();
                                        dispatch(changeFinal({ value }));
                                    }}
                                    addonAfter="%"
                                />
                            </Form.Item>
                        </Col>
                        {data.isAssessmentSchemaValid.errorSection?.includes(
                            'assessment-schema'
                        ) && (
                            <Col span={24}>
                                <p
                                    style={{
                                        color: 'red',
                                        fontStyle: 'italic',
                                        height: '30px',
                                        lineHeight: '30px',
                                    }}
                                >
                                    The sum of the component scores must equal
                                    100%!
                                </p>
                            </Col>
                        )}
                    </Row>
                </div>
                <div className="final-schema">
                    <Row align="middle" className={styles.separate} gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                    span: 10,
                                }}
                                labelAlign="left"
                                colon={false}
                                wrapperCol={{
                                    span: 24,
                                }}
                                name="final-theory"
                                label="Final Theory"
                                rules={formRules}
                                initialValue={assessmentSchema.finalTheory}
                            >
                                <InputNumber
                                    min={1}
                                    max={100}
                                    onChange={(value) => {
                                        dispatch(changeFinalTheory({ value }));
                                    }}
                                    addonAfter="%"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                    span: 12,
                                }}
                                colon={false}
                                wrapperCol={{
                                    span: 24,
                                }}
                                name="final-practice"
                                label="Final Practice"
                                rules={formRules}
                                initialValue={assessmentSchema.finalPractice}
                            >
                                <InputNumber
                                    min={1}
                                    max={100}
                                    onChange={(value) => {
                                        dispatch(
                                            changeFinalPractice({ value })
                                        );
                                    }}
                                    addonAfter="%"
                                />
                            </Form.Item>
                        </Col>
                        {data.isAssessmentSchemaValid.errorSection?.includes(
                            'final-schema'
                        ) && (
                            <Col span={24}>
                                <p
                                    style={{
                                        color: 'red',
                                        fontStyle: 'italic',
                                        height: '30px',
                                        lineHeight: '30px',
                                    }}
                                >
                                    The sum of the final component scores must
                                    equal 100%!
                                </p>
                            </Col>
                        )}
                    </Row>
                </div>

                <div className="gpa">
                    <Row style={{ marginTop: '16px' }}>
                        <Col span={24}>
                            <Form.Item
                                labelCol={{
                                    span: 4,
                                }}
                                name="gpa"
                                label="GPA"
                                colon={false}
                                labelAlign="left"
                                rules={formRules}
                                initialValue={assessmentSchema.gpa}
                            >
                                <InputNumber
                                    onChange={(value) =>
                                        dispatch(changeGpa({ value }))
                                    }
                                />
                            </Form.Item>
                        </Col>
                        {data.isAssessmentSchemaValid.errorSection?.includes(
                            'gpa'
                        ) && (
                            <Col span={24}>
                                <p
                                    style={{
                                        color: 'red',
                                        fontStyle: 'italic',
                                        height: '30px',
                                        lineHeight: '30px',
                                    }}
                                >
                                    Gpa must be between 0.0 and 4.0!
                                </p>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default AssessmentSchemeCreate;
