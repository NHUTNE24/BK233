
import Modal from 'react-modal';
import { TiTick } from 'react-icons/ti';
import { FaExclamation } from "react-icons/fa6";
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types'
const NotificationModal = ({ modalMessage, status, destinationUrl, onClose, isOpen }) => {
    const closeModal = () => {
        onClose(status === 'success', destinationUrl);
    };
    const baseModalStyles = {
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
            overflow: 'hidden',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
        }
    };
    const notifiModalStyles = {
        content: {
            ...baseModalStyles.content,
            height: '100px',
            padding: '10px 10px 10px 30px',
            flexDirection: 'row',
            borderLeft: status === 'success' ? '20px solid green' : '20px solid red'
        },
        overlay: baseModalStyles.overlay
    };

    return (
        <Modal
            style={notifiModalStyles}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Duplication Status"
        >
            <div className={`w-auto aspect-square mr-7 h-[35px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-warningColor'} flex justify-center items-center`}>
                <TiTick className={`text-2xl text-white ${status === 'success' ? "block" : "hidden"}`} />
                <FaExclamation className={`text-2xl text-white ${status === 'success' ? "hidden" : "block"}`} />
            </div>
            <div className='flex flex-col w-full gap-2 h-full justify-center items-start'>
                <div className={`text-2xl ${status === 'success' ? 'text-green' : 'text-red'} font-bold`}>{status}</div>
                <div className='text-xl  text-black '>{modalMessage}</div>
            </div>
            <div className='w-auto cursor-pointer hover:bg-main/20 aspect-square mr-7 h-[40px] rounded-full flex justify-center items-center'>
                <MdClose className='text-4xl' onClick={closeModal} />
            </div>
        </Modal>
    );
};
NotificationModal.propTypes = {
    modalMessage: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    destinationUrl: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};
export default NotificationModal;