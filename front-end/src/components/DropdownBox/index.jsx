import PropTypes from 'prop-types';
function DropdownBox({ options, value, onChange, large }) {
    return (
        <select
            style={{
                boxShadow: '0px 4px 8px 3px #00000026',
            }}
            value={value}
            onChange={onChange}
            className={`${large ? `h-[30px] min-w-[240px]` : `h-[24px] min-w-[140px]`} inline-flex items-center text-[14px] font-medium px-[10px] rounded-[5px] `}
        >
            {options.map((item, index) => (
                <option value={item.value} key={index}>
                    {item.label}
                </option>
            ))}
        </select>
    );
}

DropdownBox.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    large: PropTypes.bool,
};

export default DropdownBox;
