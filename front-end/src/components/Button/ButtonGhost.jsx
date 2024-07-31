import PropTypes from 'prop-types';

import { Button } from 'antd';

const ButtonGhost = ({ width, height, content, handleClick }) => {
    const customButtonStyle = {
        width: width,
        height: height,
        padding: '2px 0px',
        gap: '5px',
        borderRadius: '8px',
        fontWeight: 'bold',
        textDecoration: 'underline',
    };
    return (
        <div style={{ padding: '0' }}>
            <Button
                type="link"
                style={customButtonStyle}
                danger
                onClick={handleClick}
            >
                {content}
            </Button>
        </div>
    );
};

ButtonGhost.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    content: PropTypes.string,
    handleClick: PropTypes.func,
};

export default ButtonGhost;
