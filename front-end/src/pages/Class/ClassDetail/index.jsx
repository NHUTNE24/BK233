import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar } from 'antd';
import Divider from '@mui/material/Divider';
import Chip1 from '../../../components/Chips/Chip1';

import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionDetails2,
} from '../ClassCreate/components/CustomAccordion';

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
import { SyllabusTab } from '../../../components';
import ItemOne from './itemOne';
import { basicAuth } from '../../../constants/user';

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

const apiBaseURL = 'http://localhost:8080/api/classes';

function ClassDetail() {
    const [showTimeFrame, setShowTimeFrame] = useState(true);
    const [classInfo, setClassInfo] = useState({});
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiBaseURL}/${id}`, {
                headers: {
                    Authorization: basicAuth,
                },
            });
            setClassInfo(response.data);
            console.log(classInfo);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="block">
            <section className="p-5 text-primary bg-main flex flex-row justify-between items-center">
                <div className="flex flex-col gap-3">
                    <h4>Class</h4>
                    <div className="flex flex-row gap-5 items-center">
                        <h2>{classInfo?.className || 'Loading...'}</h2>
                        <Chip1
                            text="Planning"
                            closable={false}
                            isActive={false}
                            isRounded
                        />
                    </div>
                    <p className="subtitle1">
                        {classInfo?.classCode || 'Loading...'}
                    </p>
                    <div className="h-0.5 w-96 bg-primary"></div>
                    <div className="flex flex-row gap-5 items-center">
                        <div>
                            <span className="text-3xl font-bold">
                                {classInfo?.duration || '0'}
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
                                                {classInfo?.startTime || 'N/A'}{' '}
                                                - {classInfo?.endTime || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center text-unmodified">
                                                <BusinessIcon />
                                                <p className="subtitle2 !font-bold">
                                                    Location
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm">
                                                    {classInfo?.locationName ||
                                                        'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center text-unmodified">
                                                <RecordVoiceOverIcon />
                                                <p className="subtitle2 !font-bold text-unmodified">
                                                    Trainers
                                                </p>
                                            </div>
                                            {/* Add trainers information here */}
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center">
                                                <AdminPanelSettingsIcon />
                                                <p className="subtitle2 !font-bold">
                                                    Admin
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm">
                                                    {classInfo.adminName}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <div className="flex flex-row gap-2 items-center">
                                                <StarsIcon />
                                                <p className="subtitle2 !font-bold">
                                                    FSU
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm">
                                                    {classInfo?.fsuName ||
                                                        'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <p className="subtitle2 !font-bold text-unmodified">
                                                Created
                                            </p>
                                            {/* Add created information here */}
                                            <p className="text-sm">
                                                {classInfo.createdBy || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <p className="subtitle2 !font-bold text-unmodified">
                                                Reviewed
                                            </p>
                                            {/* Add reviewed information here */}
                                            <p className="text-sm">
                                                {classInfo.reviewBy || 'N/A'}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-[0.5fr_1fr] items-center gap-4">
                                            <p className="subtitle2 !font-bold text-unmodified">
                                                Approved
                                            </p>
                                            {/* Add approved information here */}
                                            <p className="text-sm">
                                                {classInfo.approvedBy || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <div className="text-primary flex flex-row gap-2 items-center">
                                        <StarBorderPurple500Icon />
                                        <div className="flex flex-row gap-5 items-center">
                                            <p className="subtitle2 !font-bold">
                                                Attendee
                                            </p>
                                            {classInfo.attendeeTypeName ||
                                                'N/A'}
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails2>
                                    <div className="grid grid-cols-3">
                                        <div className="bg-primary flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor">
                                            <p className="subtitle2 !font-bold">
                                                Planned
                                            </p>
                                            <h3>
                                                {classInfo?.plannedAttendee ||
                                                    '0'}
                                            </h3>
                                        </div>
                                        <div className="bg-[#285D9A] text-primary flex flex-col justify-center items-center gap-2 p-4">
                                            <p className="subtitle2 !font-bold">
                                                Accepted
                                            </p>
                                            <h3>
                                                {classInfo?.acceptedAttendee ||
                                                    '0'}
                                            </h3>
                                        </div>
                                        <div className="bg-[#F1F1F1] flex flex-col justify-center items-center gap-2 p-4">
                                            <p className="subtitle2 !font-bold">
                                                Actual
                                            </p>
                                            <h3>
                                                {classInfo?.actualAttendee ||
                                                    '0'}
                                            </h3>
                                        </div>
                                    </div>
                                </AccordionDetails2>
                            </Accordion>
                        </div>
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    <div className="text-primary flex flex-row gap-2 items-center">
                                        <CalendarTodayIcon />
                                        <p className="subtitle2 !font-bold">
                                            Time frame
                                        </p>
                                        {classInfo?.startDate || 'N/A'} -{' '}
                                        {classInfo?.endDate || 'N/A'}
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
                    <SyllabusTab
                        tabContent={[
                            {
                                key: 0,
                                content: <ItemOne id={id} />,
                            },
                            { key: 1, content: 1 },
                            { key: 2, content: 2 },
                            { key: 3, content: 3 },
                        ]}
                        onChange={() => console.log('onChange')}
                        tabName={[
                            'Training Program',
                            'Attendee List',
                            'Budget',
                            'Others',
                        ]}
                    />
                </section>
            </div>
        </div>
    );
}

export default ClassDetail;
