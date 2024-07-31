import PropTypes from 'prop-types';

import { Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { MdOutlineSearch } from 'react-icons/md';

const DropdownSearch = ({
    syllabusList,
    width,
    minWidth = 300,
    height = 36,
    hasSuffix = false,
    handleSelect,
}) => {
    const options = syllabusList?.map((Syllabus) => ({
        label: Syllabus.topicName + ' ' + Syllabus.version,
        value: Syllabus.id,
        hours: Syllabus.hours,
        modifiedDate: Syllabus.modifiedDate,
        modifiedBy: Syllabus.modifiedBy,
    }));

    return (
        <div className="relative">
            <Select
                style={{ width: width, minWidth: minWidth, height: height }}
                showSearch
                options={options}
                optionFilterProp="label"
                optionRender={(option) => <OptionRender option={option} />}
                onSelect={handleSelect}
                suffixIcon={hasSuffix ? <DownOutlined /> : null}
            />
            <i className="absolute left-[16px] top-[50%] translate-y-[-50%]">
                <MdOutlineSearch />
            </i>
        </div>
    );
};

const OptionRender = ({ option }) => {
    return (
        <div className="flex flex-col gap-[4px] px-[16px] py-[10px] font-[500] text-wrap">
            <div className="text-[1rem]">{option.label}</div>
            <div className="flex justify-between text-[0.75rem] italic">
                <p>{option.data.hours} hrs</p>
                <p>
                    {option.data.modifiedDate} by {option.data.modifiedBy}
                </p>
            </div>
        </div>
    );
};

DropdownSearch.propTypes = {
    syllabusList: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    minWidth: PropTypes.number,
    height: PropTypes.number,
    hasSuffix: PropTypes.bool,
    multipleTags: PropTypes.bool,
    isRequired: PropTypes.bool,
    handleSelect: PropTypes.func,
};

OptionRender.propTypes = {
    option: PropTypes.object.isRequired,
};

export default DropdownSearch;
