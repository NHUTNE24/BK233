import { Tag } from 'antd';
import PropTypes from 'prop-types';

const ChipSquare = ({
    text,
    closable = false,
    height = 30,
    backgroundColor = '#474747',
    handleClose,
}) => {
    return (
        <span>
            <Tag
                color={backgroundColor}
                style={{ height: height }}
                className="chip-square content-center text-center rounded-[8px] px-[10px] bg-white font-[500] text-[12px] font-primary"
                closable={closable}
                onClose={handleClose}
            >
                {text}
            </Tag>
        </span>
    );
};

ChipSquare.propTypes = {
    text: PropTypes.string,
    closable: PropTypes.bool,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    handleClose: PropTypes.func,
};

export default ChipSquare;
