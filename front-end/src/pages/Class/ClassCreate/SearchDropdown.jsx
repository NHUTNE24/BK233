import './CreateClass.scss';
import PropTypes from 'prop-types';

function SearchDropdown({ data }) {
    return (
        <div className="max-h-[198px] overflow-y-auto">
            <div className="w-[300px] flex flex-col rounded-b-[10px] search-dropdown-wrapper">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col hover:bg-[#DFDEDE] gap-[4px] bg-white px-[16px] py-[10px] ${index === data.length - 1 ? 'rounded-b-[10px]' : ''}`}
                    >
                        <p className="text-[16px] font-medium">{item.name}</p>
                        <div className="text-[12px] font-medium flex items-center justify-between">
                            <p>{item.duration}</p>
                            <p>{item.modified}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

SearchDropdown.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
            modified: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default SearchDropdown;
