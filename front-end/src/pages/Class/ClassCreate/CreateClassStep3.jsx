import { useState } from 'react';
import {
	CalendarIcon,
	DropdownIcon,
	MoreIcon,
	AlarmIcon,
} from '../../../assets/icons';
import { TimePicker } from 'antd';

function CreateClassStep3() {
	const [showGeneral, setShowGeneral] = useState(true);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const onChangeStartTime = (time) => {
		console.log(time);
		setStartTime(time);
	};
	const onChangeEndTime = (time) => {
		setEndTime(time);
	};
	return (
		<div>
			<div className="bg-[#2D3748] flex flex-col gap-[10px] px-[30px] py-[20px]">
				<p className="text-white font-medium text-[24px] tracking-[0.2em]">
					Class
				</p>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-[20px]">
						<p className="text-white font-bold text-[36px] tracking-[0.2em]">
							Fresher Develop Operation
						</p>
						<button className="text-white bg-[#B9B9B9] px-[15px] py-[5px] rounded-[50px] border-[1.5px] border-white">
							Planning
						</button>
					</div>
					<div>
						<MoreIcon />
					</div>
				</div>
				<p className="text-white font-bold text-[16px]">
					HCM22_FR_DevOps_01
				</p>
				<div className="w-[645px] h-[0.5px] bg-white"></div>
				<div className="flex items-center gap-[10px]">
					<p className="text-white text-[14px] font-normal pr-[5px] ml-[10px]">
						<span className="font-bold text-[24px]">31 </span>
						days (97 hours)
					</p>
					<div className="h-[16px] w-[1px] bg-white"></div>
					<div className="flex items-center gap-[15px]">
						{/* <AssignmentIcon></AssignmentIcon>
                            <LecturerIcon></LecturerIcon>
                            <ExamIcon></ExamIcon>
                            <SeminarIcon></SeminarIcon>
                            <GuideIcon></GuideIcon> */}
					</div>
				</div>
			</div>
			<div className="px-[20px] py-[30px] flex gap-[20px]">
				<div className="w-1/3">
					<div className="bg-[#2D3748] text-white px-[20px] py-[5px] flex items-center justify-between rounded-[10px] h-[40px]">
						<div className="flex items-center gap-[10px]">
							<CalendarIcon></CalendarIcon>
							<p className="text-[14px] font-bold">General</p>
						</div>
						<div
							className="cursor-pointer"
							onClick={() => setShowGeneral(!showGeneral)}
						>
							<DropdownIcon></DropdownIcon>
						</div>
					</div>
					<div
						className={`bg-white flex flex-col gap-[15px] rounded-[10px] p-[20px] class-detail-wrapper`}
					>
						<div className="flex items-center gap-[24px]">
							<div className="flex items-center gap-[10px] min-w-[110px]">
								<AlarmIcon />
								<p className="font-bold text-[14px]">
									Class time
								</p>
							</div>
							<div className="flex items-center gap-[15px]">
								<div className="flex items-center gap-[10px]">
									<p className="text-[14px] font-medium">
										from
									</p>
									<TimePicker
										onChange={onChangeStartTime}
										changeOnScroll
										needConfirm={false}
										value={startTime}
										format="HH:mm"
										showNow={false}
										placeholder=""
									/>
								</div>
								<div className="flex items-center gap-[10px]">
									<p className="text-[14px] font-medium">
										to
									</p>
									<TimePicker
										onChange={onChangeEndTime}
										changeOnScroll
										needConfirm={false}
										value={endTime}
										format="HH:mm"
										showNow={false}
										placeholder=""
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateClassStep3;
