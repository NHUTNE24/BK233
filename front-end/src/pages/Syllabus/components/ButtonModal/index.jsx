import PropTypes from 'prop-types';
import { Button } from 'antd';
import { MdOutlineUpload } from 'react-icons/md';
// import { useState } from 'react';
function ButtonModal(props) {
    const { handleOpenModal } = props;

    return (
        <>
            <Button
                className="btn-md"
                icon={<MdOutlineUpload style={{ fontSize: '23px' }} />}
                style={{
                    background: 'var(--highlight-one)',
                    color: 'white',
                    padding: '7px 10px',
                    width: '95px',
                    height: '32px',
                    borderRadius: '8px',
                    gap: '5px',
                }}
                onClick={handleOpenModal}
            >
                Import
            </Button>
        </>
    );
}

ButtonModal.propTypes = {
    handleOpenModal: PropTypes.func.isRequired,
};
export default ButtonModal;
