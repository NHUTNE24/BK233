import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import {
    deleteSyllabus,
    duplicateSyllabus,
} from '../../../../store/syllabus/viewSyllabusSlice';
import './ActionDropdown.scss';
import { useState } from 'react';

function ActionDropdown(props) {
    const { actions, id } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentPage, pageSize, totalItems, loading } = useSelector(
        (state) => state.viewSyllabus
    );
    // const [localLoading, setLocalLoading] = useState(false);

    const handleOk = async () => {
        try {
            // setLocalLoading(true);
            switch (actions.action) {
                case 'Add':
                    navigate('/program/create-program');

                    return;
                case 'Edit':
                    navigate(`/edit-syllabus/${id}`);
                    return;
                case 'Duplicate':
                    await dispatch(
                        duplicateSyllabus({
                            syllabusId: id,
                            currentPage,
                            pageSize,
                            totalItems,
                        })
                    );
                    break;
                case 'Delete':
                    await dispatch(
                        deleteSyllabus({
                            syllabusId: id,
                            currentPage,
                            pageSize,
                            totalItems,
                        })
                    );
                    break;
                default:
                    break;
            }
            // setLocalLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCancel = () => {
        // setLocalLoading(false);
    };

    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title: `${actions.label}`,
            icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
            content: <div>Are you sure to {actions.label}?</div>,
            okText: `${actions.action}`,
            cancelText: 'Cancel',
            onOk: handleOk,
            onCancel: handleCancel,
            // cancelButtonProps: { disabled: localLoading }, // Disable the "Ok" button during loading
        });
    };

    return (
        <>
            <div className="action-dropdown__item" onClick={confirm}>
                <div className="action-dropdown__item-icon">{actions.icon}</div>
                <div className="action-dropdown__item-text">
                    {actions.label}
                </div>
            </div>
            {contextHolder}
            {/* {localLoading && (
                <div className="loading-spinner">
                    <Spin fullscreen />
                </div>
            )} */}
        </>
    );
}

export default ActionDropdown;
