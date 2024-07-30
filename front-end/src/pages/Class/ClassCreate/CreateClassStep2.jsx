import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import URL from '../../../constants/url';
import getGMT7Date from '../../../utils/getGMT7Date';
import dayjs from 'dayjs';

import { Calendar } from 'antd';
import Divider from '@mui/material/Divider';
import { MdOutlineWarning } from "react-icons/md";

import Chip1 from "../../../components/Chips/Chip1";
import NewTabs from './components/NewTabs';

import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	AccordionDetails2
} from './components/CustomAccordion';


import {
	Select,
	Input,
	DatePicker,
	Button,
	Tooltip
} from 'antd';
const { RangePicker } = DatePicker;

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

const onPanelChange = (value, mode) => {
	console.log(value.format('YYYY-MM-DD'), mode);
};

function CreateClassStep2() {
	const [showTimeFrame, setShowTimeFrame] = useState(true);
	const [updatedClass, setUpdatedClass] = useState({
		createdBy: "HuyNN",
		createdDate: getGMT7Date(),
		updatedBy: "HuyNN",
		updatedDate: getGMT7Date(),
		classStatus: "Planning",
		classCode: '',
		duration: 100,
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		approvedBy: "",
		approvedDate: "",
		reviewBy: "",
		reviewDate: "",
		acceptedAttendee: 0,
		actualAttendee: 0,
		className: "",
		plannedAttendee: 10,
		slotTime: 0,
		fsuId: {
			name: '',
			email: '',
		},
		classAdminName: [],
		locationId: "HCMC",
		attendeeLevelId: "",
		trainingProgramCode: "",
	});

	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate(`/class/list`);
	}

	const { className } = useParams();

	function handleChange(e) {
		setUpdatedClass({
			...updatedClass,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const classInfo = {
			className: className,
			classCode: updatedClass.classCode,
			startTime: updatedClass.startTime,
			endTime: updatedClass.endTime,
			classAdminName: updatedClass.classAdminName,
			fsuId: updatedClass.fsuId,
			attendeeLevelId: updatedClass.attendeeLevelId,
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
		};
		axios
			.post(`${URL.MOCK_API_CLASS}`, classInfo)
			.then((response) => {
				console.log('Class updated successfully.', response.data);
			});
		console.log(getGMT7Date());
		console.log(updatedClass.createdDate);
		handleNavigate();
	}

return (
	<form onSubmit={handleSubmit} className='block'>
		<section className="p-5 text-primary bg-main border border-t-2 flex flex-row justify-between items-center">
			<div className="flex flex-col gap-3">
				<h4>Class</h4>
				<div className="flex flex-row gap-5 items-center">
					<h2>{className}</h2>
					<Chip1 text="Planning" closable={false} inactive={true} />
				</div>
				<p className="subtitle1">
					<Input className='text-main' name='classCode' type='text' value={updatedClass.classCode} onChange={handleChange} placeholder='Type class code' />
				</p>
				<div className="h-0.5 w-96 bg-primary"></div>
				<div className="flex flex-row gap-5 items-center">
					<div>
						<span className="text-3xl font-bold">31</span> days <span>(91 days)</span>
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
											<input type='time' name='startTime' value={updatedClass.startTime} onChange={handleChange} />
											<p>to</p>
											<input type='time' name='endTime' value={updatedClass.endTime} onChange={handleChange} />
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
											value={updatedClass.classAdminName}
											onChange={(value) => setUpdatedClass({ ...updatedClass, classAdminName: value })}
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
												value={updatedClass.fsuId.name}
												onChange={(value) => setUpdatedClass({ ...updatedClass, fsuId: value })}
												options={[
													{ value: 'DungLL23', label: 'Ly Lien Lien Dung' },
													{ value: 'LienDL45', label: 'Dung Lien Ly Lien' },
													{ value: 'LyLD20', label: 'Lien Dung Lien Ly' },
													{ value: 'LienDL13', label: 'Dung Ly Lien Lien' },
												]}
											/>
											<Select
												placeholder="contact point"
												value={updatedClass.fsuId.email}
												onChange={(value) => setUpdatedClass({ ...updatedClass, fsuId: value })}
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
											value={updatedClass.attendeeLevelId}
											onChange={(value) => setUpdatedClass({ ...updatedClass, attendeeLevelId: value })}
											style={{ width: 200 }}
											placeholder="select"
											options={[
												{ value: 'intern', label: 'Intern' },
												{ value: 'fresher', label: 'Fresher' },
												{ value: 'middle', label: 'Middle' },
												{ value: 'senior', label: 'Senior' },
											]}
										/>
									</div>
								</div>
							</AccordionSummary>
							<AccordionDetails2>
								<div className='grid grid-cols-3'>
									<div className='bg-primary flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor'>
										<p className='subtitle2 !font-bold'>Planned</p>
										<Input name='plannedAttendee' type='number' value={updatedClass.plannedAttendee} onChange={handleChange} className='text-3xl text-center' />
									</div>
									<div className='bg-[#285D9A] flex flex-col justify-center items-center gap-2 p-4 text-inputHiddenColor'>
										<p className='subtitle2 !font-bold'>Accepted</p>
										<Input name='acceptedAttendee' type='number' value={updatedClass.acceptedAttendee} onChange={handleChange} className='text-3xl text-center' />
									</div>
									<div className='bg-[#F1F1F1] flex flex-col justify-center items-center gap-2 p-4'>
										<p className='subtitle2 !font-bold'>Actual</p>
										<Input name='actualAttendee' type='number' value={updatedClass.actualAttendee} onChange={handleChange} className='text-3xl text-center' />
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
									<RangePicker />
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
						<ButtonComponent className='bg-alert text-primary rounded-xl' text="Cancel" />
						<ButtonComponent htmlType='submit' className='bg-box text-main rounded-xl' text={'Save as draft'} />
					</div>
					<ButtonComponent text={'Next'} className='border border-main text-main rounded-xl' iconPosition='end' icon={<ArrowForwardIcon />} />
				</div>
			</section>
		</div>
	</form>
);
}

export default CreateClassStep2;