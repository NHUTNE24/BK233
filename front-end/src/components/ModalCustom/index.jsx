import { Form, Modal } from 'antd';
import FormCusTom from '../FormCustom';
import './ModalCustom.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
function ModalCustom({
    width,
    isModalOpen,
    handleCancel,
    modalTitle = 'Import Syllabus',
    bodyContent = null,
    footer,
}) {
    const [form] = Form.useForm();
    const handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                console.log(values);
                form.resetFields(); // Reset fields after successful submit
                // onCreate(values);
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    return (
        <>
            {/* Button to open Modal in parent component */}
            <Modal
                width={width}
                classNames={{
                    header: 'custom-modal__header',
                    body: 'custom-modal__body',
                    footer: 'custom-modal__footer',
                }}
                className="custom-modal"
                // styles={{
                //   header: { background: "var(--primary-color)" },
                // }}
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                okText="Import"
                cancelText="Cancel"
                closeIcon={<CloseCircleOutlined />}
                // set modal center
                centered
                onOk={(e) => {
                    console.log(e);
                    handleFormSubmit();
                }}
                footer={footer}
            >
                {!bodyContent ? (
                    <FormCusTom form={form}></FormCusTom>
                ) : (
                    bodyContent
                )}
            </Modal>
        </>
    );
}

ModalCustom.propTypes = {
    width: PropTypes.number,
    isModalOpen: PropTypes.bool,
    handleCancel: PropTypes.func,
    modalTitle: PropTypes.node,
    bodyContent: PropTypes.node,
    footer: PropTypes.node,
};

export default ModalCustom;
