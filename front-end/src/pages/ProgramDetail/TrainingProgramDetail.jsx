import  { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Footer, Header } from '/src/components';
import './TrainingProgramDetail.css';

import TrainingProgramDetailHeader from './TrainingProgramDetailHeader';
// import Button from '../../components/Button';
import { ArrowDropdownCircleIcon, ButtonArrowIcon } from '../../assets';
import TrainingProgramDetailDuration from './TrainingProgramDetailDuration';
import { SyllabusCard, SyllabusDetail, Button } from '../../components';
import ViewProgramMaterial from '../../components/ProgramDetail/ViewProgramMaterial';

const TrainingProgramDetail = ({ TrainingProgram, Syllabus }) => {
    return (
        <>
            <Header />
            <Footer />
            <div className="w-[100vw] h-[100vh] flex pt-[79px]">
                <section
                    id="sidebar"
                    className="w-[266px] h-full fixed top-0 left-0 bg-primary z-[50]"
                ></section>
                <section
                    id="program-detail-page"
                    className="w-full h-full ml-[266px]"
                >
                    <header className="w-full min-h-[123px] py-[20px] bg-primary">
                        <TrainingProgramDetailHeader
                            name={TrainingProgram.name}
                            status={TrainingProgram.status}
                        />
                    </header>
                    <section>
                        <TrainingProgramDetailDuration
                            days={TrainingProgram.days}
                            hours={TrainingProgram.hours}
                            modified_on={TrainingProgram.modified_on}
                            modified_by={TrainingProgram.modified_by}
                        />
                    </section>
                    <main>
                        <section id="general-information" className="mb-[20px]">
                            <h4 className="text-[2.4rem] font-bold">
                                General information
                            </h4>
                            <Card
                                general_information={
                                    TrainingProgram.general_information
                                }
                            />
                        </section>
                        <section id="content" className="">
                            <h4 className="text-[2.4rem] font-bold">Content</h4>
                            <div className="w-full relative">
                                <div className="absolute top-[20px] right-[20px]">
                                    <Button.ButtonPrimary
                                        width={44}
                                        height={30}
                                        icon={<ButtonArrowIcon />}
                                    />
                                </div>
                                <SyllabusCard
                                    key={Syllabus.id}
                                    width="w-full"
                                    programName={Syllabus.name}
                                    syllabusName={Syllabus.code}
                                    active={Syllabus.active === 'Active'}
                                    duration={
                                        <span>
                                            {Syllabus.days + ' '} days{' '}
                                            <em>
                                                ({Syllabus.hours + ' '} hours)
                                            </em>{' '}
                                        </span>
                                    }
                                    modified={
                                        <span>
                                            Modified on{' '}
                                            <em>{Syllabus.modified_on}</em> by{' '}
                                            <strong>
                                                {Syllabus.modified_by}
                                            </strong>
                                        </span>
                                    }
                                />
                                <div
                                    id="syllabus-content"
                                    className="w-[calc(100% + 0)] h-[1017px] ml-[-30px] pl-[30px] mr-[-25px] pr-[25px] pb-[100px] relative overflow-x-visible overflow-y-auto"
                                >
                                    {Syllabus.syllabus_days.map(
                                        (syllabus_day) => (
                                            <ProgramDay
                                                key={syllabus_day.id}
                                                syllabus_day={syllabus_day}
                                                roundedCorner={
                                                    syllabus_day.id == 1 ||
                                                    Syllabus.syllabus_days[
                                                        syllabus_day.id - 2
                                                    ].units.length > 0
                                                }
                                            /> // since day.id starts from 1 => previous item's id in array is day.id - 1 - 1
                                        )
                                    )}
                                </div>
                            </div>
                        </section>
                    </main>
                </section>
            </div>
        </>
    );
};

const Card = ({ general_information }) => {
    return (
        <div className="w-[946px] p-[2rem] rounded-[10px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
            <ul className="text-[1.4rem] list-disc pl-[2rem]">
                {general_information.map((line, index) => (
                    <li key={index}>{line}</li>
                ))}
            </ul>
        </div>
    );
};

const ProgramDay = ({ syllabus_day, roundedCorner }) => {
    return (
        <div
            className={`${syllabus_day.units.length > 0 ? 'rounded-[20px] mb-[30px]' : 'border-b-[1px] border-b-[#F1F1F1]'} text-[1.6rem] shadow-[0_20px_40px_0_rgba(0,0,0,0.16)]`}
        >
            <label className="">
                <h6
                    className={`w-full min-h-[39px] px-[20px] py-[10px] ${roundedCorner ? 'rounded-t-[20px]' : ''} bg-primary font-bold text-[#FFF]`}
                >
                    Day {syllabus_day.id}
                </h6>
            </label>
            <div className="">
                {syllabus_day.units.map((unit) => (
                    <UnitTab
                        key={unit.id}
                        day_no={syllabus_day.id}
                        unit={unit}
                        maxId={syllabus_day.units.length}
                    />
                ))}
            </div>
        </div>
    );
};

const UnitTab = ({ day_no, unit, maxId }) => {
    const [viewChapter, setViewChapter] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(
        new Array(unit.unit_chapters.length).fill(false)
    );

    useEffect(() => {
        console.log(isModalOpen);
    }, [isModalOpen]);

    return (
        <div
            className={`flex font-bold ${unit.id < maxId ? 'border-b-[0.7px] border-[#000]' : ''}`}
        >
            <h6 className="w-[150px] h-full p-[20px]">Unit {unit.unit_no}</h6>
            <div className="w-full p-[20px] relative">
                <i
                    className="absolute top-[20px] right-[20px] cursor-pointer"
                    onClick={() => {
                        setViewChapter((viewChapter) => !viewChapter);
                    }}
                >
                    <ArrowDropdownCircleIcon />
                </i>
                <label>
                    <h6>{unit.name}</h6>
                    <p className="font-normal">
                        <em>{unit.duration}hrs</em>
                    </p>
                </label>
                <div className={`${viewChapter ? 'block' : 'hidden'}`}>
                    {unit.unit_chapters.map((unit_chapter) => (
                        <div key={unit_chapter.id}>
                            <ViewProgramMaterial
                                day_no={day_no}
                                unit_no={unit.unit_no}
                                unit_name={unit.name}
                                UnitChapter={unit_chapter}
                                isOpen={isModalOpen[unit_chapter.id - 1]}
                                setIsOpen={setIsModalOpen}
                            />
                            <a
                                className="cursor-pointer"
                                onClick={() =>
                                    setIsModalOpen((array) => {
                                        array[unit_chapter.id - 1] = true;
                                        return [...array];
                                    })
                                }
                            >
                                <SyllabusDetail
                                    width="w-full"
                                    detailInfo={unit_chapter}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

TrainingProgramDetail.propTypes = {
    TrainingProgram: PropTypes.object.isRequired,
    Syllabus: PropTypes.object.isRequired,
};

Card.propTypes = {
    general_information: PropTypes.arrayOf(PropTypes.string),
};

ProgramDay.propTypes = {
    syllabus_day: PropTypes.object.isRequired,
    roundedCorner: PropTypes.bool,
};

UnitTab.propTypes = {
    day_no: PropTypes.number,
    unit: PropTypes.object.isRequired,
    maxId: PropTypes.number,
};

export default TrainingProgramDetail;
