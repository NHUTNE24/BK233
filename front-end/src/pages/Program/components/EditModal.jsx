import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import axios from 'axios';

import { DatePicker } from 'antd';
import Modal from 'react-modal';
import { MdOutlineCancel } from "react-icons/md";
import { DropdownBox2, Inputs } from 'src/components';


const EditModal = ({
    editmodalIsOpen,
    setEditmodalIsOpen,
    setEditing = () => {}, // tell parent that the edit modal is open
    updatedProgram,
    submitedProgram,
    setSubmitedProgram,
    handleSuccess,
    handleError,
}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const token = btoa(`${username}:${password}`);


    const closeEditModal = () => {
        setEditmodalIsOpen(false);
        setEditing(false);
    };

    const handleSubmit = () => {
        axios
            .put(
                `${baseUrl}/api/training-programs/${updatedProgram?.trainingProgramCode}`,
                submitedProgram,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            )
            .then(() => {
                handleSuccess('Program updated successfully');
                closeEditModal();
            })
            .catch((err) => {
                handleError(err, 'editing');
            });
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSubmitedProgram((prevDetails) => ({
            ...prevDetails,
            status: status,
        }));
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setSubmitedProgram((prevDetails) => ({
            ...prevDetails,
            name: name,
        }));
    };

    const handleDaysChange = (e) => {
        const days = e.target.value;
        setSubmitedProgram((prevDetails) => ({
            ...prevDetails,
            days: days,
        }));
    };

    const handleHoursChange = (e) => {
        const hours = e.target.value;
        setSubmitedProgram((prevDetails) => ({
            ...prevDetails,
            hours: hours,
        }));
    };

    const handleDateChange = (date) => {
        const validDate = dayjs(date);
        setSubmitedProgram((prev) => ({
            ...prev,
            startTime: validDate,
        }));
    };

    const editModalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '15px',
            height: 'auto',
            padding: 0,
            flexDirection: 'column',
            gap: '10px',
            border: '2px solid',
            borderColor: 'var(--primary-color)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 99999,
        },
    };

    return (
        <Modal
            style={editModalStyles}
            isOpen={editmodalIsOpen}
            onRequestClose={closeEditModal}
            contentLabel="Duplication Status"
        >
            <div className="flex flex-row bg-main items-center justify-between w-full h-auto">
                <div className="w-10"></div>
                <h2 className="font-bold text-2xl text-white ">
                    Edit training program
                </h2>
                <div className="w-10 cursor-pointer hover:bg-main/20 aspect-square mr-7 h-[40px] rounded-full  flex justify-center items-center">
                    <MdOutlineCancel
                        className="text-4xl text-white"
                        onClick={closeEditModal}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-between items-center py-7 px-4 w-full h-auto">
                <div className="flex  pr-10 pl-5 flex-row w-full items-center justify-between mb-4">
                    <label className="text-2xl text-main font-semibold">
                        Name
                    </label>
                    <Inputs.InputNormal
                        hasSuffix={false}
                        hasPrefix={false}
                        placeholder={updatedProgram?.name || ''}
                        value={updatedProgram?.name || ''}
                        handleChange={handleNameChange}
                    />
                </div>
                <div className="flex pr-10 pl-5 flex-row w-full items-center justify-between mb-4">
                    <label className="text-2xl text-main font-semibold">
                        Days
                    </label>
                    <Inputs.InputNormal
                        hasSuffix={false}
                        hasPrefix={false}
                        placeholder={updatedProgram?.days || 0}
                        value={updatedProgram?.days || 0}
                        handleChange={handleDaysChange}
                    />
                </div>
                <div className="flex pr-10 pl-5 flex-row w-full items-center justify-between mb-4">
                    <label className="text-2xl text-main font-semibold">
                        Hours
                    </label>
                    <Inputs.InputNormal
                        hasSuffix={false}
                        hasPrefix={false}
                        placeholder={updatedProgram?.hours || 0}
                        value={updatedProgram?.hours || 0}
                        handleChange={handleHoursChange}
                    />
                </div>
                <div className="flex pr-10 pl-5 flex-row w-full items-center justify-between mb-4">
                    <label className="text-2xl text-main font-semibold">
                        Status
                    </label>
                    <DropdownBox2
                        large
                        value={
                            submitedProgram?.status ||
                            updatedProgram?.status ||
                            ''
                        }
                        options={[
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                            { value: 'Draft', label: 'Draft' },
                        ]}
                        onChange={handleStatusChange}
                    />
                </div>
                <div className="flex pr-10 pl-5 flex-row w-full items-center justify-between mb-4">
                    <label className="text-2xl text-main font-semibold">
                        Start Time
                    </label>
                    <DatePicker
                        onChange={handleDateChange}
                        placeholder={
                            updatedProgram?.startTime
                                ? updatedProgram?.startTime.substring(0, 10)
                                : 'Start Time'
                        }
                        style={{ width: 300 }}
                        popupStyle={{ zIndex: 100000 }} 
                     
                        value={
                            submitedProgram?.startTime ||
                            dayjs(updatedProgram?.startTime || new Date())
                        }
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 rounded-2xl text-2xl px-10 py-3 bg-main text-white font-bold hover:bg-secondary"
                >
                    Submit
                </button>
            </div>
        </Modal>
    );
};

EditModal.propTypes = {
    editmodalIsOpen: PropTypes.bool,
    setEditmodalIsOpen: PropTypes.func,
    setEditing: PropTypes.func,
    updatedProgram: PropTypes.object.isRequired,
    submitedProgram: PropTypes.object,
    setSubmitedProgram: PropTypes.func,
    handleSuccess: PropTypes.func,
    handleError: PropTypes.func,
};

export default EditModal;
