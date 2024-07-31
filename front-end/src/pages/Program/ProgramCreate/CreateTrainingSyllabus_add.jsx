import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button } from 'src/components';

import TrainingProgramDetailHeader from '../ProgramDetail/TrainingProgramDetailHeader';
import TrainingProgramDetailDuration from '../ProgramDetail/TrainingProgramDetailDuration';
import ProgramComponents from '../components';

export default function Screen3() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const token = btoa(`${username}:${password}`);
    const [modalMessage, setModalMessage] = useState('');
    const [status, setStatus] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { programName } = useParams();
    const [syllabusList, setSyllabusList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [saved, setSaved] = useState(false);
    const days = selected.reduce((s1, s2) => s1 + s2.days, 0);
    const hours = selected.reduce((s1, s2) => s1 + s2.hours, 0);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/syllabus`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            .then((res) => {
                setSyllabusList(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [baseUrl, token]);

    const handleSelect = (value) => {
        syllabusList.map((Syllabus) => {
            if (Syllabus.id === value) {
                if (!selected.includes(Syllabus))
                    setSelected([...selected, Syllabus]);
                return true;
            }
        });
        return false;
    };

    const handleSave = () => {
        const TrainingProgram = {
            createdBy: 'abc',
            createdDate: new Date(),
            modifiedBy: 'abc',
            modifiedDate: new Date(),
            days: days,
            hours: hours,
            name: programName,
            status: 'Inactive',
            syllabusId: selected.map((Syllabus) => Syllabus.id),
        };
        axios
            .post(`${baseUrl}/api/training-programs`, TrainingProgram, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            .then((res) => {
                console.log(res);
                handleSuccess();
                // selected.map((Syllabus) => {
                //     Syllabus.trainingProgramCode = Syllabus.trainingProgramCode
                //         ? [
                //               ...Syllabus.trainingProgramCode,
                //               res.data.trainingProgramCode,
                //           ]
                //         : [res.data.trainingProgramCode];
                //     axios
                //         .put(
                //             `${baseUrl}/api/syllabus/${Syllabus.id}`,
                //             Syllabus,
                //             {
                //                 headers: {
                //                     Authorization: `Basic ${token}`,
                //                 },
                //             }
                //         )
                //         .then((res) => {
                //             console.log(res);
                //         })
                //         .catch((err) => {
                //             handleFailure(
                //                 'Error encountered, linked syllabus to training program unsuccessfully!'
                //             );
                //             console.error(err);
                //         });
                // });
                setSaved(true);
            })
            .catch((err) => {
                handleFailure('Failed to create training program!');
                console.error(err);
            });
    };

    const handleSuccess = () => {
        setModalMessage('Created training program successful!');
        setStatus('success');
        setIsModalOpen(true);
    };

    const handleFailure = (message) => {
        setModalMessage(message);
        setStatus('failure');
        setIsModalOpen(true);
    };

    return (
        <div className="pb-[70px] text-black">
            <ProgramComponents.NotificationModal
                modalMessage={modalMessage}
                status={status}
                onClose={handleCloseModal}
                isOpen={isModalOpen}
            />
            <header>
                <TrainingProgramDetailHeader
                    name={programName}
                    status="Inactive"
                />
            </header>
            <section>
                <TrainingProgramDetailDuration
                    days={days}
                    hours={hours}
                    modified_on={new Date().toLocaleDateString('en-gb')}
                    modified_by={'Warrior Tran'}
                />
            </section>
            <main className="pl-[20px] pr-[25px]">
                <section className="items-center mt-2">
                    <h6 className="font-semibold mb-4">Content </h6>
                    {selected.length > 0 && (
                        <ProgramComponents.DragDropList
                            selected={selected}
                            setSelected={setSelected}
                        />
                    )}
                </section>
                <section>
                    <div className="h-[76px] flex items-center gap-[10px]">
                        <label>
                            <div className="text-[1rem] font-semibold">
                                Select syllabus
                            </div>
                        </label>
                        <div className="font-[500]">
                            <ProgramComponents.DropdownSearch
                                syllabusList={syllabusList}
                                handleSelect={handleSelect}
                            />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="pl-[20px] pr-[25px]">
                <div className="h-[38px] mt-12 flex justify-between">
                    <Link to="/program/create-program">
                        <Button.ButtonPrimary height={32} content="Back" />
                    </Link>
                    <div className="flex gap-[10px]">
                        <Link to="/program/view-program">
                            <Button.ButtonGhost height={32} content="Cancel" />
                        </Link>
                        <Button.ButtonPrimary
                            height={32}
                            content="Save"
                            disabled={saved}
                            handleClick={handleSave}
                        />
                    </div>
                </div>
            </footer>
        </div>
    );
}
