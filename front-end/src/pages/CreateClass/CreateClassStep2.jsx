import { useState } from 'react';
import {
    MoreIcon,
    CalendarIcon,
    DropdownIcon,
    GradeIcon,
} from '../../assets/Icons';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SearchDropdown from './SearchDropdown';

function CreateClassStep2() {
    const [tag, setTag] = useState(1);
    const [searchContent, setSearchContent] = useState('');
    const SearchDropdownData = [
        {
            duration: '31 days (97 hours)',
            name: 'DevOps Foundation',
            modified: '23/07/2022 by Johny Deep',
        },
        {
            duration: '31 days (97 hours)',
            name: 'DevOps Foundation',
            modified: '23/07/2022 by Johny Deep',
        },
        {
            duration: '31 days (97 hours)',
            name: 'DevOps Foundation',
            modified: '23/07/2022 by Johny Deep',
        },
        {
            duration: '31 days (97 hours)',
            name: 'DevOps Foundation',
            modified: '23/07/2022 by Johny Deep',
        },
        {
            duration: '31 days (97 hours)',
            name: 'DevOps Foundation',
            modified: '23/07/2022 by Johny Deep',
        },
    ];
    return (
        <>
            <Header></Header>
            <div className="mt-[79px]">
                <Sidebar></Sidebar>
            </div>
            <div className="mt-[79px] ml-[256px]">
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
                        <div className="bg-[#8B8B8B] text-white px-[20px] py-[5px] flex items-center justify-between rounded-[10px] h-[40px]">
                            <div className="flex items-center gap-[10px]">
                                <CalendarIcon></CalendarIcon>
                                <p className="text-[14px] font-bold">General</p>
                            </div>
                            <div className="cursor-pointer">
                                <DropdownIcon></DropdownIcon>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/3">
                        <div className="bg-[#8B8B8B] text-white px-[20px] py-[5px] flex items-center justify-between rounded-[10px] h-[40px]">
                            <div className="flex items-center gap-[10px]">
                                <CalendarIcon></CalendarIcon>
                                <p className="text-[14px] font-bold">
                                    Time frame
                                    <span className="font-normal inline-block ml-[10px]">
                                        25-Apr-22 to 21-July-22
                                    </span>
                                </p>
                            </div>
                            <div className="cursor-pointer">
                                <DropdownIcon></DropdownIcon>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-[20px] py-[30px] flex gap-[20px]">
                    <div className="w-1/3">
                        <div className="bg-[#8B8B8B] text-white px-[20px] py-[5px] flex items-center justify-between rounded-[10px] h-[40px]">
                            <div className="flex items-center gap-[10px]">
                                <GradeIcon></GradeIcon>
                                <p className="text-[14px] font-bold">
                                    Attendee
                                    <span className="inline-block ml-[20px] font-normal">
                                        Fresher
                                    </span>
                                </p>
                            </div>
                            <div className="cursor-pointer">
                                <DropdownIcon></DropdownIcon>
                            </div>
                        </div>
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
                    <div className="px-[30px] py-[20px] flex items-center gap-[15px] bg-[#2D3748]">
                        <p className="font-semibold text-white text-[16px]">
                            Training Program name
                        </p>
                        <div className="relative flex items-center">
                            <div className="absolute flex items-center top-1/2 -translate-y-1/2 left-[16px] cursor-pointer">
                                <SearchOutlined style={{ fontSize: '20px' }} />
                            </div>
                            <input
                                type="search"
                                className="placeholder:italic placeholder:text-[12px] placeholder:font-medium placeholder:text-[#474747] text-[#474747] font-medium pr-[16px] pl-[40px] py-[10px] block w-[300px] text-[12px] border border-gray-300 rounded-[8px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Select program..."
                                value={searchContent}
                                onChange={(e) =>
                                    setSearchContent(e.target.value)
                                }
                            />
                            {searchContent !== '' && (
                                <div className="absolute top-[38px]">
                                    <SearchDropdown data={SearchDropdownData} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-[30px] flex items-center justify-end text-[14px] font-bold gap-[10px] mb-[200px]">
                        <p className="underline text-[#E74A3B] cursor-pointer">
                            Cancel
                        </p>
                        <button className="bg-[#474747] px-[25px] py-[8px] text-white rounded-[8px]">
                            Save as draft
                        </button>
                        <button className="bg-[#2D3748] px-[25px] py-[8px] text-white rounded-[8px]">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateClassStep2;
