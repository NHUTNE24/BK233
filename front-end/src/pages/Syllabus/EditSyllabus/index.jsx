import {
    Alert,
    Button,
    Col,
    Input,
    message,
    Modal,
    Row,
    Space,
    Spin,
} from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BiError } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    changeAssignment,
    changeFinal,
    changeFinalPractice,
    changeFinalTheory,
    changeGpa,
    changeQuiz,
    changeSyllabusCode,
    changeSyllabusName,
    changeSyllabusVersion,
    resetState,
    setAttendeeNumber,
    setCourseObjective,
    setLevel,
    setSyllabusDays,
    setTechnicalRequirement,
    setTrainingDeliveryPrinciple,
    updateGeneralIsValid,
} from '../../../store/syllabus/updateSyllabusSlice';
import TabsCustom from '../components/TabsCustom';
import './EditSyllabus.scss';
import styles from './style.module.scss';

import { setSelectedKey } from '../../../store/app/siderBarSlice';
EditSyllabus.propTypes = {};
function EditSyllabus() {
    const { id } = useParams();
    const userInfo = useSelector((state) => state.auth);

    const nameRef = useRef(null);
    const codeRef = useRef(null);
    const versionRef = useRef(null);
    const attendeeNumberRef = useRef(null);
    const technicalRef = useRef(null);
    const courseRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [outputStandardList, setOutputStandardList] = useState([]);
    const [deliveryTypeList, setDeliveryTypeList] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);
    const data = useSelector((state) => state.updateSyllabus);
    const dispatch = useDispatch();
    const [dataSource, setDataSource] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchOutputStandard = async () => {
            try {
                const result = await axios.get(
                    'http://localhost:8080/api/output-standards'
                );
                if (result.status === 200) {
                    setOutputStandardList(result.data);
                } else {
                    message.error('Fail to fetch output standard');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchOutputStandard();
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
                    message.error('Fail to fetch output standard');
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchDelivery();
    }, []);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //fetch data from db of syllabus with id
    useEffect(() => {
        const fetchSyllabusDetailData = async (syllabusId) => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:8080/api/syllabus/${syllabusId}`
                );

                //clone syllabusDays to redux state
                const result = response.data;

                const flattenChapters = result.unitChapters.reduce(
                    (acc, cur) => [...acc, ...cur],
                    []
                );

                const flattenUnits = result.syllabusUnits.reduce(
                    (acc, cur) => [...acc, ...cur],
                    []
                );

                const syllabusDayList = [];

                result.syllabusDays.forEach((day) => {
                    if (day.isDeleted === false || day.isDeleted === null) {
                        syllabusDayList.push({
                            syllabusUnits: [],
                            dayId: day.id,
                        });

                        flattenUnits.forEach((unit) => {
                            if (
                                (unit.isDeleted === false ||
                                    unit.isDeleted === null) &&
                                unit.syllabusDayId === day.id
                            ) {
                                syllabusDayList[
                                    syllabusDayList.length - 1
                                ].syllabusUnits.push({
                                    unitName: unit.name,
                                    unitChapters: [],
                                    unitId: unit.id,
                                });
                                flattenChapters
                                    .filter(
                                        (chapter) =>
                                            chapter.syllabusUnitId ===
                                                unit.id &&
                                            (chapter.isDeleted === false ||
                                                chapter.isDeleted === null)
                                    )
                                    .forEach((chapter) => {
                                        syllabusDayList[
                                            syllabusDayList.length - 1
                                        ].syllabusUnits[
                                            syllabusDayList[
                                                syllabusDayList.length - 1
                                            ].syllabusUnits.length - 1
                                        ].unitChapters.push({
                                            name: chapter.name,
                                            duration: chapter.duration,
                                            isOnline: chapter.isOnline,
                                            deliveryTypeId:
                                                chapter.deliveryTypeId,
                                            outputStandardId:
                                                chapter.outputStandardId,
                                            id: chapter.id,
                                        });
                                    });
                            }
                        });
                    }
                });

                dispatch(setSyllabusDays(syllabusDayList));

                // clone dataSource into data

                dispatch(
                    changeSyllabusName({
                        name: result.syllabus?.topicName || '',
                    })
                );
                dispatch(
                    changeSyllabusCode({
                        code: result.syllabus?.topicCode || '',
                    })
                );
                dispatch(
                    changeSyllabusVersion({
                        version: result.syllabus?.version || '',
                    })
                );
                dispatch(setLevel({ level: result.syllabus?.level || '' }));
                dispatch(
                    setAttendeeNumber({
                        attendeeNumber: result.syllabus.attendeeNumber,
                    })
                );
                dispatch(
                    setTechnicalRequirement({
                        technicalRequirement:
                            result.syllabus?.technicalRequirement || '',
                    })
                );
                dispatch(
                    setCourseObjective({
                        courseObjective: result.syllabus?.courseObjective || '',
                    })
                );
                dispatch(
                    setTrainingDeliveryPrinciple({
                        training: result.trainingDeliveryPrinciple?.training,
                        pretest: result.trainingDeliveryPrinciple?.pretest,
                        marking: result.trainingDeliveryPrinciple?.marking,
                        waiverCriteria:
                            result.trainingDeliveryPrinciple?.waiverCriteria,
                        others: result.trainingDeliveryPrinciple?.others,
                    })
                );

                dispatch(
                    changeQuiz({ value: result.assignmentSchema?.quiz || '' })
                );

                dispatch(
                    changeAssignment({
                        value: result.assignmentSchema?.assignment || '',
                    })
                );

                dispatch(
                    changeFinal({
                        value: result.assignmentSchema?.finalAssessment || '',
                    })
                );

                dispatch(
                    changeFinalTheory({
                        value: result.assignmentSchema?.finalTheory || '',
                    })
                );

                dispatch(
                    changeFinalPractice({
                        value: result.assignmentSchema?.finalPractice || '',
                    })
                );

                dispatch(
                    changeGpa({ value: result.assignmentSchema?.gpa || '' })
                );

                setDataSource(result);
            } catch (error) {
                console.error('Error fetching syllabus data:', error);
                return null;
            } finally {
                setLoading(false);
            }
        };
        fetchSyllabusDetailData(id);
    }, [id]);

    const handlePrevious = () => {
        setTabIndex((pre) => pre - 1);
    };

    const handleSubmit = () => {
        if (!data.isBasicInfoValid) {
            if (!data.basicInfo.syllabusName) {
                nameRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            } else if (!data.basicInfo.code) {
                codeRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            } else {
                versionRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
            message.error('Basic information must be filled');
            return;
        }

        if (!data.isGeneralValid.status) {
            message.error('General tab must be filled!');
            if (!data.general.attendeeNumber) {
                const newGeneralIsValid = {
                    status: false,
                    errorSection: [
                        ...data.isGeneralValid.errorSection,
                        'attendee-number',
                    ],
                };
                dispatch(updateGeneralIsValid(newGeneralIsValid));
                attendeeNumberRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            } else if (
                !data.general.technicalContent ||
                data.general.technicalContent === '<p><br></p>'
            ) {
                const newGeneralIsValid = {
                    status: false,
                    errorSection: [
                        ...data.isGeneralValid.errorSection,
                        'technical',
                    ],
                };
                technicalRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });

                dispatch(updateGeneralIsValid(newGeneralIsValid));
            } else if (
                !data.general.courseContent ||
                data.general.courseContent === '<p><br></p>'
            ) {
                const newGeneralIsValid = {
                    status: false,
                    errorSection: [
                        ...data.isGeneralValid.errorSection,
                        'course-objective',
                    ],
                };
                courseRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });

                dispatch(updateGeneralIsValid(newGeneralIsValid));
            }
            return;
        }
        if (!data.isSyllabusDaysValid) {
            message.error('Outline tab must be filled!');
            return;
        }
        if (
            !data.isTrainingPrincipleValid ||
            !data.isAssessmentSchemaValid.status
        ) {
            message.error('Others tab must be filled!');
            return;
        }

        try {
            const fetchApi = async () => {
                setLoading(true);

                const result = await axios.put(
                    `http://localhost:8080/api/syllabus/${id}`,
                    {
                        ...data,
                        userName: userInfo.username, // Need replace by User info
                        isAssessmentSchemaValid:
                            data.isAssessmentSchemaValid.status,
                        isGeneralValid: data.isGeneralValid.status,
                        status: 'Active',
                    }
                );

                if (result.status === 200) {
                    setLoading(false);
                    navigate('/syllabus');
                    message.success('Update syllabus successfully');
                    dispatch(resetState());
                } else {
                    message.error('Failed to update syllabus');
                }
            };
            fetchApi();
        } catch (error) {
            console.error(error);
        }

        // setIsModalOpen(true);
    };

    return (
        <div className={styles.container}>
            {loading && (
                <Spin fullscreen tip="Updating...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin>
            )}
            <div className="create-syllabus">
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: 'flex' }}
                >
                    <div className="create-syllabus__header">
                        <Row gutter={50} align="top">
                            <Col sm={8}>
                                <h4 className="create-syllabus__title header-title">
                                    Edit Syllabus
                                </h4>
                            </Col>
                        </Row>
                    </div>

                    <div className="create-syllabus__basic-info">
                        <Row
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'start',
                            }}
                            gutter={30}
                        >
                            <Col span={11}>
                                <div className="syllabus-name">
                                    <Row
                                        // justify=""
                                        // align="right"
                                        gutter={10}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Col span={7}>
                                            <div
                                                style={{
                                                    paddingBottom: '22px',
                                                }}
                                            >
                                                <label
                                                    className="label subtitle1"
                                                    htmlFor="syllabusName"
                                                >
                                                    <p>
                                                        Syllabus Name
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    '4px',
                                                                color: 'red',
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </p>
                                                </label>
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <div
                                                ref={nameRef}
                                                className="syllabus-name-wrapper"
                                            >
                                                <Input
                                                    onChange={(e) =>
                                                        dispatch(
                                                            changeSyllabusName({
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    id="syllabusName"
                                                    value={
                                                        data.basicInfo
                                                            .syllabusName
                                                    }
                                                    className={
                                                        !data.basicInfo
                                                            .syllabusName
                                                            ? 'input-error'
                                                            : 'input-normal'
                                                    }
                                                />

                                                <div
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '12px',
                                                        padding: '4px',
                                                    }}
                                                    className={
                                                        !data.basicInfo
                                                            .syllabusName
                                                            ? 'input-error-text--active'
                                                            : 'input-error-text'
                                                    }
                                                >
                                                    Syllabus name is required!
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={5}>
                                <div className="syllabus-code">
                                    <Row
                                        gutter={10}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Col span={6}>
                                            <div
                                                style={{
                                                    paddingBottom: '22px',
                                                }}
                                            >
                                                <label
                                                    className="label subtitle1"
                                                    htmlFor="syllabus-code"
                                                >
                                                    <div>
                                                        Code
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    '4px',
                                                                color: 'red',
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </Col>
                                        <Col span={18}>
                                            <div
                                                ref={codeRef}
                                                className="syllabus-code-wrapper"
                                            >
                                                <Input
                                                    onChange={(e) =>
                                                        dispatch(
                                                            changeSyllabusCode({
                                                                code: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                    id="syllabus-code"
                                                    value={data.basicInfo.code}
                                                    className={
                                                        !data.basicInfo.code
                                                            ? 'input-error'
                                                            : 'input-normal'
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '12px',
                                                        padding: '4px',
                                                    }}
                                                    className={
                                                        !data.basicInfo.code
                                                            ? 'input-error-text--active'
                                                            : 'input-error-text'
                                                    }
                                                >
                                                    Syllabus code is required!
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="syllabus-version">
                                    <Row
                                        align="middle"
                                        gutter={10}
                                        style={{ width: '100%' }}
                                    >
                                        <Col span={5}>
                                            <div
                                                style={{
                                                    paddingBottom: '22px',
                                                }}
                                            >
                                                <label
                                                    className="label subtitle1"
                                                    htmlFor="syllabus-version"
                                                >
                                                    <p>
                                                        Version
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    '4px',
                                                                color: 'red',
                                                            }}
                                                        >
                                                            *
                                                        </span>
                                                    </p>
                                                </label>
                                            </div>
                                        </Col>
                                        <Col span={11}>
                                            <div
                                                ref={versionRef}
                                                className="syllabus-version-wrapper"
                                            >
                                                <Input
                                                    onChange={(e) =>
                                                        dispatch(
                                                            changeSyllabusVersion(
                                                                {
                                                                    version:
                                                                        e.target
                                                                            .value,
                                                                }
                                                            )
                                                        )
                                                    }
                                                    id="syllabus-version"
                                                    value={
                                                        data.basicInfo.version
                                                    }
                                                    className={
                                                        !data.basicInfo.version
                                                            ? 'input-error'
                                                            : 'input-normal'
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '12px',
                                                        padding: '4px',
                                                    }}
                                                    className={
                                                        !data.basicInfo.version
                                                            ? 'input-error-text--active'
                                                            : 'input-error-text'
                                                    }
                                                >
                                                    Syllabus version is
                                                    required!
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="create-syllabus__body">
                        <TabsCustom
                            tabIndex={tabIndex}
                            setTabIndex={setTabIndex}
                            dataSource={dataSource}
                            outputStandardList={outputStandardList}
                            attendeeNumberRef={attendeeNumberRef}
                            technicalRef={technicalRef}
                            courseRef={courseRef}
                        />
                    </div>

                    <div className="create-syllabus__footer">
                        {tabIndex ? (
                            <div className="create-syllabus__footer-left">
                                <Button
                                    onClick={handlePrevious}
                                    className="btn-primary"
                                >
                                    Previous
                                </Button>
                            </div>
                        ) : null}

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
                                onClick={() => handleSubmit()}
                                className=" btn-primary"
                            >
                                Save
                            </Button>
                            <Modal
                                title={
                                    !errorMessage ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '6px',
                                                    color: 'green',
                                                }}
                                            >
                                                <FaCheckCircle size={20} />
                                            </span>
                                            <div style={{ marginLeft: '8px' }}>
                                                Update syllabus successfully
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginTop: '6px',
                                                    color: 'red',
                                                }}
                                            >
                                                <BiError size={20} />
                                            </span>
                                            <div style={{ marginLeft: '8px' }}>
                                                Fail to update syllabus!
                                            </div>
                                        </div>
                                    )
                                }
                                open={isModalOpen}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                footer={[
                                    <Button
                                        key="ok"
                                        type="primary"
                                        onClick={handleOk}
                                    >
                                        OK
                                    </Button>,
                                ]}
                            >
                                {errorMessage
                                    ? errorMessage
                                    : 'Update syllabus successfully'}
                            </Modal>
                        </div>
                    </div>
                </Space>
            </div>
        </div>
    );
}

export default EditSyllabus;
