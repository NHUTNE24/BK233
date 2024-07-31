import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Chips } from 'src/components';
import { MdOutlineSearch } from "react-icons/md";

const InputNormal = ({
    width,
    minWidth = 300,
    height = 36,
    placeholder = 'Search by...',
    hasPrefix = true,
    hasSuffix = true,
    multipleTags = false,
    isRequired = false,
    handleChange = () => {},
    handleEnter = () => {},
}) => {
    useEffect(() => {
        document.addEventListener(
            'invalid',
            (() => {
                return (e) => e.preventDefault();
            })(),
            true
        );
        return document.removeEventListener(
            'invalid',
            (() => {
                return (e) => e.preventDefault();
            })(),
            true
        );
    }, []);

    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);

    const saveTag = (e) => {
        if (multipleTags) {
            if (content !== '' && e.key === 'Enter') {
                e.preventDefault();
                setTags([...tags, content]);
            }
        } else if (e.key === 'Enter') handleEnter(e);
    };

    const removeTag = (e, index) => {
        e.preventDefault();
        setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    };

    useEffect(() => {
        setContent('');
    }, [tags]);

    const handleInputChange = (e) => {
        setContent(e.target.value);
        if (handleChange) {
            handleChange(e); // Call the handleChange prop
        }
    };

    return (
        <div className="relative flex flex-col">
            <Input
                style={{ width: width, minWidth: minWidth, height: height }}
                className="border-borderColor text-[1em] font-primary !italic"
                placeholder={placeholder}
                prefix={
                    hasPrefix ? (
                        <span className="flex items-center">
                            <MdOutlineSearch />
                            <TagList tags={tags} removeTag={removeTag} />
                        </span>
                    ) : (
                        <></>
                    )
                }
                suffix={hasSuffix ? <MdOutlineSearch /> : null}
                value={content}
                onChange={handleInputChange} // Use handleInputChange
                onKeyDown={saveTag}
                required={isRequired}
            />
            <span
                className={`${(isRequired && multipleTags && tags.length === 0) || (isRequired && !multipleTags && content === '') ? '' : 'hidden'} text-warningColor !italic text-[1rem]`}
            >
                This field is required
            </span>
        </div>
    );
};

const TagList = ({ tags, removeTag }) => {
    return (
        <span className="z-[20]">
            {tags.map((tag, index) => (
                <Chips.ChipRounded
                    key={index}
                    closable={true}
                    text={tag}
                    handleClose={(e) => removeTag(e, index)}
                />
            ))}
        </span>
    );
};

InputNormal.propTypes = {
    width: PropTypes.number,
    minWidth: PropTypes.number,
    height: PropTypes.number,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hasPrefix: PropTypes.bool,
    hasSuffix: PropTypes.bool,
    multipleTags: PropTypes.bool,
    isRequired: PropTypes.bool,
    handleChange: PropTypes.func,
    handleEnter: PropTypes.func,
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    removeTag: PropTypes.func,
};

export default InputNormal;
