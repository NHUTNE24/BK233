import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import {
    MdMoreHoriz,
    MdOutlineModeEdit,
    MdOutlineContentCopy,
    MdOutlineVisibilityOff,
    MdOutlineVisibility,
    MdOutlineDeleteForever, } from "react-icons/md";

import { MdOutlineSnippetFolder } from 'react-icons/md';

// import './TrainingProgramDetail.css';

import { Divider, Popover } from 'antd';
import EditModal from './EditModal';

const ManageTrainingProgramMenu = ({
    fontSize = '3rem',
    color = '#FFFFFF',
    setEditing = () => {}, // tell parent that the edit modal is open
    isProgramList,
    trainingProgramCode,
    status,
    handleSuccess,
    handleError,
    handleEditAdditional = () => {},
    handleDuplicateAdditional = () => {},
    handleChangeStatusAdditional = () => {},
    handleDeleteAdditional = () => {},
}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const token = btoa(`${username}:${password}`);

    const initializeProgram = () => ({
        trainingProgramCode: null,
        createdBy: null,
        createdDate: null,
        modifiedBy: null,
        modifiedDate: null,
        days: null,
        hours: null,
        startTime: null,
        name: null,
        status: null,
        userId: null,
        technicalCodeId: null,
        technicalGroupId: null,
        moduleId: null,
        syllabusId: null,
    });

    const activated = status === 'Active';
    const [editmodalIsOpen, setEditmodalIsOpen] = useState(false);
    const [updatedProgram, setUpdatedProgram] = useState(initializeProgram());
    const [submitedProgram, setSubmitedProgram] = useState(initializeProgram());

    const [openPopover, setOpenPopover] = useState(false);

    const handleDownloadAllMaterials = async (trainingProgramCode) => {
        try {
            handleSuccess(
                'The training materials are being processed. Please wait patiently!'
            );
            const res = await axios.get(
                `${baseUrl}/api/training-programs/${trainingProgramCode}/getMaterials`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );

            var zipper = new JSZip();
            var iterator = res.data;
            const zipName = iterator.name;
            await handleZipFiles(zipper, iterator);

            // {
            //     // cloudinary fetch test
            //     const url =
            //         // 'https://res.cloudinary.com/dshbngqoj/image/upload/v1721988175/samples/landscapes/nature-mountains.jpg';
            //         // 'https://res.cloudinary.com/dshbngqoj/image/upload/v1721988175/samples/animals/kitten-playing.gif';
            //         'https://res.cloudinary.com/dshbngqoj/video/upload/v1721988177/samples/sea-turtle.mp4';
            //         // 'https://res.cloudinary.com/dshbngqoj/video/upload/v1721988177/samples/cld-sample-video.mp4';
            //     const res = await axios.get(url, {
            //         responseType: 'arraybuffer',
            //     });
            //     console.log(res);
            //     // const blob = new Blob([res.data], {
            //     //     type: res.headers['Content-Type'],
            //     // });
            //     zipper.file(url.split('/').pop(), res.data);
            // }

            handleSuccess('Processed successfully. Downloading...');

            zipper.generateAsync({ type: 'blob' }).then((content) => {
                saveAs(content, `${zipName}.zip`);
            });
        } catch (error) {
            handleError(error, 'downloading all training materials');
        }
    };

    const handleZipFiles = async (zipper, iterator) => {
        if (!iterator) return;
        if (!iterator.trainingMaterialHierarchy) {
            const file = iterator;
            if (file.deleted) return;
            if (!file.file) {
                // create a shortcut to the url
                console.log(file.name + ' is not a file: ' + file.url);
                try {
                    zipper.file(
                        `${file.name}.url`,
                        `[InternetShortcut]
                        URL=${file.url}`
                    );
                } catch (error) {
                    handleError(error, 'fetching material: ' + file.name);
                }
            } else {
                // handle download file
                console.log(file.fileName + ' is a file: ' + file.url);
                try {
                    const res = await axios.get(file.url, {
                        responseType: 'arraybuffer',
                    });
                    // example URL: https://res.cloudinary.com/dshbngqoj/image/upload/v1721988400/file5.pdf
                    zipper.file(file.fileName, res.data);
                } catch (error) {
                    handleError(error, 'fetching file: ' + file.fileName);
                }
            }
        } else {
            var currentFolder = zipper.folder(iterator.name);
            for (const instance of iterator.trainingMaterialHierarchy)
                await handleZipFiles(currentFolder, instance);
        }
    };

    useEffect(() => {
        if (editmodalIsOpen) {
            axios
                .get(
                    `${baseUrl}/api/training-programs/${trainingProgramCode}`,
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                )
                .then((res) => {
                    setUpdatedProgram(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [editmodalIsOpen, trainingProgramCode, baseUrl, token]);

    const handleEdit = () => {
        setEditmodalIsOpen(true);
        setEditing(true);
        handleEditAdditional();
    };

    const handleChangeStatus = async (trainingProgramCode, status) => {
        const url =
            status === 'Active'
                ? `${baseUrl}/api/training-programs/${trainingProgramCode}/deactivate`
                : `${baseUrl}/api/training-programs/${trainingProgramCode}/activate`;
        try {
            await axios.put(
                url,
                {},
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            handleChangeStatusAdditional(trainingProgramCode, status);
            handleSuccess(
                `Program ${status === 'Active' ? 'deactivated' : 'activated'} successfully!`
            );
        } catch (error) {
            handleError(
                error,
                status === 'Active' ? 'deactivating' : 'activating'
            );
        }
    };

    const handleDelete = async (trainingProgramCode) => {
        try {
            await axios.delete(
                `${baseUrl}/api/training-programs/${trainingProgramCode}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            handleDeleteAdditional(trainingProgramCode);
            handleSuccess('Program deleted successfully!');
        } catch (error) {
            handleError(error, 'deleting');
        }
    };

    const handleDuplicate = async (trainingProgramCode) => {
        try {
            const res = await axios.post(
                `${baseUrl}/api/training-programs/${trainingProgramCode}/duplicate`,
                {},
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            handleDuplicateAdditional(res.data.trainingProgramCode);
            handleSuccess('Program duplicated successfully!');
        } catch (error) {
            handleError(error, 'duplicating');
        }
    };

    const menuItems = [
        {
            key: 0,
            label: 'Training material',
            icon: (
                <MdOutlineSnippetFolder className="!text-[24px] text-menuIconColor" />
            ),
            onClick: (e) => {
                e.stopPropagation();
                setOpenPopover(false);
                handleDownloadAllMaterials(trainingProgramCode);
            },
        },
        {
            key: 1,
            label: 'Edit program',
            icon: (
                <MdOutlineModeEdit className="!text-[24px] text-menuIconColor" />
            ),
            onClick: (e) => {
                e.stopPropagation();
                setOpenPopover(false);
                handleEdit(trainingProgramCode);
            },
        },
        {
            key: 2,
            label: 'Duplicate program',
            icon: (
                <MdOutlineContentCopy className="!text-[24px] text-menuIconColor" />
            ),
            onClick: (e) => {
                e.stopPropagation();
                setOpenPopover(false);
                handleDuplicate(trainingProgramCode);
            },
        },
        {
            key: 3,
            label: activated ? 'De-activate program' : 'Activate program',
            icon: activated ? (
                <MdOutlineVisibilityOff className="!text-[24px] text-menuIconColor" />
            ) : (
                <MdOutlineVisibility className="!text-[24px] text-menuIconColor" />
            ),
            onClick: (e) => {
                e.stopPropagation();
                setOpenPopover(false);
                handleChangeStatus(trainingProgramCode, status);
            },
        },
        {
            key: 4,
            label: 'Delete program',
            icon: (
                <MdOutlineDeleteForever className="!text-[24px] text-menuIconColor" />
            ),
            onClick: (e) => {
                e.stopPropagation();
                setOpenPopover(false);
                handleDelete(trainingProgramCode);
            },
        },
    ];

    const menuContent = menuItems.slice(isProgramList ? 0 : 1).map((item) => (
        <div
            key={item.key}
            className="flex w-full h-[34px] items-center px-[5px] gap-[8px] justify-start hover:bg-grey cursor-pointer"
            onClick={(e) => {
                item.onClick(e);
                // setOpenPopover(false);
            }}
        >
            {item.icon}
            <h3 className="text-menuTextColor font-[400] text-base">
                {item.label}
            </h3>
        </div>
    ));

    return (
        <div className="relative">
            {/* {openPopover && (
                <div
                    id="popover-wrapper"
                    className="w-[100vw] h-[100vh] top-0 left-0 fixed"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenPopover(false);
                    }}
                ></div>
            )} */}
            <EditModal
                editmodalIsOpen={editmodalIsOpen}
                setEditmodalIsOpen={setEditmodalIsOpen}
                setEditing={setEditing}
                trainingProgramCode={trainingProgramCode}
                updatedProgram={updatedProgram}
                submitedProgram={submitedProgram}
                setSubmitedProgram={setSubmitedProgram}
                handleSuccess={handleSuccess}
                handleError={handleError}
            />
            <Popover
                id="manage-training-program-menu"
                trigger="click"
                open={openPopover}
                onOpenChange={(open) => setOpenPopover(open)}
                title={
                    <label>
                        <h6 className="font-bold text-lg text-[#2A4365] pb-[5px]">
                            Manage
                        </h6>
                        <Divider orientation="middle" className="m-0" />
                    </label>
                }
                content={menuContent}
                zIndex={99999}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <MdMoreHoriz style={{ fontSize: fontSize, color: color }} />
                </button>
            </Popover>
        </div>
    );
};

ManageTrainingProgramMenu.propTypes = {
    fontSize: PropTypes.string, // icon size
    color: PropTypes.string, // hex code/rgba
    setEditing: PropTypes.func,
    isProgramList: PropTypes.bool,
    trainingProgramCode: PropTypes.string,
    status: PropTypes.string,
    handleSuccess: PropTypes.func,
    handleError: PropTypes.func,
    handleEditAdditional: PropTypes.func,
    handleDuplicateAdditional: PropTypes.func,
    handleChangeStatusAdditional: PropTypes.func,
    handleDeleteAdditional: PropTypes.func,
};

export default ManageTrainingProgramMenu;
