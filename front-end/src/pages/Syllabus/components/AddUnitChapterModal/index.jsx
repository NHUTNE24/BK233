import { Modal } from 'antd';
import { useState } from 'react';
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from 'react-icons/io';
import AddUnitChapterForm from '../AddUnitChapterForm';
import styles from './style.module.scss';

function AddUnitChapterModal({ unitInfo, handleFetchChapter, handleReloadData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (values) => {
        console.log('Values of form: ', values);
    };

    return (
        <div className={styles.container}>
            <div
                style={{ fontSize: '24px', cursor: 'pointer' }}
                onClick={showModal}
            >
                <IoIosAddCircleOutline />
            </div>

            <Modal
                open={isModalOpen}
                title=<div className={styles['modal-header']}>
                    <p className={styles['modal-title']}>New content</p>
                    <IoIosCloseCircleOutline
                        style={{ cursor: 'pointer' }}
                        size={20}
                        onClick={handleCancel}
                    />
                </div>
                onOk={handleSubmit}
                width={609}
                closeIcon={null}
                className={styles.myModal}
                okText=<p style={{ fontSize: '14px', fontWeight: 700, padding: '4px 11px' }}>Create</p>
                onCancel={handleCancel}
                cancelButtonProps={{
                    style: {
                        border: 'none',
                    },
                }}
                cancelText=<p
                    style={{ color: '#E74A3B', fontSize: '14px', fontWeight: 700, textDecoration: 'underline' }}
                >
                    Cancel
                </p>
                footer={null}
            >
                <div className={styles.body}>
                    <AddUnitChapterForm
                        handleCloseModal={handleCancel}
                        unitInfo={unitInfo}
                        handleFetchChapter={handleFetchChapter}
                        handleReloadData={handleReloadData}
                    />
                </div>
            </Modal>
        </div>
    );
}

export default AddUnitChapterModal;
