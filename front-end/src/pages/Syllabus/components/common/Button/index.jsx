import PropTypes from 'prop-types';
import { Button } from 'antd';

const index = ({ onClick, text }) => {
    return (
        <Button type="primary" danger onClick={onClick}>
            {text}
        </Button>
    );
};

index.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
};

export default index;
