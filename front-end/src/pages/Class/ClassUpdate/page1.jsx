import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonComponent from '../../../components/Button/Button';
import { Calendar } from 'antd';
import Divider from '@mui/material/Divider';
import { MdOutlineWarning } from 'react-icons/md';
import Chip1 from '../../../components/Chips/Chip1';
import NewTabs from './components/NewTabs';
import { Accordion, AccordionSummary, AccordionDetails, AccordionDetails2 } from './components/CustomAccordion';
import { TimePicker, Select, Input, DatePicker, Button, Tooltip } from 'antd';
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
import { basicAuth } from '../../../constants/user';

axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.headers.common['Authorization'] = basicAuth;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

function ClassUpdate() {
    const [showTimeFrame, setShowTimeFrame] = useState(true);
    const [classInfo, setClassInfo] = useState({
        id: '',
        createdBy: '',
        createdDate: '',
        updatedBy: '',
        updatedDate: '',
        classStatus: '',
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
        slotTime: '',
        fsuId: '',
        locationId: '',
        attendeeTypeId: '',
        adminId: '',
        trainingProgramCode: '',
        locationName: '',
        fsuName: '',
        attendeeTypeName: '',
        adminName: '',
        adminMail: '',
    });

    const { id } = useParams();
    const apiBaseURL = '/classes';
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiBaseURL}/${id}`);
            setClassInfo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    useEffect(() => {
        console.log(classInfo);
    }, [classInfo]);

    const handleChange = (e) => {
        setClassInfo({
            ...classInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (value, name) => {
        setClassInfo({
            ...classInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiBaseURL}/${id}`, classInfo, {
                headers: {
                    Authorization: basicAuth,
                },
            });
            console.log('Class updated successfully.', response.data);
            navigate('/class/list'); // Điều hướng đúng đến danh sách class
        } catch (error) {
            console.error('There was an error updating the class!', error);
            console.log('Error response:', error.response); // Log the error response
        }
    };

    return (
        <form onSubmit={handleSubmit} className="block">
            <div className="block">
                <section className="p-5 text-primary bg-main border border-t-2 flex flex-row justify-between items-center">
                    <div className="flex flex-col gap-3">
                        <h4>Class</h4>
                        <div className="flex flex-row gap-5 items-center">
                            <h2>
                                <input
                                    className="rounded-lg px-3 text-main py-1"
                                    type="text"
                                    name="className"
                                    value={classInfo.className}
                                    onChange={handleChange}
                                />
                            </h2>
                            <Chip1 text="Planning" isActive={false} isRounded />
                        </div>
                        <p className="subtitle1">
                            <input
                                className="rounded-md text-main px-3 py-1"
                                type="text"
                                name="classCode"
                                value={classInfo.classCode}
                                onChange={handleChange}
                            />
                        </p>
                        <div className="h-0.5 w-96 bg-primary"></div>
                        <div className="flex flex-row gap-5 items-center">
                            <div>
                                <span className="text-3xl mr-1 font-bold">
                                    <input
                                        className="rounded-lg px-3 text-main py-1 w-20"
                                        type="text"
                                        name="duration"
                                        value={classInfo.duration}
                                        onChange={handleChange}
                                    />
                                </span>{' '}
                                days
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
                                                            classInfo.startTime
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    <p>to</p>
                                                    <input
                                                        type="time"
                                                        name="endTime"
                                                        value={
                                                            classInfo.endTime
                                                        }
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
                                                    placeholder="select"
                                                    value={classInfo.locationId}
                                                    onChange={(value) =>
                                                        handleSelectChange(
                                                            value,
                                                            'locationId'
                                                        )
                                                    }
                                                    options={[
                                                        {
                                                            value: '66a1bc31f1af5d9089886de0',
                                                            label: 'Ho Chi Minh ',
                                                        },
                                                        {
                                                            value: '66a1fc7aca72a9c425c34bf9',
                                                            label: 'Da Nang',
                                                        },
                                                        {
                                                            value: '66a1fc57ca72a9c425c34bf8',
                                                            label: 'Ha Noi',
                                                        },
                                                    ]}
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
                                                value={classInfo.adminId}
                                                onChange={(value) =>
                                                    handleSelectChange(
                                                        value,
                                                        'adminId'
                                                    )
                                                }
                                                placeholder="select..."
                                                options={[
                                                    {
                                                        value: '66a603cd999f1d9e86d1aad9',
                                                        label: 'HuyNgo',
                                                    },
                                                    {
                                                        value: '66a607ce999f1d9e86d1aade',
                                                        label: 'HuyThanh',
                                                    },
                                                ]}
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
                                                        value={classInfo.fsuId}
                                                        onChange={(value) =>
                                                            handleSelectChange(
                                                                value,
                                                                'fsuId'
                                                            )
                                                        }
                                                        options={[
                                                            {
                                                                value: '66a1c4cba59c1fbb518953a8',
                                                                label: 'Fsu 1',
                                                            },
                                                            {
                                                                value: '66a30a247f17cbccef418a7c',
                                                                label: 'Fsu 2',
                                                            },
                                                        ]}
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
                                                    classInfo.attendeeTypeId
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
                                                        classInfo.plannedAttendee
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
                                                        classInfo.acceptedAttendee
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
                                                        classInfo.actualAttendee
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
                                                    value={classInfo.startDate}
                                                    onChange={handleChange}
                                                    className="p-1"
                                                />
                                                <p>to</p>
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={classInfo.endDate}
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
                                />
                                <ButtonComponent
                                    htmlType="submit"
                                    className="bg-box text-main rounded-xl"
                                    text={'Save as draft'}
                                />
                            </div>
                            <ButtonComponent
                                text={'Next'}
                                className="border border-main text-main rounded-xl"
                                iconPosition="end"
                                icon={<ArrowForwardIcon />}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}

export default ClassUpdate;
