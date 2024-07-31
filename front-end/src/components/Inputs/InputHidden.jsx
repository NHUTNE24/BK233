import PropTypes from 'prop-types';

import { Input } from 'antd';

const InputHidden = ({
    width = 300,
    height = 64,
    placeholder = 'Search by...',
    toggle = false,
    handleEnter,
}) => {
    return (
        <div>
            <Input.Password
                style={{ width: width, height: height }}
                className="bg-inputHiddenColor text-[1.4rem] font-primary"
                placeholder={placeholder}
                variant="filled borderless"
                visibilityToggle={toggle}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleEnter(e);
                }}
            />
        </div>
    );
};

InputHidden.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    toggle: PropTypes.bool,
    handleEnter: PropTypes.func,
};

export default InputHidden;
