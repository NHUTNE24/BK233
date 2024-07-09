import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';
import { SearchIcon } from '../../assets/index';

import Chip1 from '../../components/Chips/Chip1';

const InputNormal = ({
    width,
    minWidth = 300,
    height = 36,
    placeholder = 'Search by...',
    hasPrefix = true,
    hasSuffix = true,
    multipleTags = false,
    isRequired = false,
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
        if (content !== '' && e.key === 'Enter') {
            e.preventDefault();
            console.log(e);
            setTags([...tags, content]);
        }
    };

    const removeTag = (e, index) => {
        e.preventDefault();
        console.log(index);
        setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    };

    useEffect(() => {
        console.log(tags);
        setContent('');
    }, [tags]);

    return (
        <div className="relative flex flex-col">
            <Input
                style={{ width: width, minWidth: minWidth, height: height }}
                className="border-borderColor text-[1em] font-primary"
                placeholder={placeholder}
                prefix={
                    hasPrefix ? (
                        <span className="flex items-center">
                            <SearchIcon />
                            <TagList tags={tags} removeTag={removeTag} />
                        </span>
                    ) : (
                        <></>
                    )
                }
                suffix={hasSuffix ? <SearchIcon /> : <></>}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={multipleTags ? (e) => saveTag(e) : () => {}}
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
                <Chip1
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
    placeholder: PropTypes.string,
    hasPrefix: PropTypes.bool,
    hasSuffix: PropTypes.bool,
    multipleTags: PropTypes.bool,
    isRequired: PropTypes.bool,
};

TagList.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    removeTag: PropTypes.func,
};

export default InputNormal;
