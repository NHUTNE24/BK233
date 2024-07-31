import '@fortawesome/fontawesome-free/css/all.min.css';
import { Divider, Dropdown, message, Space, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SyllabusTab from '../../components/common/SyllabusTab';
import { FaRegEye } from 'react-icons/fa';
import './SyllabusDetailInformation.css';
import { setData } from '../../../../store/syllabus/syllabusDetailSlice';

import { deleteSyllabus, duplicateSyllabus } from '../../../../store/syllabus/viewSyllabusSlice';
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
    setAttendeeNumber,
    setCourseObjective,
    setLevel,
    setSyllabusDays,
    setTechnicalRequirement,
    setTrainingDeliveryPrinciple,
} from '../../../../store/syllabus/updateSyllabusSlice';

const SyllabusDetailInformation = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.syllabusDetail);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const updateSyllabus = useSelector((state) => state.updateSyllabus);
    // Fetch API
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/syllabus/${id}`);
            const result = response.data;

            dispatch(setData(result));
            const flattenChapters = result.unitChapters.reduce((acc, cur) => [...acc, ...cur], []);

            const flattenUnits = result.syllabusUnits.reduce((acc, cur) => [...acc, ...cur], []);

            const syllabusDayList = [];

            result.syllabusDays.forEach((day) => {
                if (day.isDeleted === false || day.isDeleted === null) {
                    syllabusDayList.push({
                        syllabusUnits: [],
                        dayId: day.id,
                    });

                    flattenUnits.forEach((unit) => {
                        if ((unit.isDeleted === false || unit.isDeleted === null) && unit.syllabusDayId === day.id) {
                            syllabusDayList[syllabusDayList.length - 1].syllabusUnits.push({
                                unitName: unit.name,
                                unitChapters: [],
                                unitId: unit.id,
                            });
                            flattenChapters
                                .filter(
                                    (chapter) =>
                                        chapter.syllabusUnitId === unit.id &&
                                        (chapter.isDeleted === false || chapter.isDeleted === null),
                                )
                                .forEach((chapter) => {
                                    syllabusDayList[syllabusDayList.length - 1].syllabusUnits[
                                        syllabusDayList[syllabusDayList.length - 1].syllabusUnits.length - 1
                                    ].unitChapters.push({
                                        name: chapter.name,
                                        duration: chapter.duration,
                                        isOnline: chapter.isOnline,
                                        deliveryTypeId: chapter.deliveryTypeId,
                                        outputStandardId: chapter.outputStandardId,
                                        id: chapter.id,
                                    });
                                });
                        }
                    });
                }
            });

            dispatch(setSyllabusDays(syllabusDayList));

            // clone dataSource into data

            dispatch(changeSyllabusName({ name: result.syllabus?.topicName || '' }));
            dispatch(changeSyllabusCode({ code: result.syllabus?.topicCode || '' }));
            dispatch(changeSyllabusVersion({ version: result.syllabus?.version || '' }));
            dispatch(setLevel({ level: result.syllabus?.level || '' }));
            dispatch(setAttendeeNumber({ attendeeNumber: result.syllabus.attendeeNumber }));
            dispatch(
                setTechnicalRequirement({
                    technicalRequirement: result.syllabus?.technicalRequirement || '',
                }),
            );
            dispatch(setCourseObjective({ courseObjective: result.syllabus?.courseObjective || '' }));
            dispatch(
                setTrainingDeliveryPrinciple({
                    training: result.trainingDeliveryPrinciple?.training,
                    pretest: result.trainingDeliveryPrinciple?.pretest,
                    marking: result.trainingDeliveryPrinciple?.marking,
                    waiverCriteria: result.trainingDeliveryPrinciple?.waiverCriteria,
                    others: result.trainingDeliveryPrinciple?.others,
                }),
            );

            dispatch(changeQuiz({ value: result.assignmentSchema?.quiz || '' }));
            dispatch(changeAssignment({ value: result.assignmentSchema?.assignment || '' }));
            dispatch(changeFinal({ value: result.assignmentSchema?.finalAssessment || '' }));
            dispatch(changeFinalTheory({ value: result.assignmentSchema?.finalTheory || '' }));
            dispatch(changeFinalPractice({ value: result.assignmentSchema?.finalPractice || '' }));
            dispatch(changeGpa({ value: result.assignmentSchema?.gpa || '' }));

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/edit-syllabus/${id}`);
    };

    const handleDuplicate = async () => {
        setLoading(true);
        await dispatch(duplicateSyllabus({ syllabusId: id }));
        setLoading(false);
        message.success('Duplicate syllabus successfully!');
        navigate('/syllabus');
    };
    const handleDeActive = async () => {
        setLoading(true);
        try {
            const fetchApi = async () => {
                setLoading(true);
                let status = 'Draft';
                if (data.syllabus.status === 'Active') {
                    // Change the status to "Deactive"
                    status = 'Deactive';
                } else if (data.syllabus.status === 'Deactive') {
                    // Change the status to "Active"
                    status = 'Active';
                }

                const result = await axios.put(`http://localhost:8080/api/syllabus/${id}`, {
                    ...updateSyllabus,
                    userName: 'Syllabus Group', // Need replace by User info
                    isAssessmentSchemaValid: true,
                    isGeneralValid: true,
                    isSyllabusDaysValid: true,
                    isBasicInfoValid: true,
                    isTrainingPrincipleValid: true,
                    status: status,
                });

                if (result.status === 200) {
                    message.success('Active/Deactive syllabus successfully');
                    navigate('/syllabus');
                } else {
                    message.error('Failed to Active/Deactive syllabus');
                }
                setLoading(false);
            };
            fetchApi();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async () => {
        setLoading(true);
        await dispatch(deleteSyllabus({ syllabusId: id }));
        setLoading(false);
        message.success('Delete syllabus successfully!');
        navigate('/syllabus');
    };

    const items = [
        {
            label: (
                <div
                    className="edit"
                    onClick={handleEditClick}
                >
                    <i className="fa-solid fa-pencil"></i>
                    <p className="edit-label">Edit syllabus</p>
                </div>
            ),
            key: '2',
        },
        {
            label: (
                <div
                    className="duplicate"
                    onClick={handleDuplicate}
                >
                    <i className="fa-regular fa-clone"></i>
                    <p className="duplicate-label">Duplicate syllabus</p>
                </div>
            ),
            key: '3',
        },
        {
            label: (
                <div
                    className="delete"
                    onClick={handleDelete}
                >
                    <i className="fa-regular fa-trash-can"></i>
                    <p className="delete-label">Delete syllabus</p>
                </div>
            ),
            key: '5',
        },
    ];

    if (data.syllabus.status === 'Active' || data.syllabus.status === 'Deactive') {
        items.push({
            label: (
                <div
                    className="de-activate"
                    onClick={handleDeActive}
                >
                    {data.syllabus.status === 'Active' ? (
                        <>
                            <i className="fa-regular fa-eye-slash"></i>
                            <p className="active-label">De-activate syllabus</p>
                        </>
                    ) : (
                        <>
                            <FaRegEye />
                            <p className="active-label">Activate syllabus</p>
                        </>
                    )}
                </div>
            ),
            key: '4',
        });
    }

    const totalDay = data.syllabusDays.filter((day) => day.isDeleted === false || day.isDeleted === null).length;
    const availableChapters = data.unitChapters
        ? data.unitChapters
              .reduce((acc, cur) => [...acc, ...cur], [])
              .filter((chapter) => chapter.isDeleted === false || chapter.isDeleted === null)
        : [];

    return (
        <>
            {loading ? (
                <Spin
                    size="large"
                    fullscreen
                />
            ) : (
                <div className="syllabus-detail-information-container">
                    <div className="syllabus-detail-information-first-container">
                        <p style={{ marginBottom: '20px' }}>Syllabus</p>
                        <div className="syllabus-title-container">
                            <div className="syllabus-title-left-column">
                                <span>{data.syllabus.topicName}</span>
                            </div>
                            <div className="syllabus-title-right-column">
                                <div className="syllabus-title-status-info">
                                    <span>{data.syllabus.status}</span>
                                </div>
                            </div>
                            <Dropdown
                                className="dropdown-manage-modal"
                                menu={{ items }}
                                trigger={['click']}
                                dropdownRender={(menu) => (
                                    <div className="dropdown__actions">
                                        <div className="dropdown__header">
                                            <div
                                                style={{ fontWeight: '600' }}
                                                className="dropdown__title"
                                            >
                                                Manage
                                            </div>
                                            <Divider
                                                style={{
                                                    margin: 0,
                                                }}
                                            />
                                        </div>
                                        <div className="dropdown__body">{menu}</div>
                                    </div>
                                )}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <div className="icon-container">
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </div>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="syllabus-code-info">{data.syllabus.topicCode}</div>
                            <div className="syllabus-version-info">{data.syllabus.version}</div>
                        </div>
                    </div>
                    <hr />
                    <div className="syllabus-detail-information-second-container">
                        <div>
                            <span style={{ fontSize: '24px', fontWeight: '600' }}>{totalDay}</span>{' '}
                            {totalDay > 1 ? 'days' : 'day'}
                            <span style={{ fontFamily: 'Inter Tight', fontStyle: 'italic' }}>
                                (
                                {(
                                    availableChapters.reduce(
                                        (accumulator, current) => accumulator + current.duration,
                                        0,
                                    ) / 60
                                ).toFixed(2)}{' '}
                                hours)
                            </span>
                        </div>
                        <div>
                            Modified on {data.syllabus.modifiedDate || '...'} by
                            <span style={{ fontWeight: '700', marginLeft: '4px' }}>
                                {data.syllabus.modifiedBy || '...'}
                            </span>
                        </div>
                    </div>
                    <SyllabusTab />
                </div>
            )}
        </>
    );
};

export default SyllabusDetailInformation;
