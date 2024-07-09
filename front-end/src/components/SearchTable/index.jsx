import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        syllabus: 'Mathematics',
        code: 'MATH101',
        createdOn: '2021-07-22',
        outputStandard: 'Standard A',
    },
    {
        key: '2',
        syllabus: 'Physics',
        code: 'PHYS101',
        createdOn: '2021-06-15',
        outputStandard: 'Standard B',
    },
    // Add more data as needed
];

const SearchTable = () => {
    const [searchedText, setSearchedText] = useState('');
    const [tags, setTags] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState(dataSource);

    useEffect(() => {
        filterData(tags);
    }, [tags]);

    const handlePressEnter = () => {
        const value = searchedText.trim();
        if (value && !tags.includes(value)) {
            setTags([...tags, value]);
            setSearchedText('');
        }
    };

    const handleCloseTag = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
    };

    const filterData = (tags) => {
        if (tags.length === 0) {
            setFilteredDataSource(dataSource);
        } else {
            const filteredData = dataSource.filter((item) => {
                return tags.every(
                    (tag) =>
                        item.syllabus
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.code.toLowerCase().includes(tag.toLowerCase()) ||
                        item.createdOn
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.outputStandard
                            .toLowerCase()
                            .includes(tag.toLowerCase())
                );
            });
            setFilteredDataSource(filteredData);
        }
    };

    const columns = [
        {
            title: 'Syllabus',
            dataIndex: 'syllabus',
            key: 'syllabus',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Created On',
            dataIndex: 'createdOn',
            key: 'createdOn',
        },
        {
            title: 'Output Standard',
            dataIndex: 'outputStandard',
            key: 'outputStandard',
        },
    ];

    return (
        <div>
            <Input
                placeholder="Enter search keyword"
                value={searchedText}
                onChange={(e) => setSearchedText(e.target.value)}
                onPressEnter={handlePressEnter}
                style={{ width: 200, marginRight: 8 }}
            />
            <Button
                type="primary"
                onClick={handlePressEnter}
                icon={<SearchOutlined />}
                style={{ marginRight: 8 }}
            >
                Add Tag
            </Button>
            <Button onClick={() => setTags([])}>Reset</Button>

            <div style={{ margin: '16px 0' }}>
                {tags.map((tag, index) => (
                    <Tag
                        key={index}
                        closable
                        onClose={() => handleCloseTag(tag)}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>

            <Table dataSource={filteredDataSource} columns={columns} />
        </div>
    );
};

export default SearchTable;
