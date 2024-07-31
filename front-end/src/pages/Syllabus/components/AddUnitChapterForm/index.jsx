import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { GoChecklist } from 'react-icons/go';
import { LiaHandPaper } from 'react-icons/lia';
import { LuBookMarked, LuSpellCheck } from 'react-icons/lu';
import { RiBaseStationLine, RiUserVoiceLine } from 'react-icons/ri';
import styles from './style.module.scss';
import './AddUnitChapterForm.scss';
AddUnitChapterForm.propTypes = {
    handleCloseModal: PropTypes.func,
    handleFetchChapter: PropTypes.func.isRequired,
    unitInfo: PropTypes.object.isRequired,
    handleReloadData: PropTypes.func.isRequired,
};

function AddUnitChapterForm({ handleCloseModal, unitInfo, handleFetchChapter, handleReloadData }) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        handleCloseModal();
    };

    const rules = [
        {
            required: true,
            message: (
                <span
                    className={styles.footnote}
                    style={{ color: 'red', fontStyle: 'italic' }}
                >
                    This field is required
                </span>
            ),
        },
    ];

    // const handleUpdateModifiedDate = async () => {
    //     try {
    //         const result = await axios.post(`http://localhost:8080/syllabus/${unitInfo.id}`, values, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (result.status === 200) {
    //             console.log('ADD CHAPTER SUCCESSFUL');
    //             handleFetchChapter(unitInfo.id);
    //             handleReloadData();
    //         } else {
    //             console.log('Failed to add chapter');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     form.resetFields();
    //     handleCloseModal();
    //     console.log(values);
    // };


    const handleSubmitForm = async (values) => {
        try {
            const result = await axios.post(`http://localhost:8080/unit-chapter/${unitInfo.id}`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (result.status === 200) {
                handleFetchChapter(unitInfo.id);
                handleReloadData();
            } else {
                console.log('Failed to add chapter');
            }
        } catch (error) {
            console.error(error);
        }
        form.resetFields();
        handleCloseModal();
    };
    return (
        <div className={styles.container}>
            <Form
                form={form}
                colon={false}
                className={styles['create-form']}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmitForm}
                autoComplete="off"
            >
                <Form.Item
                    className={styles['form-group']}
                    label=<span>Name</span>
                    name="name"
                    rules={rules}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Output Standard"
                    name="outputStandard"
                    rules={rules}
                >
                    <Select
                        className={styles['custom-search-icon']}
                        allowClear
                        suffixIcon={<SearchOutlined />}
                    >
                        <Select.Option value="H4SD">H4SD</Select.Option>
                        <Select.Option value="H6SD">H6SD</Select.Option>
                        <Select.Option value="K6SD">K6SD</Select.Option>
                        <Select.Option value="K4SD">K4SD</Select.Option>
                        <Select.Option value="K5HD">K5HD</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Training Time"
                    name="duration"
                    rules={rules}
                >
                    <InputNumber placeholder="Minutes" />
                </Form.Item>
                <Form.Item
                    label="Delivery Type"
                    name="deliveryType"
                    rules={rules}
                >
                    <Select
                        placeholder="Select one"
                        className={styles['custom-select-one']}
                    >
                        <Select.Option value="Assignment/Lab">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#2C5282',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                <LuBookMarked style={{ marginRight: '12px' }} />
                                Assignment/Lab
                            </div>
                        </Select.Option>
                        <Select.Option value="Concept/Lecture">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#2C5282',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                <RiUserVoiceLine style={{ marginRight: '12px' }} />
                                Concept/Lecture
                            </div>
                        </Select.Option>
                        <Select.Option value="Guide/Review">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#2C5282',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                <LiaHandPaper style={{ marginRight: '12px' }} />
                                Guide/Review
                            </div>
                        </Select.Option>
                        <Select.Option value="Test/Quiz">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#2C5282',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                <GoChecklist style={{ marginRight: '12px' }} />
                                Test/Quiz
                            </div>
                        </Select.Option>
                        <Select.Option value="Exam">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#2C5282',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                <LuSpellCheck style={{ marginRight: '12px' }} />
                                Exam
                            </div>
                        </Select.Option>
                        <Select.Option value="Seminar/Workshop">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#2C5282',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                <RiBaseStationLine style={{ marginRight: '12px' }} />
                                Seminar/Workshop
                            </div>
                        </Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<b>Method</b>}
                    name="isOnline"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch
                        // className={styles['switch-custom'] }
                        className="switch-custom"
                        defaultChecked={false}
                        checkedChildren="Online"
                        unCheckedChildren="Offline"
                        // style={{
                        //     backgroundColor: 'red',
                        // }}
                    />
                </Form.Item>
                <Row className={styles['btn-wrapper']}>
                    <Form.Item>
                        <Button
                            onClick={handleCancel}
                            className={styles['cancel-btn']}
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            className={styles['create-btn']}
                        >
                            Create
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );
}

export default AddUnitChapterForm;
