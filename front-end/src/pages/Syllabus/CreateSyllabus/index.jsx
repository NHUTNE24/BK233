import {
    Alert,
    Button,
    Col,
    Form,
    Input,
    Row,
    Space,
    Spin,
    message,
} from 'antd';
import { useEffect, useState } from 'react';
import TabsCustom from '../components/TabsCustom';
import { formRules } from '../../../constants/formRules';
import './CreateSyllabus.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetState,
    setStatus,
    updateBasicInfo,
} from '../../../store/syllabus/updateSyllabusSlice';
import SliderCustom from '../components/SliderCustom';
import { setSelectedKey } from '../../../store/app/siderBarSlice';
import axios from 'axios';

function CreateSyllabus() {
    const [activeTab, setActiveTab] = useState('1');
    const [basicInfoForm] = Form.useForm(); // Form instance for basic info
    const [tabsForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const createSyllabus = useSelector((state) => state.updateSyllabus);
    const navigate = useNavigate();

    const [outputStandardList, setOutputStandardList] = useState([]);
    const [deliveryTypeList, setDeliveryTypeList] = useState([]);

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);

    useEffect(() => {
        const fetchOutput = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:8080/api/output-standards'
                );
                if (result.status === 200) {
                    setOutputStandardList(result.data);
                } else {
                    console.error('Failed to fetch output list');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchOutput();
    }, []);

    useEffect(() => {
        const fetchDelivery = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:8080/api/delivery-type'
                );
                if (result.status === 200) {
                    setDeliveryTypeList(result.data);
                } else {
                    console.error('Failed to fetch deliveryType list');
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchDelivery();
    }, []);

    useEffect(() => {
        if (createSyllabus.isAssessmentSchemaValid.status === false) {
            // console.log(createSyllabus.isAssessmentSchemaValid);
            const errorSection = [
                ...createSyllabus.isAssessmentSchemaValid.errorSection,
            ];
            const tags = document.querySelectorAll(
                '.others-tab-create .validation-rules.active'
            );
            // console.log(tag);
            if (tags.length > 0) {
                tags.forEach((item) => {
                    item.classList.remove('active');
                });
            }
            errorSection.forEach((item) => {
                const errorDom = document.querySelector(`.${item}-validation`);
                if (errorDom) errorDom.classList.add('active');
            });

            // return;
        } else {
            const tags = document.querySelectorAll(
                '.others-tab-create .validation-rules.active'
            );
            // console.log(tag);
            if (tags.length > 0) {
                tags.forEach((item) => {
                    item.classList.remove('active');
                });
            }
        }
    }, [createSyllabus.isAssessmentSchemaValid]);

    // Tabs
    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handlePreviousTab = () => {
        const newIndex = parseInt(activeTab) - 1;
        if (newIndex >= 1) {
            setActiveTab(newIndex.toString());
        }
    };

    // Handle Save
    const handleSave = () => {
        Promise.all([basicInfoForm.validateFields(), tabsForm.validateFields()])
            .then((values) => {
                if (!createSyllabus.isGeneralValid.status) {
                    message.error('General tab must be filled!');
                    return;
                }
                if (!createSyllabus.isSyllabusDaysValid) {
                    message.error('Outline tab must be filled!');
                    return;
                }
                if (
                    !createSyllabus.isTrainingPrincipleValid ||
                    !createSyllabus.isAssessmentSchemaValid.status
                ) {
                    message.error('Others tab must be filled!');
                    return;
                }

                dispatch(setStatus({ status: 'Active' }));

                const createData = {
                    ...createSyllabus,
                    isAssessmentSchemaValid:
                        createSyllabus.isAssessmentSchemaValid.status,
                    userName: 'syllabus group', // Need replace by User info
                    status: 'Active',
                    isGeneralValid: createSyllabus.isGeneralValid.status,
                };

                // Perform logic to send data to the server here
                try {
                    const fetchApi = async () => {
                        setLoading(true);
                        const result = await axios.post(
                            `http://localhost:8080/api/syllabus`,
                            createData
                        );
                        if (result.status === 201) {
                            message.success('Create syllabus successfully!');
                            dispatch(setSelectedKey('/syllabus'));
                            navigate('/syllabus');
                            dispatch(resetState());
                            setLoading(false);
                        } else {
                            console.error('Failed to create syllabus');
                            setLoading(false);
                        }
                    };
                    fetchApi();
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
                if (errorInfo.errorFields) {
                    const firstErrorField = errorInfo.errorFields[0];
                    if (firstErrorField) {
                        message.error('Basic infomation must be filled!');
                        // console.log(firstErrorField);
                        basicInfoForm.scrollToField(firstErrorField.name[0], {
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }
            });
    };

    const handleSaveDraft = async () => {
        basicInfoForm
            .validateFields()
            .then(() => {
                try {
                    const saveDraftApi = async () => {
                        setLoading(true);

                        const result = await axios.post(
                            'http://localhost:8080/api/syllabus',
                            {
                                ...createSyllabus,
                                userName: 'Syllabus Group',
                                isAssessmentSchemaValid:
                                    createSyllabus.isAssessmentSchemaValid
                                        .status,
                                isGeneralValid:
                                    createSyllabus.isGeneralValid.status,
                                status: 'Draft',
                            }
                        );
                        if (result.status === 201) {
                            message.success('Draft saved successfully!');
                            navigate('/syllabus');
                            dispatch(setSelectedKey('/syllabus'));
                            setLoading(false);
                        } else {
                            message.error('Failed to save as draft!');
                            setLoading(false);
                        }
                    };
                    saveDraftApi();
                } catch (err) {
                    console.error(err);
                    setLoading(false);
                }
            })
            .catch((errorInfo) => {
                if (errorInfo.errorFields) {
                    const firstErrorField = errorInfo.errorFields[0];
                    if (firstErrorField) {
                        message.error('Basic infomation must be filled!');
                        basicInfoForm.scrollToField(firstErrorField.name[0], {
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }
            });
    };

    return (
        <div className="create-syllabus">
            {loading && <Spin fullscreen tip="Creating..."></Spin>}
            <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
            >
                <div className="create-syllabus__header">
                    <Row gutter={50} align="top">
                        <Col sm={6}>
                            <h4 className="create-syllabus__title header-title mb-20">
                                {' '}
                                Create Syllabus
                            </h4>
                        </Col>
                        <Col sm={8}>
                            <div className="progress-bar">
                                <SliderCustom state={createSyllabus} />
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="add-syllabus__basic-info">
                    <Form
                        id="basic-info-form"
                        form={basicInfoForm}
                        layout="horizontal"
                        labelAlign="left"
                        validateTrigger={['onBlur', 'onSubmit']}
                        onValuesChange={(_, allValues) => {
                            dispatch(updateBasicInfo(allValues)); // Dispatch action on value change
                        }}
                    >
                        <Row>
                            <Col span={14}>
                                <Form.Item
                                    wrapperCol={{ span: 16 }}
                                    label={<b>Syllabus Names</b>}
                                    name="syllabusName"
                                    rules={formRules}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    wrapperCol={{ span: 12 }}
                                    label={<b>Code</b>}
                                    name="code"
                                    validateTrigger="onBlur"
                                    rules={formRules}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    wrapperCol={{ span: 10 }}
                                    label={<b>Version</b>}
                                    name="version"
                                    validateTrigger="onBlur"
                                    rules={formRules}
                                    initialValue={'1.0'}
                                >
                                    <Input allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>

                <div className="create-syllabus__body">
                    <TabsCustom
                        dataSource={null}
                        deliveryTypeList={deliveryTypeList}
                        outputStandardList={outputStandardList}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        form={tabsForm}
                    />
                </div>

                <div className="create-syllabus__footer">
                    <div className="create-syllabus__footer-left">
                        {activeTab !== '1' && (
                            <Button
                                className="btn-primary"
                                onClick={handlePreviousTab}
                            >
                                Previous
                            </Button>
                        )}
                    </div>
                    <div className="create-syllabus__footer-right">
                        <Link to="/syllabus">
                            <Button
                                className="btn btn-cancel"
                                onClick={() =>
                                    dispatch(setSelectedKey('/syllabus'))
                                }
                            >
                                Cancel
                            </Button>
                        </Link>

                        <Button
                            className="btn btn-sub-info"
                            onClick={handleSaveDraft}
                        >
                            Save as Draft
                        </Button>
                        <Button
                            className="btn btn-ok btn-primary"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Space>
        </div>
    );
}

export default CreateSyllabus;
