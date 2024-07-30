import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Calendar } from 'antd';
import Divider from '@mui/material/Divider';
import { MdOutlineWarning } from "react-icons/md";
import URL from '../../../constants/url';

import Chip1 from "../../../components/Chips/Chip1";
import NewTabs from './components/NewTabs';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionDetails2
} from './components/CustomAccordion';


import {
  TimePicker,
  Select,
  Input,
  DatePicker,
  Button,
  Tooltip
} from 'antd';

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

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

function ClassUpdate() {
  const [showTimeFrame, setShowTimeFrame] = useState(true);
  const [classInfo, setClassInfo] = useState({
    className: '',
    classCode: '',
    startTime: '',
    endTime: '',
    classAdminName: '',
    fsuId: '',
    attendeeLevelId: '',
    plannedAttendee: '',
    acceptedAttendee: '',
    actualAttendee: '',
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    classStatus: '',
    duration: '',
    startDate: '',
    endDate: '',
    approvedBy: '',
    approvedDate: '',
    reviewBy: '',
    reviewDate: '',
    slotTime: '',
    locationId: '',
    trainingProgramCode: '',
  });

  const format = 'HH:mm';

  const { id } = useParams();
  console.log('id', id);

  const fetchData = async () => {
		try {
			const response = await axios.get(`${URL.MOCK_API_CLASS}/${id}`);
			setClassInfo(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
    console.log('classInfo', classInfo);
	}, []);

  const handleChange = (e) => {
    setClassInfo({
      ...classInfo,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedClassInfo = {
      className: classInfo.className,
      classCode: classInfo.classCode,
      startTime: classInfo.startTime,
      endTime: classInfo.endTime,
      classAdminName: classInfo.classAdminName,
      fsuId: classInfo.fsuId,
      attendeeLevelId: classInfo.attendeeLevelId,
      plannedAttendee: classInfo.plannedAttendee,
      acceptedAttendee: classInfo.acceptedAttendee,
      actualAttendee: classInfo.actualAttendee,
      createdBy: classInfo.createdBy,
      createdDate: classInfo.createdDate,
      updatedBy: classInfo.updatedBy,
      updatedDate: classInfo.updatedDate,
      classStatus: classInfo.classStatus,
      duration: classInfo.duration,
      startDate: classInfo.startDate,
      endDate: classInfo.endDate,
      approvedBy: classInfo.approvedBy,
      approvedDate: classInfo.approvedDate,
      reviewBy: classInfo.reviewBy,
      reviewDate: classInfo.reviewDate,
      slotTime: classInfo.slotTime,
      locationId: classInfo.locationId,
      trainingProgramCode: classInfo.trainingProgramCode,
    };
    try {
      axios
        .put(`${URL.MOCK_API_CLASS}/${id}`, updatedClassInfo)
        .then((response) => {
          console.log('Class updated successfully.', response.data);
        });
    } catch (error) {
      console.error(error);
    }
    handleNavigate();
  }

  const navigate = useNavigate();
	const handleNavigate = () => {
		navigate(`/class/list`);
	}

  return (
    <div className='block'>
      <section className="p-5 text-primary bg-main border border-t-2 flex flex-row justify-between items-center">
        <div className="flex flex-col gap-3">
          <h4>Class</h4>
          <div className="flex flex-row gap-5 items-center">
            <h2>
              <input className='rounded-lg px-3 text-main py-1' type="text" name="className" value={classInfo.className} onChange={handleChange} />
            </h2>
            <Chip1 text="Planning" isActive={false} isRounded />
          </div>
          <p className="subtitle1">
            <input className='rounded-md text-main px-3 py-1' type='text' name='classCode' value={classInfo.classCode} onChange={handleChange} />
          </p>
          <div className="h-0.5 w-96 bg-primary"></div>
          <div className="flex flex-row gap-5 items-center">
            <div>
              <span className="text-3xl mr-1 font-bold">
                <input className='rounded-lg px-3 text-main py-1 w-20' type="text" name="duration" value={classInfo.duration} onChange={handleChange} />
              </span> days
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
      <div className='p-5 flex flex-col gap-5'>
        <section className="flex flex-row gap-5">
          <div className="grid grid-cols-[1fr_2fr] gap-5">
            <div className='flex flex-col gap-5'>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className='text-primary flex flex-row gap-2 items-center'>
                    <CalendarTodayIcon />
                    <p className='subtitle2 !font-bold'>General</p>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <div className='flex flex-row gap-2 items-center'>
                        <AccessAlarmIcon />
                        <p className='subtitle2 !font-bold'>Class time</p>
                      </div>
                      <div className='flex subtitle2 !font-normal flex-row items-center justify-between'>
                        <p>from</p>
                        <input type='time' name='startTime' value={classInfo.startTime} onChange={handleChange} />
                        <p>to</p>
                        <input type='time' name='endTime' value={classInfo.endTime} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <div className='flex flex-row gap-2 items-center text-unmodified'>
                        <BusinessIcon />
                        <p className='subtitle2 !font-bold'>Location</p>
                      </div>
                      {/* <div className='flex flex-col gap-2'>
                        <p className='text-sm'>FTown 1</p>
                        <p className='text-sm'>FTown 2</p>
                      </div> */}
                    </div>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <div className='flex flex-row gap-2 items-center text-unmodified'>
                        <RecordVoiceOverIcon />
                        <p className='subtitle2 !font-bold text-unmodified'>Trainers</p>
                      </div>
                    </div>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <div className='flex flex-row gap-2 items-center'>
                        <AdminPanelSettingsIcon />
                        <p className='subtitle2 !font-bold'>Admin</p>
                      </div>
                      <Select
                        value={classInfo.classAdminName}
                        onChange={(value) => setclassInfo({ ...classInfo, classAdminName: value })}
                        mode='multiple'
                        placeholder="select..."
                        options={[
                          { value: 'DungLL23', label: 'Ly Lien Lien Dung' },
                          { value: 'LienDL45', label: 'Dung Lien Ly Lien' },
                          { value: 'LyLD20', label: 'Lien Dung Lien Ly' },
                          { value: 'LienDL13', label: 'Dung Ly Lien Lien' },
                        ]}
                      />
                    </div>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <div className='flex flex-row gap-2 items-center'>
                        <StarsIcon />
                        <p className='subtitle2 !font-bold'>FSU</p>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <Select
                          placeholder="select"
                          value={classInfo.fsuId}
                          onChange={(value) => setClassInfo({ ...classInfo, fsuId: value })}
                          options={[
                            { value: 'DungLL23', label: 'Ly Lien Lien Dung' },
                            { value: 'LienDL45', label: 'Dung Lien Ly Lien' },
                            { value: 'LyLD20', label: 'Lien Dung Lien Ly' },
                            { value: 'LienDL13', label: 'Dung Ly Lien Lien' },
                          ]}
                        />
                        <Select
                          value={classInfo.fsuId}
                          onChange={(value) => setClassInfo({ ...classInfo, fsuId: value })}
                          placeholder="contact point"
                          options={[
                            { value: 'DungLL23', label: 'DungLL23@fsoft.com.vn' },
                            { value: 'LienDL45', label: 'LienDL45@fsoft.com.vn' },
                            { value: 'LyLD20', label: 'LyLD20@fsoft.com.vn' },
                            { value: 'LienDL13', label: 'LienDL13@fsoft.com.vn' },
                          ]}
                        />
                      </div>
                    </div>
                    <Divider />
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <p className='subtitle2 !font-bold text-unmodified'>Created</p>
                    </div>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <p className='subtitle2 !font-bold text-unmodified'>Reviewed</p>
                    </div>
                    <div className='grid grid-cols-[0.5fr_1fr] items-center gap-4'>
                      <p className='subtitle2 !font-bold text-unmodified'>Approved</p>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className='text-primary flex flex-row gap-2 items-center'>
                    <StarBorderPurple500Icon />
                    <div className='flex flex-row gap-5 items-center'>
                      <p className='subtitle2 !font-bold'>Attendee</p>
                      <Select
                        value={classInfo.attendeeLevelId}
                        onChange={(value) => setClassInfo({ ...classInfo, attendeeLevelId: value })}
                        style={{ width: 200 }}
                        placeholder="select"
                        options={[
                          { value: 'DungLL23', label: 'Ly Lien Lien Dung' },
                          { value: 'LienDL45', label: 'Dung Lien Ly Lien' },
                          { value: 'LyLD20', label: 'Lien Dung Lien Ly' },
                          { value: 'LienDL13', label: 'Dung Ly Lien Lien' },
                        ]}
                      />
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails2>
                  <div className='grid grid-cols-3'>
                    <div className='bg-primary flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor'>
                      <p className='subtitle2 !font-bold'>Planned</p>
                      <Input name='plannedAttendee' type='number' value={classInfo.plannedAttendee} onChange={handleChange} className='text-3xl text-center' />
                    </div>
                    <div className='bg-[#285D9A] flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor'>
                      <p className='subtitle2 !font-bold'>Accepted</p>
                      <Input name='acceptedAttendee' type='number' value={classInfo.acceptedAttendee} onChange={handleChange} className='text-3xl text-center' />
                    </div>
                    <div className='bg-[#F1F1F1] flex flex-col justify-center items-center gap-2 p-4'>
                      <p className='subtitle2 !font-bold'>Actual</p>
                      <Input name='actualAttendee' type='number' value={classInfo.actualAttendee} onChange={handleChange} className='text-3xl text-center' />
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
                  <div className='text-primary flex flex-row gap-2 items-center'>
                    <CalendarTodayIcon />
                    <p className='subtitle2 !font-bold'>Time frame</p>
                    <p className='ml-5'>start date</p>
                    <DatePicker />
                    <Tooltip title="Start day is missing.">
                      <Button type="primary" danger shape="round" icon={<MdOutlineWarning className='text-3xl' />} />
                    </Tooltip>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {showTimeFrame && (
                    <div className={`flex items-center gap-[20px]`}>
                      <div>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                      </div>
                      <div>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
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
        <section className='flex flex-row justify-between'>
          <Button className='border border-main text-main rounded-xl' icon={<ArrowBackIcon />}>
            Back
          </Button>
          <div className='flex flex-row gap-10'>
            <div className='flex flex-row gap-2'>
              <Button className='bg-alert text-primary rounded-xl'>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className='bg-box text-main rounded-xl'>
                Save as draft
              </Button>
            </div>
            <Button disabled onClick={handleNavigate} className='border border-main text-main rounded-xl' iconPosition='end' icon={<ArrowForwardIcon />}>
              Next
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClassUpdate;