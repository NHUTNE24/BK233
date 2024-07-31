import PropTypes from 'prop-types';

import { Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const ChipRounded = ({
    text,
    closable = false,
    inactive = false,
    outlined = false,
    width = 72,
    height = 27,
    textColor = '#FFFFFF',
    backgroundColor = 'var(--primary-color)',
    inactiveBackgroundColor = '#B9B9B9',
    handleClose,
}) => {
    return (
        <span>
            <Tag
                color={
                    inactive
                        ? inactiveBackgroundColor
                        : outlined
                          ? 'transparent'
                          : backgroundColor
                }
                style={{
                    width: width,
                    height: height,
                    color: !inactive ? textColor : '#FFFFFF',
                    border:
                        outlined && !inactive ? `1.5px solid ${textColor}` : 0,
                }}
                className="chip-rounded content-center text-center rounded-full font-[400] text-xs font-primary"
                closeIcon={
                    closable ? <CloseCircleOutlined className="invert"/> : null
                }
                onClose={handleClose}
            >
                {text}
            </Tag>
        </span>
    );
};

ChipRounded.propTypes = {
    text: PropTypes.string,
    closable: PropTypes.bool,
    inactive: PropTypes.bool,
    outlined: PropTypes.bool,
    width: PropTypes.number,
    height: PropTypes.number,
    textColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    border: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default ChipRounded;
