import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { SyllabusCard2 } from 'src/components';
import { useEffect, useState } from 'react';

const TrainingProgramView = ({ TrainingProgram, setDestination }) => {
    const trainingProgramCode = TrainingProgram?.trainingProgramCode;
    const [syllabusList, setSyllabusList] = useState([]);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const username = import.meta.env.VITE_USERNAME;
        const password = import.meta.env.VITE_PASSWORD;
        const token = btoa(`${username}:${password}`);

        const fetchSyllabus = async () => {
            if (TrainingProgram?.syllabusId) {
                setSyllabusList([]);
                for (const syllabusId of TrainingProgram.syllabusId) {
                    try {
                        const res = await axios.get(
                            `${baseUrl}/api/syllabus/${syllabusId}`,
                            {
                                headers: {
                                    Authorization: `Basic ${token}`,
                                },
                            }
                        );
                        console.log(res.data);
                        setSyllabusList((prevList) => [...prevList, res.data.syllabus]);
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
        };

        fetchSyllabus();
    }, [TrainingProgram]);

    useEffect(() => {
        setDestination(`/program/view-program/${trainingProgramCode}`);
    }, [setDestination, trainingProgramCode]);

    return (
        <>
            <div className="w-full flex">
                <section id="training-program-view" className="w-full h-full">
                    <main>
                        <section id="content" className="pb-[100px]">
                            <div className="text-[1rem] font-bold pt-[10px]">
                                Content
                            </div>
                            <div className="flex flex-col gap-[20px] relative mt-[20px]">
                                {syllabusList?.map((Syllabus, index) => (
                                    <Link
                                        key={index}
                                        to={`${Syllabus?.id?.toLowerCase()}`}
                                    >
                                        <SyllabusCard2
                                            syllabusId={Syllabus?.id}
                                            syllabusName={Syllabus?.topicName}
                                            syllabusCode={
                                                Syllabus?.topicCode +
                                                ' v' +
                                                Syllabus?.version
                                            }
                                            isActive={
                                                Syllabus?.status === 'Active'
                                            }
                                            duration={
                                                <span>
                                                    {Syllabus?.days + ' '} days{' '}
                                                    <em>
                                                        ({Syllabus?.hours + ' '}{' '}
                                                        hours)
                                                    </em>{' '}
                                                </span>
                                            }
                                            modified={
                                                <span>
                                                    Modified on{' '}
                                                    <em>
                                                        {Syllabus?.modifiedDate}
                                                    </em>{' '}
                                                    by{' '}
                                                    <strong>
                                                        {Syllabus?.modifiedBy}
                                                    </strong>
                                                </span>
                                            }
                                        />
                                    </Link>
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
    setDestination: PropTypes.func,
};

export default TrainingProgramView;