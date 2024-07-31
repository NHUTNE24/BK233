import { Modal } from 'antd';
import './ModalCustom.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
function ModalCustom(props) {
    // props attributes:
    /*
       - modalTitle
       - okTitle
       - cancelTitle
       - isModalOpen:  open modal
       - handleCancel: close modal
       - bodyContent:(modal content)
       - handleFormSubmit
       - others:
    */
    const {
        isModalOpen,
        handleCancel,
        modalTitle,
        okTitle,
        cancelTitle,
        bodyContent,
        handleFormSubmit,
        footerCenter = false,
    } = props;

    return (
        <>
            <Modal
                classNames={{
                    header: 'custom-modal__header',
                    body: 'custom-modal__body',
                    footer: footerCenter ? 'custom-modal__footer custom-modal__footer--center' : 'custom-modal__footer',
                }}
                className="custom-modal"
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                okText={okTitle}
                cancelText={cancelTitle}
                closeIcon={<CloseCircleOutlined />}
                // set modal center
                centered
                onOk={(e) => {
                    handleFormSubmit();
                }}
                destroyOnClose={true} // This will unmount the modal when closed
            >
                {/* Flex Content */}
                {bodyContent}
                {/* End Flex Content */}
            </Modal>
        </>
    );
}

export default ModalCustom;
