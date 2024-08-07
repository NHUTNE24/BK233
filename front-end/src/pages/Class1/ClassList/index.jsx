import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Space, Input, Button, Dropdown, Table, Modal, Tag } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import {
    MdOutlineAddCircleOutline,
    MdOutlineMoreHoriz,
    MdOutlineDeleteForever,
    MdOutlineCreate,
    MdOutlineSort,
    MdDownload,
} from 'react-icons/md';

import './ClassList.scss';
import FilterTool from '../../../components/FilterTool';

import { basicAuth } from '../../../constants/user';
import TableCustom from '../../Syllabus/components/TableCusTom';

const apiBaseURL = 'http://localhost:8080/api/classes';

const ViewClass = () => {
    const [searchedText, setSearchedText] = useState('');
    const [classInfo, setClassInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filteredClassInfo, setFilteredClassInfo] = useState(classInfo);

    useEffect(() => {
        filterData(tags);
    }, [tags, classInfo]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiBaseURL);
            const data = response.data.map((item) => {
                return {
                    ...item,
                    key: item.id,
                };
            });

            setClassInfo(data);
            setFilteredClassInfo(data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the class list!', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePressEnter = () => {
        const value = searchedText.trim();
        if (value && !tags.includes(value)) {
            setTags([...tags, value]);
            setSearchedText('');
        }
    };

    const handleCloseTag = (removedTagId) => {
        const newTags = tags.filter((_, index) => index !== removedTagId);
        setTags(newTags);
    };

    const filterData = (tags) => {
        if (tags.length === 0) {
            setFilteredClassInfo(classInfo);
        } else {
            const filteredData = classInfo.filter((item) => {
                return tags.every(
                    (tag) =>
                        item.className
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.classCode
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.createdDate
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.createdBy
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.duration.toString().includes(tag.toLowerCase()) ||
                        item.actualAttendee
                            .toString()
                            .includes(tag.toLowerCase()) ||
                        item.locationName
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.fsuName.toLowerCase().includes(tag.toLowerCase())
                );
            });
            setFilteredClassInfo(filteredData);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleOpenFilterModal = () => setIsFilterModalOpen(true);
    const handleFilterCancel = () => setIsFilterModalOpen(false);

    const onDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseURL}/${id}`);
            fetchData();
        } catch (error) {
            console.error('There was an error deleting the class!', error);
        }
    };

    const columns = [
        {
            title: 'Class',
            dataIndex: 'className',
            sorter: (a, b) => a.className.localeCompare(b.className),
            sortIcon: () => <MdOutlineSort />,
            render: (text, record) => {
                return <Link to={`/class/${record.id}`}>{text}</Link>;
            },
        },
        {
            title: 'Class Code',
            dataIndex: 'classCode',
            sorter: (a, b) => a.classCode.localeCompare(b.classCode),
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Created On',
            dataIndex: 'createdDate',
            sorter: (a, b) => {
                const dateA = new Date(a.createdDate);
                const dateB = new Date(b.createdDate);
                return dateA - dateB;
            },
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a, b) => parseInt(a.duration) - parseInt(b.duration),
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Attendee',
            dataIndex: 'attendeeTypeName',
            sorter: (a, b) =>
                a.attendeeTypeName.localeCompare(b.attendeeTypeName),
            render: (text) => {
                let className = 'attendee-tag';
                switch (text?.toLowerCase()) {
                    case 'fresher':
                        className += ' fresher';
                        break;
                    case 'online fee-fresher':
                        className += ' online-fee-fresher';
                        break;
                    case 'intern':
                        className += ' intern';
                        break;
                    case 'offline fee-fresher':
                        className += ' offline-fee-fresher';
                        break;
                    default:
                        break;
                }
                return <Tag className={className}>{text}</Tag>;
            },
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Location',
            dataIndex: 'locationName',
            sorter: (a, b) => a.locationName.localeCompare(b.locationName),
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'FSU',
            dataIndex: 'fsuName',
            sorter: (a, b) => a.fsuName.localeCompare(b.fsuName),
            sortIcon: () => <MdOutlineSort />,
        },
        {
            dataIndex: 'className',
            render: (text) => {
                let items = ['Edit', 'Delete'];
                const id = classInfo.find((item) => item.className === text).id;
                return (
                    <Dropdown
                        menu={{ items }}
                        dropdownRender={() => (
                            <div className="flex flex-col bg-primary elevation2 rounded-xl">
                                <Link to={`/class/update/${id}`}>
                                    <Button
                                        className="!rounded-none !bg-primary !border-none text-left"
                                        icon={<MdOutlineCreate />}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => onDelete(id)}
                                    className="!rounded-none !bg-primary !w-full !border-none"
                                    icon={<MdOutlineDeleteForever />}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    >
                        <Button type="text" style={{ fontSize: '22px' }}>
                            <MdOutlineMoreHoriz />
                        </Button>
                    </Dropdown>
                );
            },
        },
    ];

    const handleExport = async () => {
        // Handle export logic
        const username = 'th186';
        const password = 'th186';
        const basicAuth = 'Basic ' + btoa(username + ':' + password);
        try {
            await axios
                .get(`${apiBaseURL}/export`, {
                    headers: {
                        Authorization: basicAuth,
                    },
                    // 	headers: {
                    // 		'Authorization': 'Basic ZGFuZ3RoYW5oYW5oMTg2OmRhbmd0aGFuaGFuaDE4Ng=='
                    // },

                    responseType: 'arraybuffer', // Use arraybuffer to process binary data
                })
                .then((response) => {
                    // Create a Uint8Array from the response data
                    const data = new Uint8Array(response.data);

                    // Add BOM (Byte Order Mark) for UTF-8
                    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
                    const blob = new Blob([bom, data], {
                        type: 'text/csv;charset=utf-8;',
                    });

                    // Create file link in browser's memory
                    const href = URL.createObjectURL(blob);

                    //create "a" html element with href to file & click it to download
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'class-export.csv');
                    document.body.appendChild(link);
                    link.click();

                    //release memory
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                });
        } catch (error) {
            console.error('There was an error exporting the class!', error);
        }
    };

    return (
        <div className="view-class px-2">
            <Space
                direction="vertical"
                size="middle"
                style={{ display: 'flex' }}
            >
                <h4 className="view-class__header header-title">
                    Training Class
                </h4>
                <div className="view-class__tools">
                    <div className="view-class__search">
                        <Input
                            className="caption input-wrapper input__placeholder--black"
                            prefix={
                                <SearchOutlined
                                    style={{
                                        fontSize: '18px',
                                        marginRight: '5px',
                                    }}
                                    onClick={handlePressEnter}
                                />
                            }
                            placeholder="Search by..."
                            style={{ width: '300px', height: '36px' }}
                            value={searchedText}
                            onChange={(e) => setSearchedText(e.target.value)}
                            onPressEnter={handlePressEnter}
                        />
                        <Button
                            className="filter-button"
                            icon={<MdOutlineSort />}
                            onClick={handleOpenFilterModal}
                        >
                            Filter
                        </Button>
                    </div>
                    <div>
                        <Link to={'/class/create/step1'}>
                            <Button
                                icon={
                                    <MdOutlineAddCircleOutline
                                        style={{ fontSize: '23px' }}
                                    />
                                }
                                style={{
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                }}
                            >
                                Add New
                            </Button>
                        </Link>
                        <Button
                            icon={<MdDownload style={{ fontSize: '23px' }} />}
                            style={{ background: '#F6BE00', color: 'black' }}
                            onClick={() => handleExport()}
                        >
                            Export
                        </Button>
                    </div>
                </div>
                <div className="view-class__table">
                    <TableCustom
                        dataSource={filteredClassInfo}
                        columns={columns}
                        pagination={true}
                        loading={loading}
                    />
                </div>
            </Space>

            <Modal
                open={isFilterModalOpen}
                onCancel={handleFilterCancel}
                footer={null}
            >
                <FilterTool />
            </Modal>
        </div>
    );
};

export default ViewClass;
