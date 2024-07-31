import PropTypes from 'prop-types';

import { Button } from 'antd';

import './Button.css';

const ButtonPrimary = ({
    width,
    height,
    content,
    icon,
    disabled,
    handleClick,
}) => {
    const customButtonStyle = {
        width: width,
        height: height,
        padding: '2px 25px',
        gap: '5px',
        borderRadius: '8px',
        background: 'var(--primary-color)',
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
    };

    return (
        <div style={{ padding: '0' }}>
            <Button
                type="primary"
                style={customButtonStyle}
                icon={icon}
                disabled={disabled}
                onClick={handleClick}
            >
                {content}
            </Button>
        </div>
    );
};

ButtonPrimary.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    content: PropTypes.string,
    icon: PropTypes.element,
    disabled: PropTypes.bool,
    handleClick: PropTypes.func,
};

export default ButtonPrimary;
