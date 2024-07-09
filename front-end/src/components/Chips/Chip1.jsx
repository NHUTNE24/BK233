import PropTypes from 'prop-types';

import { Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const Chip1 = ({
    text,
    closable = true,
    inactive = false,
    width = 72,
    height = 27,
    backgroundColor = '#2D3748',
    handleClose,
}) => {
    return (
        <Tag
            color={backgroundColor}
            style={{ width: width, height: height }}
            className={`chip1 ${inactive ? '!bg-chipInactiveColor' : ''} content-center text-center rounded-full bg-white font-[500] text-[12px] font-primary`}
            closeIcon={
                closable ? <CloseCircleOutlined className="invert" /> : null
            }
            onClose={handleClose}
        >
            {text}
        </Tag>
    );
};

Chip1.propTypes = {
    text: PropTypes.string,
    closable: PropTypes.bool,
    inactive: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    handleClose: PropTypes.func,
};

export default Chip1;
