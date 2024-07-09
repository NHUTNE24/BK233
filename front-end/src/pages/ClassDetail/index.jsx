import {
    MoreIcon,
    AssignmentIcon,
    ExamIcon,
    GuideIcon,
    LecturerIcon,
    SeminarIcon,
    CalendarIcon,
    DropdownIcon,
    AlarmIcon,
    HomeworkIcon,
    LecturerIconBlue,
    StarIcon,
    SupplierIcon,
    GradeIcon,
} from '../../assets/Icons';
import GeneralItem from '../../components/GeneralItem';
import './ClassDetail.scss';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import SyllabusCard from '../../components/SyllabusCard';
import Cat from '../../assets/images/cat.png';

function ClassDetail() {
    const [showGeneral, setShowGeneral] = useState(true);
    const [showTimeFrame, setShowTimeFrame] = useState(true);
    const [showAttendee, setShowAttendee] = useState(true);
    const [tag, setTag] = useState(1);
    return (
        <>
            <div className={`mt-[79px]`}>
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
                        <p className="text-white text-[14px] font-normal pr-[5px]">
                            <span className="font-bold text-[24px]">31 </span>
                            days (97 hours)
                        </p>
                        <div className="h-[16px] w-[1px] bg-white"></div>
                        <div className="flex items-center gap-[15px]">
                            <AssignmentIcon></AssignmentIcon>
                            <LecturerIcon></LecturerIcon>
                            <ExamIcon></ExamIcon>
                            <SeminarIcon></SeminarIcon>
                            <GuideIcon></GuideIcon>
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
                        {showGeneral && (
                            <>
                                <div
                                    className={`bg-white flex flex-col gap-[15px] rounded-[10px] p-[20px] class-detail-wrapper`}
                                >
                                    <GeneralItem
                                        Icon={AlarmIcon}
                                        data={['09:00 - 12:00']}
                                        label={'Class time'}
                                    ></GeneralItem>
                                    <GeneralItem
                                        Icon={HomeworkIcon}
                                        data={['FTown 1', 'FTown 2', 'FTown 3']}
                                        label={'Location'}
                                    ></GeneralItem>
                                    <GeneralItem
                                        Icon={LecturerIconBlue}
                                        data={[
                                            'Dinh Vu Quoc Trung',
                                            'Ba Chu Heo',
                                            'Hu Cheo Ba',
                                            'Tap The Lop',
                                        ]}
                                        url={[
                                            'http://localhost:5173/DinhVuQuocTrung',
                                            'http://localhost:5173/BaChuHeo',
                                            'http://localhost:5173/HuCheoBa',
                                            'http://localhost:5173/TapTheLop',
                                        ]}
                                        label={'Trainer'}
                                    ></GeneralItem>
                                    <GeneralItem
                                        Icon={StarIcon}
                                        data={[
                                            'Ly Lien Lien Dung',
                                            'Dung Lien Lien Ly',
                                        ]}
                                        url={[
                                            'http://localhost:5173/LyLienLienDung',
                                            'http://localhost:5173/DungLienLienLy',
                                        ]}
                                        label={'Admin'}
                                    ></GeneralItem>
                                    <GeneralItem
                                        Icon={SupplierIcon}
                                        data={['FHM', 'BaCH@fsoft.com.vn']}
                                        label={'FSU'}
                                    ></GeneralItem>
                                    <div className="h-[0.5px] bg-black"></div>
                                    <GeneralItem
                                        data={['25/03/2022 by DanPL']}
                                        label={'Created'}
                                    ></GeneralItem>
                                    <GeneralItem
                                        data={['30/03/2022 by TrungDVQ']}
                                        label={'Review'}
                                    ></GeneralItem>
                                    <GeneralItem
                                        data={['02/04/2022 by VongNT']}
                                        label={'Approve'}
                                    ></GeneralItem>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-2/3">
                        <div className="bg-[#2D3748] text-white px-[20px] py-[5px] flex items-center justify-between rounded-[10px] h-[40px]">
                            <div className="flex items-center gap-[10px]">
                                <CalendarIcon></CalendarIcon>
                                <p className="text-[14px] font-bold">
                                    Time frame
                                    <span className="font-normal inline-block ml-[10px]">
                                        25-Apr-22 to 21-July-22
                                    </span>
                                </p>
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => setShowTimeFrame(!showTimeFrame)}
                            >
                                <DropdownIcon></DropdownIcon>
                            </div>
                        </div>
                        {showTimeFrame && (
                            <div
                                className={`bg-white flex items-center gap-[20px] rounded-[10px] p-[20px] class-detail-wrapper`}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateCalendar />
                                </LocalizationProvider>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DateCalendar />
                                </LocalizationProvider>
                            </div>
                        )}
                    </div>
                </div>
                <div className="px-[20px] py-[30px] flex gap-[20px]">
                    <div className="w-1/3">
                        <div className="bg-[#2D3748] text-white px-[20px] py-[5px] flex items-center justify-between rounded-[10px] h-[40px]">
                            <div className="flex items-center gap-[10px]">
                                <GradeIcon></GradeIcon>
                                <p className="text-[14px] font-bold">
                                    Attendee
                                    <span className="inline-block ml-[20px] font-normal">
                                        Fresher
                                    </span>
                                </p>
                            </div>
                            <div
                                className="cursor-pointer"
                                onClick={() => setShowAttendee(!showAttendee)}
                            >
                                <DropdownIcon></DropdownIcon>
                            </div>
                        </div>
                        {showAttendee && (
                            <div className="flex class-detail-wrapper rounded-[10px]">
                                <div className="bg-black text-[#F1F1F1] flex flex-col gap-[15px] w-1/3 text-center rounded-l-[10px] py-[10px]">
                                    <p className="text-[14px] font-bold">
                                        Planned
                                    </p>
                                    <p className="text-[24px] font-medium tracking-[0.2em]">
                                        10
                                    </p>
                                </div>
                                <div className="bg-[#285D9A] text-[#F1F1F1] flex flex-col gap-[15px] w-1/3 text-center py-[10px]">
                                    <p className="text-[14px] font-bold">
                                        Accepted
                                    </p>
                                    <p className="text-[24px] font-medium tracking-[0.2em]">
                                        9
                                    </p>
                                </div>
                                <div className="bg-[#F1F1F1] text-black flex flex-col gap-[15px] w-1/3 text-center rounded-r-[10px] py-[10px]">
                                    <p className="text-[14px] font-bold">
                                        Actual
                                    </p>
                                    <p className="text-[24px] font-medium tracking-[0.2em]">
                                        9
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-2/3"></div>
                </div>
                <div className="px-[20px]">
                    <div className="flex">
                        <div
                            onClick={() => setTag(1)}
                            className={`cursor-pointer w-[200px] h-[30px] flex items-center justify-center rounded-t-[20px] border border-white text-white text-[16px] ${tag === 1 ? 'bg-[#2D3748]' : 'bg-[#6D7684]'}`}
                        >
                            Training Program
                        </div>
                        <div
                            onClick={() => setTag(2)}
                            className={`cursor-pointer w-[200px] h-[30px] flex items-center justify-center rounded-t-[20px] border border-white text-white text-[16px] ${tag === 2 ? 'bg-[#2D3748]' : 'bg-[#6D7684]'}`}
                        >
                            Attendee list
                        </div>
                        <div
                            onClick={() => setTag(3)}
                            className={`cursor-pointer w-[200px] h-[30px] flex items-center justify-center rounded-t-[20px] border border-white text-white text-[16px] ${tag === 3 ? 'bg-[#2D3748]' : 'bg-[#6D7684]'}`}
                        >
                            Budget
                        </div>
                        <div
                            onClick={() => setTag(4)}
                            className={`cursor-pointer w-[200px] h-[30px] flex items-center justify-center rounded-t-[20px] border border-white text-white text-[16px] ${tag === 4 ? 'bg-[#2D3748]' : 'bg-[#6D7684]'}`}
                        >
                            Others
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-[10px] bg-[#2D3748] text-white training-program-name px-[30px] pt-[10px] pb-[20px]">
                            <p className="font-medium tracking-[0.2em] text-[24px]">
                                DevOps Foundation
                            </p>
                            <div className="flex gap-[10px] text-[14px]">
                                <p>31 days (97 hours)</p>
                                <div className="h-[16px] w-[1px] bg-white"></div>
                                <p>
                                    Modified on 23/07/2022 by{' '}
                                    <span className="font-bold">
                                        Warrior Tran
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-[20px] flex flex-col gap-[20px] mb-[100px]">
                        <div className="flex items-stretch">
                            <div
                                style={{
                                    boxShadow: '0px 4px 8px 3px #00000026',
                                }}
                                className="h-full px-[30px] py-[20px] w-1/5 bg-[#2D3748] flex items-center gap-[7px] rounded-l-[20px]"
                            >
                                <img
                                    src={Cat}
                                    alt=""
                                    className="block rounded-[50%] w-1/3"
                                />
                                <img
                                    src={Cat}
                                    alt=""
                                    className="block rounded-[50%] w-1/3"
                                />
                                <img
                                    src={Cat}
                                    alt=""
                                    className="block rounded-[50%] w-1/3"
                                />
                            </div>
                            <div className="w-4/5">
                                <SyllabusCard
                                    active
                                    syllabusName="Linux"
                                    programName="LIN v2.0"
                                    duration="4 days (12 hours)"
                                    modified="on 23/07/2022 by Johny Deep"
                                ></SyllabusCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClassDetail;
