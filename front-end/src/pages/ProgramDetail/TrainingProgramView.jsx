import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Footer, Header } from '/src/components';
import './TrainingProgramDetail.css';

import TrainingProgramDetailHeader from './TrainingProgramDetailHeader';
import TrainingProgramDetailDuration from './TrainingProgramDetailDuration';
import { SyllabusCard } from '../../components';

const TrainingProgramView = ({ TrainingProgram }) => {
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
                        <section id="content" className="pb-[100px]">
                            <h4 className="text-[1.6rem] font-bold pt-[10px]">
                                Content
                            </h4>
                            <div className="relative">
                                {TrainingProgram.syllabi.map((syllabus) => (
                                    <div
                                        key={syllabus.id}
                                        className="mt-[20px]"
                                    >
                                        <SyllabusCard
                                            programName={syllabus.name}
                                            syllabusName={syllabus.code}
                                            active={
                                                syllabus.active === 'Active'
                                            }
                                            duration={
                                                <span>
                                                    {syllabus.days + ' '} days{' '}
                                                    <em>
                                                        ({syllabus.hours + ' '}{' '}
                                                        hours)
                                                    </em>{' '}
                                                </span>
                                            }
                                            modified={
                                                <span>
                                                    Modified on{' '}
                                                    <em>
                                                        {syllabus.modified_on}
                                                    </em>{' '}
                                                    by{' '}
                                                    <strong>
                                                        {syllabus.modified_by}
                                                    </strong>
                                                </span>
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </section>
            </div>
        </>
    );
};

TrainingProgramView.propTypes = {
    TrainingProgram: PropTypes.object.isRequired,
};

export default TrainingProgramView;
