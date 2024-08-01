import React, { useState } from 'react';
import { MdOutlineSnippetFolder } from 'react-icons/md';
import { Modal } from 'antd';
import styles from './style.module.scss';
import TrainingMaterial from '../TrainingMaterial';

function TrainingMaterialModal({material, chapterInfo}) {
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

    return (
        <div className={styles.container}>
            <div
                style={{ fontSize: '24px' }}
                onClick={showModal}
            >
                <MdOutlineSnippetFolder />
            </div>

            <Modal
                open={isModalOpen}
                onOk={handleOk}
                width={709}
                closeIcon={null}
                className={styles.myModal}
                onCancel={handleCancel}
                footer={null}
            >
                <div className={styles.body}>
                    <TrainingMaterial material={material} chapterInfo={chapterInfo} handleCloseBtn={handleCancel} />
                </div>
            </Modal>
        </div>
    );
}

export default TrainingMaterialModal;
