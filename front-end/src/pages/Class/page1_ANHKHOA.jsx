import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getGMT7Date from '../../../utils/getGMT7Date';
import { MdEdit } from 'react-icons/md';
import { Accordion2, AccordionDetails3 } from './components/CustomAccordion';
import { Calendar } from 'antd';
import Divider from '@mui/material/Divider';
import { MdOutlineWarning } from 'react-icons/md';

import Chip1 from '../../../components/Chips/Chip1';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionDetails2,
} from './components/CustomAccordion';

import { Select, Input, DatePicker, Button, Tooltip } from 'antd';
import { Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

import BookIcon from '@mui/icons-material/Book';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import BackHandIcon from '@mui/icons-material/BackHand';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import BusinessIcon from '@mui/icons-material/Business';
import StarsIcon from '@mui/icons-material/Stars';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonComponent from '../../../components/Button/Button';
import { basicAuth } from '../../../constants/user';
import URL from '../../../constants/url';
const apiBaseURL = 'http://localhost:8080/api/classes';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

function ClassUpdate() {
    const [showTimeFrame, setShowTimeFrame] = useState(true);
    const [updatedClass, setUpdatedClass] = useState({
        createdBy: 'ThanhHuy',
        createdDate: getGMT7Date(),
        updatedBy: 'ThanhHuy',
        updatedDate: getGMT7Date(),
        classStatus: 'Planning',
        classCode: '',
        duration: 0,
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        approvedBy: '',
        approvedDate: '',
        reviewBy: '',
        reviewDate: '',
        acceptedAttendee: 0,
        actualAttendee: 0,
        className: '',
        plannedAttendee: 0,
        slotTime: 0,
        fsuId: '',
        classAdminName: [],
        locationId: '',
        attendeeLevelId: '',
        trainingProgramCode: [],
        adminId: '',
    });

    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    const fetchData = async () => {
        try {
            let response = await axios.get(`${apiBaseURL}/${id}`, {
                headers: {
                    Authorization: basicAuth,
                },
            });
            const parts = response.data.classCode.split('_');
            setLocation(parts[0]);
            setUpdatedClass({
                ...response.data,
                classCode: parts[1],
            });
            console.log(updatedClass);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/class/list`);
    };

    function handleChange(e) {
        setUpdatedClass({
            ...updatedClass,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectChange = (value, name) => {
        setUpdatedClass({
            ...updatedClass,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const classInfo = {
            className: updatedClass.className,
            classCode: location + '_' + updatedClass.classCode,
            startTime: updatedClass.startTime,
            endTime: updatedClass.endTime,
            classAdminName: updatedClass.classAdminName,
            fsuId: updatedClass.fsuId,
            attendeeTypeId: updatedClass.attendeeTypeId,
            plannedAttendee: updatedClass.plannedAttendee,
            acceptedAttendee: updatedClass.acceptedAttendee,
            actualAttendee: updatedClass.actualAttendee,
            createdBy: updatedClass.createdBy,
            createdDate: updatedClass.createdDate,
            updatedBy: updatedClass.updatedBy,
            updatedDate: updatedClass.updatedDate,
            classStatus: updatedClass.classStatus,
            duration: updatedClass.duration,
            startDate: updatedClass.startDate,
            endDate: updatedClass.endDate,
            approvedBy: updatedClass.approvedBy,
            approvedDate: updatedClass.approvedDate,
            reviewBy: updatedClass.reviewBy,
            reviewDate: updatedClass.reviewDate,
            slotTime: updatedClass.slotTime,
            locationId: updatedClass.locationId,
            trainingProgramCode: updatedClass.trainingProgramCode,
            adminId: updatedClass.adminId,
        };

        axios
            .put(`${URL.LOCAL_API_CLASS}/${id}`, classInfo, {
                headers: {
                    Authorization: basicAuth,
                },
            })
            .then((response) => {
                console.log('Class created successfully.', response.data);
                handleNavigate();
            })
            .catch((error) => {
                console.error('There was an error creating the class!', error);
            });
    };

    function NewTabs() {
        return (
            <Tabs type="card" defaultActiveKey="1">
                <TabPane tab="Training Program" key="1">
                    <ItemOne />
                </TabPane>
                <TabPane tab="Attendee List" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Budget" key="3">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="Others" key="4">
                    Content of Tab Pane 4
                </TabPane>
            </Tabs>
        );
    }

    function ItemOne() {
        const [selectedTrainingProgram, setSelectedTrainingProgram] = useState(
            []
        );
        const [trainingProgram, setTrainingProgram] = useState([]);
        const [programList, setProgramList] = useState([]);
        useEffect(() => {
            const fetchProgramList = () => {
                axios
                    .get(URL.LOCAL_API_PROGRAM, {
                        headers: {
                            Authorization: basicAuth,
                        },
                    })
                    .then((response) => {
                        console.log(
                            'Program created successfully.',
                            response.data
                        );
                        const programList = response.data.map((item) => {
                            return {
                                label: item.name,
                                value: item.trainingProgramCode,
                            };
                        });
                        setProgramList(programList);
                        console.log('Program list:', programList);
                    })
                    .catch((error) => {
                        console.error(
                            'There was an error creating the class!',
                            error
                        );
                    });
            };
            fetchProgramList();
            () => setSelectedTrainingProgram(updatedClass.trainingProgramCode);
        }, []);

        return (
            <div className="flex flex-col">
                <div className="my-2">
                    <Select
                        mode="multiple"
                        value={updatedClass.trainingProgramCode}
                        onChange={(value) =>
                            handleSelectChange(value, 'trainingProgramCode')
                        }
                        style={{ width: 1000 }}
                        placeholder="select"
                        options={programList}
                    />
                </div>
                {selectedTrainingProgram &&
                    selectedTrainingProgram.map((item, index) => (
                        <Accordion2 key={index}>
                            <AccordionSummary>
                                <header key={index} className="text-primary">
                                    <div className="flex flex-row gap-2 items-center">
                                        <h4>{item.name}</h4>
                                        <Button
                                            shape="circle"
                                            icon={
                                                <MdEdit className="text-xl" />
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <div>
                                            {item.days} days{' '}
                                            <span className="italic">
                                                ({item.hours} hours)
                                            </span>
                                        </div>
                                        <div className="h-5 w-0.5 bg-primary"></div>
                                        <div>
                                            Modified on{' '}
                                            <span className="italic">
                                                {item.modifiedOn}
                                            </span>{' '}
                                            by{' '}
                                            <span className="font-bold">
                                                {item.modifiedBy}
                                            </span>
                                        </div>
                                    </div>
                                </header>
                            </AccordionSummary>
                            <AccordionDetails3>
                                {item.syllabusDetail.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`flex flex-row items-center rounded-3xl overflow-hidden elevation2 ${item.syllabus.status == 'Active' ? `!text-main` : `!text-[#B9B9B9]`}`}
                                    >
                                        <img
                                            src="https://via.placeholder.com/300x96"
                                            alt="placeholder"
                                        />
                                        <div className="px-5 py-4 flex flex-col gap-1">
                                            <div className="flex flex-row gap-3 items-center">
                                                <h4>
                                                    {item.syllabus.topicName}
                                                </h4>
                                                <Chip1
                                                    text={item.syllabus.status}
                                                    closable={false}
                                                    inactive={
                                                        item.syllabus.status !=
                                                        'Active'
                                                            ? true
                                                            : false
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-row gap-3 items-center">
                                                <p className="subtitle2 !font-normal">
                                                    {item.syllabus.topicCode +
                                                        ' ' +
                                                        item.syllabus.version}
                                                </p>
                                                <div
                                                    className={`h-5 w-0.5 ${item.syllabus.status == 'Active' ? `!bg-primary` : `!bg-inputHiddenColor`}`}
                                                ></div>
                                                <p className="subtitle2 !font-normal">
                                                    {item.syllabus.days +
                                                        ' days (' +
                                                        item.syllabus.hours +
                                                        ' hours)'}
                                                </p>
                                                <div
                                                    className={`h-5 w-0.5 ${item.syllabus.status == 'Active' ? `!bg-primary` : `!bg-inputHiddenColor`}`}
                                                ></div>
                                                <p className="subtitle2 !font-normal">
                                                    on{' '}
                                                    <span>
                                                        {
                                                            item.syllabus
                                                                .modifiedDate
                                                        }
                                                    </span>{' '}
                                                    by{' '}
                                                    <span>
                                                        {
                                                            item.syllabus
                                                                .modifiedBy
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </AccordionDetails3>
                        </Accordion2>
                    ))}
            </div>
        );
    }

    useEffect(() => {}, [updatedClass]);
    const [adminList, setAdminList] = useState([]);
    useEffect(() => {
        const fetchAdmin = () => {
            axios
                .get(`http://localhost:8080/api/admins`, {
                    headers: {
                        Authorization: basicAuth,
                    },
                })
                .then((response) => {
                    console.log('Class created successfully.', response.data);
                    const adminList = response.data.map((item) => {
                        return {
                            ...item,
                            label: item.name,
                            value: item.id,
                        };
                    });
                    setAdminList(adminList);
                    // handleNavigate();
                })
                .catch((error) => {
                    console.error(
                        'There was an error creating the class!',
                        error
                    );
                });
        };
        fetchAdmin();
    }, []);

    // useEffect(() => {}, [updatedClass]);

    const [FsuList, setFsuList] = useState([]);
    useEffect(() => {
        const fetchFsu = () => {
            axios
                .get(`http://localhost:8080/api/fsu`, {
                    headers: {
                        Authorization: basicAuth,
                    },
                })
                .then((response) => {
                    console.log('fsu created successfully.', response.data);
                    const FsuList = response.data.map((item) => {
                        return {
                            ...item,
                            label: item.name,
                            value: item.id,
                        };
                    });
                    setFsuList(FsuList);
                    // handleNavigate();
                })
                .catch((error) => {
                    console.error(
                        'There was an error creating the class!',
                        error
                    );
                });
        };
        fetchFsu();
    }, []);
    // useEffect(() => { }, [updatedClass]);

    const [locationList, setLocationList] = useState([]);
    useEffect(() => {
        const fetchLocation = () => {
            axios
                .get(`http://localhost:8080/api/locations`, {
                    headers: {
                        Authorization: basicAuth,
                    },
                })
                .then((response) => {
                    console.log(
                        'Location created successfully.',
                        response.data
                    );
                    const locationList = response.data.map((item) => {
                        return {
                            ...item,
                            label: item.name,
                            value: item.id,
                        };
                    });
                    setLocationList(locationList);
                    // handleNavigate();
                })
                .catch((error) => {
                    console.error(
                        'There was an error creating the class!',
                        error
                    );
                });
        };
        fetchLocation();
    }, []);

    const getLabelFromValue = (value) => {
        const selectedOption = locationList.find(
            (option) => option.value === value
        );
        return selectedOption ? selectedOption.label : '';
    };

    const onChangeHandler = (selectedOption) => {
        const value = selectedOption?.value;
        const label = getLabelFromValue(value);

        if (value) {
            handleSelectChange(value, 'locationId');
            setLocation(label); // Pass label to setLocation
        } else {
            console.error('Selected value is undefined');
        }
    };

    function cityAbbreviation(cityName) {
        const abbreviations = {
            Hanoi: 'HN',
            HaNoi: 'HN',
            'Ho Chi Minh City': 'HCM',
            Danang: 'DN',
            DaNang: 'DN',
            // Add more cities and their official abbreviations here
        };

        // Normalize the input
        const words = cityName.split(' ');
        let normalizedName;
        if (words.length === 1) {
            normalizedName = cityName.slice(0, 3).toUpperCase();
        } else {
            normalizedName = words
                .map((word) => word[0].toUpperCase())
                .join('');
        }

        // Return the abbreviation if it exists, otherwise return the normalized name
        return abbreviations[cityName] || normalizedName;
    }

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                // const response = await axios.get(
                //     `https://ipinfo.io/json?token=80bce4cbdbc51e`
                // );
                // console.log(response.data);
                // setLocation(() => cityAbbreviation(updatedClass.classCode));
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLocation();
    }, [updatedClass]);

    useEffect(() => {
        console.log(location);
    }, [location]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching location data: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit} className="block">
            <section className="p-5 text-primary bg-main border border-t-2 flex flex-row justify-between items-center">
                <div className="flex flex-col gap-3">
                    <h4>Class</h4>
                    <div className="flex flex-row gap-5 items-center">
                        <h2>{updatedClass.className}</h2>
                        <Chip1
                            text="Planning"
                            closable={false}
                            inactive={true}
                        />
                    </div>
                    <p className="subtitle1">
                        <Input
                            prefix={`${location}_`}
                            className="text-main"
                            name="classCode"
                            type="text"
                            value={updatedClass.classCode}
                            onChange={handleChange}
                            placeholder="Type class code"
                        />
                    </p>
                    <div className="h-0.5 w-96 bg-primary"></div>
                    <div className="flex flex-row gap-5 items-center">
                        <div>
                            {/* <span className="text-3xl font-bold">31</span> days <span>(91 days)</span> */}
                            <Input
                                className="text-main"
                                name="duration"
                                type="text"
                                value={updatedClass.duration}
                                onChange={handleChange}
                                placeholder="Type duration"
                            />
                        </div>
                        <div className="h-7 w-0.5 bg-primary"></div>
                        <div className="flex flex-row gap-2 items-center">
                            <BookIcon />
                            <RecordVoiceOverIcon />
                            <SpellcheckIcon />
                            <WifiTetheringIcon />
                            <BackHandIcon />
                        </div>
                    </div>
                </div>
                <MoreHorizIcon />
            </section>
            <div className="p-5 flex flex-col gap-5">
                <section className="flex flex-row gap-5">
                    <div className="grid grid-cols-[1fr_2fr] gap-5">
                        <div className="flex flex-col gap-5">
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="text-primary flex flex-row gap-2 items-center">
                                        <CalendarTodayIcon />
                                        <p className="subtitle2 !font-bold">
                                            General
                                        </p>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center">
                                                <AccessAlarmIcon />
                                                <p className="subtitle2 !font-bold">
                                                    Class time
                                                </p>
                                            </div>
                                            <div className="flex subtitle2 !font-normal flex-row items-center justify-between">
                                                <p>from</p>
                                                <input
                                                    type="time"
                                                    name="startTime"
                                                    value={
                                                        updatedClass.startTime
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <p>to</p>
                                                <input
                                                    type="time"
                                                    name="endTime"
                                                    value={updatedClass.endTime}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center text-unmodified">
                                                <BusinessIcon />
                                                <p className="subtitle2 !font-bold">
                                                    Location
                                                </p>
                                            </div>
                                            <Select
                                                value={updatedClass.locationId}
                                                onChange={(value) => {
                                                    handleSelectChange(
                                                        value,
                                                        'locationId'
                                                    );
                                                    setLocation(() =>
                                                        cityAbbreviation(
                                                            getLabelFromValue(
                                                                value
                                                            )
                                                        )
                                                    );
                                                }}
                                                placeholder="select..."
                                                options={locationList}
                                            />
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center text-unmodified">
                                                <RecordVoiceOverIcon />
                                                <p className="subtitle2 !font-bold text-unmodified">
                                                    Trainers
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center">
                                                <AdminPanelSettingsIcon />
                                                <p className="subtitle2 !font-bold">
                                                    Admin
                                                </p>
                                            </div>
                                            <Select
                                                value={updatedClass.adminId}
                                                onChange={(value) =>
                                                    handleSelectChange(
                                                        value,
                                                        'adminId'
                                                    )
                                                }
                                                placeholder="select..."
                                                // options={[
                                                // 	{
                                                // 		value: '66a603cd999f1d9e86d1aad9',
                                                // 		label: 'HuyNN13',
                                                // 	},
                                                // 	{
                                                // 		value: '66a607ce999f1d9e86d1aade',
                                                // 		label: 'HuyDT26',
                                                // 	},
                                                // ]}
                                                options={adminList}
                                            />
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center">
                                                <StarsIcon />
                                                <p className="subtitle2 !font-bold">
                                                    FSU
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <Select
                                                    placeholder="select"
                                                    value={updatedClass.fsuId}
                                                    onChange={(value) =>
                                                        handleSelectChange(
                                                            value,
                                                            'fsuId'
                                                        )
                                                    }
                                                    options={FsuList}
                                                />
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <p className="subtitle2 !font-bold text-unmodified">
                                                Created
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <p className="subtitle2 !font-bold text-unmodified">
                                                Reviewed
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <p className="subtitle2 !font-bold text-unmodified">
                                                Approved
                                            </p>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="text-primary flex flex-row gap-2 items-center">
                                        <StarBorderPurple500Icon />
                                        <div className="flex flex-row gap-5 items-center">
                                            <p className="subtitle2 !font-bold">
                                                Attendee
                                            </p>
                                            <Select
                                                value={
                                                    updatedClass.attendeeTypeId
                                                }
                                                onChange={(value) =>
                                                    handleSelectChange(
                                                        value,
                                                        'attendeeTypeId'
                                                    )
                                                }
                                                style={{ width: 200 }}
                                                placeholder="select"
                                                options={[
                                                    {
                                                        value: '66a1ccd6a59c1fbb518953ae',
                                                        label: 'Fresher',
                                                    },
                                                    {
                                                        value: '66a1f443ca72a9c425c34bc5',
                                                        label: 'Online fee-fresher',
                                                    },
                                                    {
                                                        value: '66a1f518ca72a9c425c34bca',
                                                        label: 'Intern',
                                                    },
                                                    {
                                                        value: '66a1f554ca72a9c425c34bcb',
                                                        label: 'Offline fee-fresher',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails2>
                                    <div className="grid grid-cols-3">
                                        <div className="bg-primary flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor">
                                            <p className="subtitle2 !font-bold">
                                                Planned
                                            </p>
                                            <Input
                                                name="plannedAttendee"
                                                type="number"
                                                value={
                                                    updatedClass.plannedAttendee
                                                }
                                                onChange={handleChange}
                                                className="text-3xl text-center"
                                            />
                                        </div>
                                        <div className="bg-[#285D9A] flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor">
                                            <p className="subtitle2 !font-bold">
                                                Accepted
                                            </p>
                                            <Input
                                                name="acceptedAttendee"
                                                type="number"
                                                value={
                                                    updatedClass.acceptedAttendee
                                                }
                                                onChange={handleChange}
                                                className="text-3xl text-center"
                                            />
                                        </div>
                                        <div className="bg-[#F1F1F1] flex flex-col justify-center items-center gap-2 p-4">
                                            <p className="subtitle2 !font-bold">
                                                Actual
                                            </p>
                                            <Input
                                                name="actualAttendee"
                                                type="number"
                                                value={
                                                    updatedClass.actualAttendee
                                                }
                                                onChange={handleChange}
                                                className="text-3xl text-center"
                                            />
                                        </div>
                                    </div>
                                </AccordionDetails2>
                            </Accordion>
                        </div>
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div className="text-primary flex flex-row gap-2 items-center">
                                        <CalendarTodayIcon />
                                        <p className="subtitle2 !font-bold">
                                            Time frame
                                        </p>
                                        <div className="text-main flex items-center gap-2">
                                            <p>from</p>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={updatedClass.startDate}
                                                onChange={handleChange}
                                                className="p-1"
                                            />
                                            <p>to</p>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={updatedClass.endDate}
                                                onChange={handleChange}
                                                className="p-1"
                                            />
                                        </div>
                                        <Tooltip title="Start day is missing.">
                                            <Button
                                                type="primary"
                                                danger
                                                shape="round"
                                                icon={
                                                    <MdOutlineWarning className="text-3xl" />
                                                }
                                            />
                                        </Tooltip>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {showTimeFrame && (
                                        <div
                                            className={`flex items-center gap-[20px]`}
                                        >
                                            <div>
                                                <Calendar
                                                    fullscreen={false}
                                                    onPanelChange={
                                                        onPanelChange
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <Calendar
                                                    fullscreen={false}
                                                    onPanelChange={
                                                        onPanelChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </section>
                <section>
                    <NewTabs />
                </section>
                <section className="flex flex-row justify-between">
                    <Button
                        className="border border-main text-main rounded-xl"
                        icon={<ArrowBackIcon />}
                    >
                        Back
                    </Button>
                    <div className="flex flex-row gap-10">
                        <div className="flex flex-row gap-2">
                            <ButtonComponent
                                className="bg-alert text-primary rounded-xl"
                                text="Cancel"
                                onClick={handleNavigate}
                            />
                            <ButtonComponent
                                htmlType="submit"
                                className="bg-box text-main rounded-xl"
                                text={'Save as draft'}
                            />
                        </div>
                        <ButtonComponent
                            isDisabled={true}
                            text={'Next'}
                            className="border border-main text-main rounded-xl"
                            iconPosition="end"
                            icon={<ArrowForwardIcon />}
                        />
                    </div>
                </section>
            </div>
        </form>
    );
}

export default ClassUpdate;
