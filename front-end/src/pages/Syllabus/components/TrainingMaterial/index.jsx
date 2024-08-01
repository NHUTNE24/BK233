import { AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineModeEdit, MdOutlineDeleteForever } from 'react-icons/md';
import { Button, Upload, Popconfirm } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropsType from 'prop-types';
import styles from './style.module.scss';

TrainingMaterial.propTypes = {
    chapterInfo: PropsType.object.isRequired,
    handleCloseBtn: PropsType.func.isRequired,
};

function TrainingMaterial({ handleCloseBtn, chapterInfo }) {
    const [material, setMaterial] = useState([]);

    const fetchMaterial = async () => {
        try {
            const result = await axios.get(
                `http://localhost:8080/api/training-materials/by-chapter/${chapterInfo.id}`
            );
            if (result.status === 200) {
                setMaterial(result.data);
            } else {
                console.log('Error fetching material: ', result);
            }
        } catch (error) {
            console.error('Failed to fetch material', error);
        }
    };

    useEffect(() => {
        fetchMaterial();
    }, []);

    useEffect(() => {
        console.log('MATERIAL: ', material);
    }, [material]);

    const handleDeleteMaterial = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/training-materials/${id}`
            );
            if (response.status === 200) {
                console.log('Material deleted successfully', response.data);
                fetchMaterial();
            } else {
                console.error('Failed to delete material', response);
            }
        } catch (error) {
            console.error('Error deleting material:', error);
        }
    };

    const handleDeleteMaterial2 = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/training-materials/${id}`
            );
            if (response.status === 200) {
                console.log('Material deleted successfully', response.data);
            } else {
                console.error('Failed to delete material', response);
            }
        } catch (error) {
            console.error('Error deleting material:', error);
        }
    };

    const handleUpload = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                `http://localhost:8080/api/training-materials/upload/${chapterInfo.id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (response.status === 200) {
                console.log('File uploaded successfully', response.data);
                fetchMaterial();
                onSuccess('Ok');
            } else {
                console.error('Failed to upload file', response);
                onError('Error');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            onError('Error');
        }
    };

    const cancel = (e) => {
        console.log(e);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles['day-number']}>Day 3</p>
                <div className={styles['close-btn']} onClick={handleCloseBtn}>
                    <AiOutlineCloseCircle />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.title}>
                    <p className={styles['unit-number']}>Unit 5</p>
                    <p className={styles['unit-name']}>.NET Introduction</p>
                </div>
                <div className={styles.content}>
                    <p className={styles['chapter-name']}>.NET Introduction</p>
                    <ul className={styles['material-list']}>
                        {material.map((item, idx) => (
                            <li className={styles['material-item']} key={idx}>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    className={styles['material-name']}
                                >
                                    {item.name}
                                </a>
                                <div className={styles.action}>
                                    <p
                                        className={styles.history}
                                    >{`by ${item.modifiedBy} on ${item.modifiedDate}`}</p>
                                    <div
                                        onClick={() =>
                                            handleDeleteMaterial2(
                                                item.trainingMaterialId
                                            )
                                        }
                                    >
                                        <Upload
                                            customRequest={handleUpload}
                                            showUploadList={false}
                                        >
                                            <div className={styles['edit-btn']}>
                                                <MdOutlineModeEdit />
                                            </div>
                                        </Upload>
                                    </div>

                                    <Popconfirm
                                        title="Delete the material"
                                        description="Are you sure to delete this material?"
                                        onConfirm={() =>
                                            handleDeleteMaterial(
                                                item.trainingMaterialId
                                            )
                                        }
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                        className={styles['delete-btn']}
                                    >
                                        <MdOutlineDeleteForever />
                                    </Popconfirm>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Upload customRequest={handleUpload} showUploadList={false}>
                        <Button
                            style={{
                                backgroundColor: '#2D3748',
                                color: '#fff',
                            }}
                        >
                            Upload new
                        </Button>
                    </Upload>
                </div>
            </div>
        </div>
    );
}

export default TrainingMaterial;
