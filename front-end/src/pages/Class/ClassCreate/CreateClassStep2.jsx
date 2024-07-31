import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import getGMT7Date from '../../../utils/getGMT7Date';

import { Calendar } from 'antd';
import Divider from '@mui/material/Divider';
import { MdOutlineWarning } from 'react-icons/md';

import Chip1 from '../../../components/Chips/Chip1';
import NewTabs from './components/NewTabs';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionDetails2,
} from './components/CustomAccordion';

import { Select, Input, DatePicker, Button, Tooltip } from 'antd';

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
const apiBaseURL = 'http://localhost:8080/api/classes';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

function CreateClassStep2() {
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
        trainingProgramCode: '',
        adminId: '',
    });

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/class/list`);
    };

    const { className } = useParams();

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
            className: className,
            classCode: updatedClass.classCode,
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

        // console.log('Submitting class info:', classInfo); // Log the request data

        axios
            .post(`${apiBaseURL}`, classInfo, {
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

    useEffect(() => {}, [updatedClass]);

    return (
        <form onSubmit={handleSubmit} className="block">
            <section className="p-5 text-primary bg-main border border-t-2 flex flex-row justify-between items-center">
                <div className="flex flex-col gap-3">
                    <h4>Class</h4>
                    <div className="flex flex-row gap-5 items-center">
                        <h2>{className}</h2>
                        <Chip1
                            text="Planning"
                            closable={false}
                            inactive={true}
                        />
                    </div>
                    <p className="subtitle1">
                        <Input
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
                                                onChange={(value) =>
                                                    handleSelectChange(
                                                        value,
                                                        'locationId'
                                                    )
                                                }
                                                placeholder="select..."
                                                options={[
                                                    {
                                                        value: '66a1bc31f1af5d9089886de0',
                                                        label: 'HCM',
                                                    }, //ID trong table Location
                                                    {
                                                        value: '66a1fc57ca72a9c425c34bf8',
                                                        label: 'HaNoi',
                                                    },
                                                    {
                                                        value: '66a1fc7aca72a9c425c34bf9',
                                                        label: 'DaNang',
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
                                                value={updatedClass.adminId}
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
                                                    value={updatedClass.fsuId}
                                                    onChange={(value) =>
                                                        handleSelectChange(
                                                            value,
                                                            'fsuId'
                                                        )
                                                    }
                                                    options={[
                                                        {
                                                            value: '66a1c4cba59c1fbb518953a8',
                                                            label: 'FSU 1',
                                                        },
                                                        {
                                                            value: '66a30a247f17cbccef418a7c',
                                                            label: 'FSU 2',
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
        </form>
    );
}

export default CreateClassStep2;
