import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import ModalCustom from 'src/components/ModalCustom';
import Button from 'src/components/Button';
import { MdOutlineModeEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { Modal, Input, Form, Radio } from 'antd';

const baseUrl = import.meta.env.VITE_BASE_URL;
const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
const token = btoa(`${username}:${password}`);

const ViewProgramMaterial = ({
    day_no,
    unit_no,
    unit_name,
    unitChapterId,
    isOpen,
    setIsOpen,
}) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const token = btoa(`${username}:${password}`);
    const currentUsername = useSelector((state) => state.auth?.username || '');

    const [UnitChapter, setUnitChapter] = useState(null);
    const [toggleFetch, setToggleFetch] = useState(false);
    const toggle = () => {
        setToggleFetch((curr) => !curr);
        console.log('toggled');
    };

    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/unit-chapters/${unitChapterId}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            .then((res) => {
                setUnitChapter(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [unitChapterId, toggleFetch]);

    const [form] = Form.useForm();
    const [isModalDelete, setIsModalDelete] = useState(false);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalCreate, setIsModalCreate] = useState(false);

    const [isFile, setIsFile] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const [currentMaterialId, setCurrentMaterialId] = useState(null);
    const [TrainingMaterial, setTrainingMaterial] = useState(null);

    const fetchCurrentTrainingMaterial = async (
        currentMaterialId,
        setModalIsOpen
    ) => {
        try {
            const res = await axios.get(
                `${baseUrl}/api/training-materials/${currentMaterialId}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );

            setTrainingMaterial(res.data);
            setMaterial(res.data);
            setModalIsOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const initialMaterial = {
        name: '',
        fileName: '',
        createdBy: '',
        createdDate: '',
        modifiedBy: '',
        modifiedDate: '',
        unitChapterId: '',
        url: '',
        file: isFile,
    };

    const [material, setMaterial] = useState(initialMaterial);

    const handleDelete = (trainingMaterialId) => {
        setCurrentMaterialId(trainingMaterialId);
        setIsModalDelete(true);
    };

    const cancelDelete = () => {
        setIsModalDelete(false);
        setCurrentMaterialId(null);
    };

    const confirmDelete = async () => {
        if (processing) return;
        setProcessing(true);

        try {
            const res = await axios.get(
                `${baseUrl}/api/training-materials/${currentMaterialId}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            if (res.data.file) {
                await axios.delete(
                    `${baseUrl}/api/files/${res.data.trainingMaterialId}`,
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                );
            }

            await axios.delete(
                `${baseUrl}/api/training-materials/${currentMaterialId}`,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(
                `Successfully deleted training material ${currentMaterialId}`
            );

            UnitChapter?.trainingMaterialId?.splice(
                UnitChapter?.trainingMaterialId?.indexOf(currentMaterialId),
                1
            );
            axios
                .put(
                    `${baseUrl}/api/unit-chapters/${unitChapterId}`,
                    {
                        trainingMaterialId: UnitChapter?.trainingMaterialId,
                    },
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                )
                .then(() => {
                    toggle();
                });
            // axios
            //     .get(`${baseUrl}/api/unit-chapters/${unitChapterId}`, {
            //         headers: {
            //             Authorization: `Basic ${token}`,
            //         },
            //     })
            //     .then((res) => {
            //         console.log(res.data);
            //     });
            setIsModalDelete(false);
            setCurrentMaterialId(null);
            // setUnitChapterId(null);
        } catch (error) {
            console.log(error);
        } finally {
            setProcessing(false);
        }
    };

    const handleEdit = (trainingMaterialId) => {
        setCurrentMaterialId(trainingMaterialId);
        fetchCurrentTrainingMaterial(trainingMaterialId, setIsModalEdit);
    };

    const cancelEdit = () => {
        setIsModalEdit(false);
        setCurrentMaterialId(null);
    };

    const confirmEdit = async () => {
        if (processing) return;
        setProcessing(true);

        setMaterial({
            ...material,
            modifiedDate: new Date(),
        });
        const newMaterial = {
            name: material.name,
            fileName: material.fileName,
            modifiedBy: currentUsername,
            modifiedDate: new Date().toISOString(),
            url: material.url,
            file: material.file,
        };
        try {
            await axios.put(
                `${baseUrl}/api/training-materials/${currentMaterialId}`,
                newMaterial,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            toggle();
            setIsModalEdit(false);
            setCurrentMaterialId(null);
        } catch (err) {
            console.error(err);
        } finally {
            setProcessing(false);
        }
    };

    const handleCreate = (unitChapterId) => {
        setIsModalCreate(true);
        setIsFile(true);
        setSelectedFile(null);
        setMaterial({
            ...material,
            createdBy: currentUsername,
            createdDate: new Date(),
            unitChapterId: unitChapterId,
            fileName: '',
        });
        console.log(unitChapterId);
    };

    const cancelCreate = () => {
        setIsModalCreate(false);
        setMaterial(initialMaterial);
    };

    const handleChangeName = (e) => {
        const value = e.target.value;
        setMaterial({
            ...material,
            name: value,
        });
    };

    const handleChangeFileName = (e) => {
        const value = e.target.value;
        setMaterial({
            ...material,
            fileName: value,
        });
    };

    const handleChangeUrl = (e) => {
        const value = e.target.value;
        setMaterial({
            ...material,
            url: value,
        });
    };

    const toggleIsFile = (e) => {
        const value = e.target.value;
        setIsFile(value);
    };

    const handleChangeIsFile = (e) => {
        const value = e.target.value;
        setMaterial({
            ...material,
            file: value,
        });
    };

    const confirmCreate = async () => {
        if (processing) return;
        setProcessing(true);

        var url = material.url;
        var trainingMaterialId = null;

        if (isFile && selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                // formData.append('upload_preset', cloudinaryUploadPreset);

                const res = await axios.post(`${baseUrl}/api/files`, formData, {
                    headers: {
                        Authorization: `Basic ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                url = res.data.url;
                trainingMaterialId = res.data.publicId;

                console.log(res);
                console.log(res.data);
            } catch (error) {
                console.error(
                    'Error creating new material:',
                    error.response ? error.response.data : error.message
                );
                alert('Error uploading file');
                return;
            }
        }

        const newMaterial = {
            trainingMaterialId: trainingMaterialId,
            name: material.name,
            fileName: isFile
                ? material.fileName === ''
                    ? selectedFile?.name
                    : material.fileName
                : '',
            createdBy: currentUsername,
            createdDate: new Date(),
            modifiedBy: currentUsername,
            modifiedDate: new Date(),
            unitChapterId: material.unitChapterId,
            url: url,
            file: material.file,
        };
        console.log(newMaterial);

        try {
            const res = await axios.post(
                `${baseUrl}/api/training-materials`,
                newMaterial,
                {
                    headers: {
                        Authorization: `Basic ${token}`,
                    },
                }
            );
            console.log(res.data);
            const id = res.data.trainingMaterialId;
            UnitChapter.trainingMaterialId = UnitChapter?.trainingMaterialId
                ? [...UnitChapter.trainingMaterialId, id]
                : [id];
            axios
                .put(
                    `${baseUrl}/api/unit-chapters/${material.unitChapterId}`,
                    {
                        trainingMaterialId: UnitChapter?.trainingMaterialId,
                    },
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    toggle();
                    setIsModalCreate(false);
                });
        } catch (err) {
            console.error(
                'Error creating new material:',
                err.response ? err.response.data : err.message
            );
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <ModalCustom
                width={704}
                isModalOpen={isOpen}
                handleCancel={() => {
                    setIsOpen(false);
                    // console.log(UnitChapter.id);
                }}
                modalTitle={'Day ' + day_no}
                bodyContent={
                    <div>
                        <label
                            id="view-material-header"
                            className="flex font-bold mb-[15px] justify-center items-center flex-row"
                        >
                            <h6 className="w-[150px] h-full">Unit {unit_no}</h6>
                            <div className="w-full h-full relative">
                                {unit_name}
                            </div>
                        </label>
                        <div
                            id="view-material-content"
                            className="bg-grey rounded-[10px] px-[20px] py-[10px] text-[0.875rem]"
                        >
                            <h6 className="font-bold">{UnitChapter?.name}</h6>
                            {UnitChapter?.trainingMaterialId?.map(
                                (trainingMaterialId) => (
                                    <MaterialTab
                                        key={trainingMaterialId}
                                        trainingMaterialId={trainingMaterialId}
                                        handleDelete={() =>
                                            handleDelete(trainingMaterialId)
                                        }
                                        handleEdit={() =>
                                            handleEdit(trainingMaterialId)
                                        }
                                        toggleFetch={toggleFetch}
                                    />
                                )
                            )}
                        </div>
                        <div
                            id="view-material-footer"
                            className="flex justify-center items-center mt-[10px] mb-[5px] text-[0.875rem]"
                        >
                            <Button.ButtonPrimary
                                width={101}
                                height={37}
                                content="Upload new"
                                handleClick={() => handleCreate(unitChapterId)}
                            />
                        </div>
                    </div>
                }
                footer={null}
            />
            <Modal
                open={isModalDelete}
                onCancel={cancelDelete}
                onOk={confirmDelete}
                okText="Confirm"
                okType="danger"
            >
                <p>Are you sure you want to delete this training material?</p>
            </Modal>
            <Modal
                className="material-edit-modal"
                width={700}
                centered
                title="Edit training material"
                open={isModalEdit}
                okText="Update"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={cancelEdit}
                destroyOnClose
                modalRender={(dom) => (
                    <Form form={form} clearOnDestroy onFinish={confirmEdit}>
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    rules={[{ required: true }]}
                    label="Name"
                    name="Name"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValue={TrainingMaterial?.name}
                    value={material.name}
                    onChange={handleChangeName}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    rules={[{ required: TrainingMaterial?.file }]}
                    label="File Name"
                    name="File Name"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValue={TrainingMaterial?.fileName}
                    value={material.fileName}
                    onChange={handleChangeFileName}
                >
                    <Input disabled={!TrainingMaterial?.file} />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    label="URL"
                    name="URL"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValue={TrainingMaterial?.url}
                    value={material.url}
                    onChange={handleChangeUrl}
                >
                    <Input />
                </Form.Item>
            </Modal>
            <Modal
                className="material-create-modal"
                width={700}
                centered
                title="Upload new training material"
                open={isModalCreate}
                okText="Create"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={cancelCreate}
                destroyOnClose
                modalRender={(dom) => (
                    <Form form={form} clearOnDestroy onFinish={confirmCreate}>
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    rules={[{ required: true }]}
                    label="Name"
                    name="Name"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    value={material.name}
                    onChange={handleChangeName}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    rules={[{ required: false }]}
                    label="File Name"
                    name="File Name"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    value={material.fileName}
                    onChange={handleChangeFileName}
                >
                    <Input
                        placeholder={isFile ? material.fileName : ''}
                        disabled={!isFile}
                    />
                </Form.Item>

                {isFile ? (
                    <Form.Item
                        rules={[{ required: true }]}
                        label="File"
                        name="File"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        style={{ height: 30 }}
                    >
                        <div className="flex items-center gap-[10px]">
                            <Button.ButtonPrimary
                                width={101}
                                height={37}
                                content="Upload new"
                                handleClick={() =>
                                    document.getElementById('upload').click()
                                }
                            />
                            <input
                                id="upload"
                                type="file"
                                accept={[
                                    '.csv',
                                    '.xls',
                                    '.xlsx',
                                    '.pdf',
                                    '.doc',
                                    '.docx',
                                    '.txt',
                                    '.jpg',
                                    '.png',
                                    '.mp3',
                                    '.mp4',
                                    '.svg',
                                ]}
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    setSelectedFile(e.target.files[0]);
                                    setMaterial({
                                        ...material,
                                        fileName: e.target.files[0].name,
                                    });
                                }}
                            />
                            <p>{selectedFile?.name}</p>
                        </div>
                    </Form.Item>
                ) : (
                    <Form.Item
                        rules={[{ required: true }]}
                        label="URL"
                        name="URL"
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        value={material.url}
                        onChange={handleChangeUrl}
                        style={{ height: 30 }}
                    >
                        <Input />
                    </Form.Item>
                )}

                <Form.Item
                    rules={[{ required: true }]}
                    label="Is File"
                    name="Is File"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    initialValue={isFile}
                    value={isFile}
                    onChange={handleChangeIsFile}
                >
                    <Radio.Group onChange={toggleIsFile}>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>
            </Modal>
        </>
    );
};

const MaterialTab = ({
    trainingMaterialId,
    handleEdit,
    handleDelete,
    toggleFetch,
}) => {
    const [TrainingMaterial, setTrainingMaterial] = useState(null);

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/training-materials/${trainingMaterialId}`, {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            })
            .then((res) => {
                setTrainingMaterial(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [trainingMaterialId, toggleFetch]);

    const handleClickMaterial = async (
        trainingMaterialId,
        file,
        fileName,
        url
    ) => {
        if (file) {
            // download file
            try {
                const res = await axios.get(
                    `http://localhost:8080/api/files/${trainingMaterialId}`,
                    {
                        headers: {
                            Authorization: `Basic ${token}`,
                        },
                        responseType: 'arraybuffer',
                    }
                );

                // create link and trigger download
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const a = document.createElement('a');
                a.href = url;
                a.setAttribute('download', fileName);
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            } catch (error) {
                alert('Failed to download file. Please try again later');
            }
        } else {
            // navigate to webpage
            window.open(url, '_blank', 'noreferrer');
        }
    };

    return (
        <div className="flex">
            <p
                className="grow hover:text-main hover:font-bold cursor-pointer duration-300"
                onClick={() =>
                    handleClickMaterial(
                        TrainingMaterial?.trainingMaterialId,
                        TrainingMaterial?.file,
                        TrainingMaterial?.fileName,
                        TrainingMaterial?.url
                    )
                }
            >
                {TrainingMaterial?.name}
            </p>
            <div className="flex ml-auto">
                <p className="text-[#323232] italic mr-[10px]">
                    by{' '}
                    {TrainingMaterial?.modifiedBy
                        ? TrainingMaterial?.modifiedBy
                        : TrainingMaterial?.createdBy}{' '}
                    on{' '}
                    {new Date(
                        TrainingMaterial?.modifiedDate
                            ? TrainingMaterial?.modifiedDate
                            : TrainingMaterial?.createdDate
                    ).toLocaleDateString('en-gb')}{' '}
                </p>
                <i className="mr-[10px] cursor-pointer" onClick={handleEdit}>
                    <MdOutlineModeEdit className="!text-[24px] text-menuIconColor" />
                </i>
                <i className="cursor-pointer" onClick={handleDelete}>
                    <MdOutlineDeleteForever className="!text-[24px] text-menuIconColor" />
                </i>
            </div>
        </div>
    );
};

ViewProgramMaterial.propTypes = {
    day_no: PropTypes.number,
    unit_no: PropTypes.number,
    unit_name: PropTypes.string,
    unitChapterId: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

MaterialTab.propTypes = {
    trainingMaterialId: PropTypes.string.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    toggleFetch: PropTypes.bool,
};

export default ViewProgramMaterial;
