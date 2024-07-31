import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import './TrainingProgramDetail.css';

import GeneralInfoCard from './GeneralInfoCard';
import ProgramDayCard from './ProgramDayCard';

import { SyllabusCard, Button, TooltipCustom } from 'src/components';
import { MdArrowRightAlt as FaArrowRightLong } from 'react-icons/md';

import { ProgramDetailContext } from './ProgramDetailContext';

const TrainingProgramDetail = ({ TrainingProgram, setDestination }) => {
    const trainingProgramCode = TrainingProgram?.trainingProgramCode;
    const { syllabusId } = useParams();
    const { setUserName } = useContext(ProgramDetailContext);
    const { Syllabus, setSyllabus } = useContext(ProgramDetailContext);
    const { syllabusDays, setSyllabusDays } = useContext(ProgramDetailContext);
    const { setSyllabusUnits } = useContext(ProgramDetailContext);
    const { setUnitChapters } = useContext(ProgramDetailContext);
    const { setOutputStandards } = useContext(ProgramDetailContext);
    const { setDeliveryTypes } = useContext(ProgramDetailContext);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const username = import.meta.env.VITE_USERNAME;
        const password = import.meta.env.VITE_PASSWORD;
        const token = btoa(`${username}:${password}`);

        axios
            .get(`${baseUrl}/api/syllabus/${syllabusId}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            .then((res) => {
                // console.log(res);
                // console.log(res.data);

                setUserName(res.data.userName);
                setSyllabus(res.data.syllabus);
                setSyllabusDays(res.data.syllabusDays);
                setSyllabusUnits(res.data.syllabusUnits);
                setUnitChapters(res.data.unitChapters);
                setOutputStandards(res.data.outputStandards);
                setDeliveryTypes(res.data.deliveryTypes);

                setRoundedCorners(
                    new Array(res.data.syllabusDays?.length).fill(true)
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }, [syllabusId]);

    const [roundedCorners, setRoundedCorners] = useState([]);
    const [roundedBottom, setRoundedBottom] = useState(false);

    useEffect(() => {
        setDestination(
            `/program/view-program/${trainingProgramCode}/${syllabusId}`
        );
    }, [setDestination, trainingProgramCode, syllabusId]);

    return (
        <section
            id="training-program-detail"
            className="w-full h-full pb-[30px]"
        >
            <div className="w-full flex">
                <section id="program-detail-page" className="w-full h-full">
                    <main>
                        <section id="general-information" className="mb-[20px]">
                            <h4 className="text-black font-bold">
                                General information
                            </h4>
                            <GeneralInfoCard
                                general_information={Syllabus?.courseObjective}
                            />
                        </section>
                        <section id="content">
                            <h4 className="font-bold">Content</h4>
                            <div className="w-full min-w-[698px] relative">
                                <div className="absolute top-[20px] right-[20px]">
                                    <TooltipCustom
                                        title="Go to syllabus"
                                        trigger={
                                            <Link
                                                to={`/syllabus/${syllabusId}`}
                                            >
                                                <Button.ButtonPrimary
                                                    width={44}
                                                    height={30}
                                                    icon={
                                                        <FaArrowRightLong className="!text-[24px]" />
                                                    }
                                                />
                                            </Link>
                                        }
                                    />
                                </div>
                                <Link
                                    to={`/program/view-program/${trainingProgramCode}`}
                                >
                                    <SyllabusCard
                                        syllabusId={Syllabus?.id}
                                        programName={Syllabus?.topicName}
                                        syllabusName={
                                            Syllabus?.topicCode +
                                            ' v' +
                                            Syllabus?.version
                                        }
                                        isActive={Syllabus?.status === 'Active'}
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
                                <div
                                    id="syllabus-content"
                                    className="w-[calc(100% + 0)] max-h-[1017px] ml-[-30px] pl-[30px] mr-[-25px] pr-[25px] pb-[50px] relative overflow-x-visible overflow-y-auto"
                                >
                                    {syllabusDays?.map((SyllabusDay, index) => {
                                        return (
                                            <ProgramDayCard
                                                key={index}
                                                index={index}
                                                SyllabusDay={SyllabusDay}
                                                roundedCorner={
                                                    roundedCorners[index]
                                                }
                                                setRoundedCorners={
                                                    setRoundedCorners
                                                }
                                                roundedBottom={
                                                    index + 1 ===
                                                    syllabusDays?.length
                                                        ? roundedBottom
                                                        : false
                                                }
                                                setRoundedBottom={
                                                    index + 1 ===
                                                    syllabusDays?.length
                                                        ? setRoundedBottom
                                                        : () => {}
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </main>
                </section>
            </div>
        </section>
    );
};

TrainingProgramDetail.propTypes = {
    TrainingProgram: PropTypes.object.isRequired,
    setDestination: PropTypes.func,
};

export default TrainingProgramDetail;
