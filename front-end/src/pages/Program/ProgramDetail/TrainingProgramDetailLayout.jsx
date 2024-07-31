import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import TrainingProgramDetailHeader from './TrainingProgramDetailHeader';
import TrainingProgramDetailDuration from './TrainingProgramDetailDuration';
import TrainingProgramView from './TrainingProgramView';
import TrainingProgramDetail from './TrainingProgramDetail';
import ProgramComponents from '../components';

import { ProgramDetailProvider } from './ProgramDetailContext';

const TrainingProgramDetailLayout = () => {
    const { trainingProgramCode } = useParams();
    const [TrainingProgram, setTrainingProgram] = useState(null);
    const navigate = useNavigate();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [destination, setDestination] = useState(window.location.pathname);

    const [toggleFetch, setToggleFetch] = useState(false);
    const toggle = () => setToggleFetch((curr) => !curr);

    const handleDuplicateAdditional = (newTrainingProgramCode) => {
        // setDestination(`/program/view-program/${newTrainingProgramCode}`);
        setDestination(
            window.location.pathname.replace(
                /view-program\/[^/]+\/?/,
                `view-program/${newTrainingProgramCode}/`
            )
        );
    };

    const handleDeleteAdditional = () => {
        setDestination('/program/view-program');
    };

    const handleSuccess = (message) => {
        setModalMessage(message);
        setModalStatus('success');
        setModalIsOpen(true);
    };

    const handleFailure = (message) => {
        setModalMessage(message);
        setModalStatus('failure');
        setModalIsOpen(true);
    };

    const handleError = useCallback((error, action) => {
        if (error.response) {
            if (error.response.status === 400) {
                handleFailure(error.response.data.error);
            } else if (error.response.status === 500) {
                handleFailure('Internal Server Response');
            }
        } else {
            handleFailure(`Error ${action} program`);
        }
        console.error(`Error ${action} program:`, error);
    }, []);

    const handleCloseModal = (success, destinationUrl) => {
        setModalIsOpen(false);
        setModalMessage('');
        toggle();
        navigate(destinationUrl);
    };

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const username = import.meta.env.VITE_USERNAME;
        const password = import.meta.env.VITE_PASSWORD;
        const token = btoa(`${username}:${password}`);

        axios
            .get(`${baseUrl}/api/training-programs/${trainingProgramCode}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            .then((res) => {
                setTrainingProgram(res.data);
            })
            .catch((err) => {
                handleError(err, 'getting');
            });
    }, [trainingProgramCode, toggleFetch, handleError]);

    if (!TrainingProgram) {
        return <div></div>;
    }

    return (
        <div id="training-program-detail-layout">
            <ProgramComponents.NotificationModal
                modalMessage={modalMessage}
                status={modalStatus}
                destinationUrl={`${destination}`}
                onClose={handleCloseModal}
                isOpen={modalIsOpen}
            />
            <header>
                <TrainingProgramDetailHeader
                    hasMenu
                    name={TrainingProgram?.name}
                    status={TrainingProgram?.status}
                    trainingProgramCode={trainingProgramCode}
                    handleSuccess={handleSuccess}
                    handleError={handleError}
                    handleDuplicateAdditional={handleDuplicateAdditional}
                    handleDeleteAdditional={handleDeleteAdditional}
                />
            </header>
            <section>
                <TrainingProgramDetailDuration
                    days={TrainingProgram?.days}
                    hours={TrainingProgram?.hours}
                    modified_on={new Date(
                        TrainingProgram?.modifiedDate
                    ).toLocaleDateString('en-gb')}
                    modified_by={TrainingProgram?.modifiedBy}
                />
            </section>
            <Routes>
                <Route
                    path={`/:syllabusId`}
                    element={
                        <ProgramDetailProvider>
                            <TrainingProgramDetail
                                TrainingProgram={TrainingProgram}
                                setDestination={setDestination}
                            />
                        </ProgramDetailProvider>
                    }
                />
                <Route
                    path="/"
                    element={
                        <TrainingProgramView
                            TrainingProgram={TrainingProgram}
                            setDestination={setDestination}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

TrainingProgramDetailLayout.propTypes = {
    trainingProgramCode: PropTypes.string,
};

export default TrainingProgramDetailLayout;
