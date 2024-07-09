import PropTypes from 'prop-types';

import { Input } from 'antd';

const InputHidden = ({
    width = 300,
    height = 64,
    placeholder = 'Search by...',
    toggle = false,
}) => {
    return (
        <div>
            <Input.Password
                style={{ width: width, height: height }}
                className="bg-inputHiddenColor text-[1.4rem] font-primary"
                placeholder={placeholder}
                variant="filled borderless"
                visibilityToggle={toggle}
            />
        </div>
    );
};

InputHidden.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    placeholder: PropTypes.string,
    toggle: PropTypes.bool,
};

export default InputHidden;
