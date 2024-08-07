import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
    Space,
    Input,
    Button,
    Dropdown,
    Table,
    Modal,
    Tag,
    message,
} from 'antd';
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

    // State để lưu dữ liệu FSU, location, và trainer
    const [fsus, setFsus] = useState([]);
    const [locations, setLocations] = useState([]);
    const [trainers, setTrainers] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(apiBaseURL);
            if (response.data && Array.isArray(response.data)) {
                setClassInfo(response.data);
                setFilteredClassInfo(response.data);
            } else {
                console.error('Invalid data format', response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the class list!', error);
            message.error('Error fetching class list');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchFsus = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/fsu');
            setFsus(response.data);
        } catch (error) {
            console.error('Error fetching FSU data', error);
        }
    }, []);

    const fetchLocations = useCallback(async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/locations'
            );
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching location data', error);
        }
    }, []);

    const fetchTrainers = useCallback(async () => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/admins'
            );
            setTrainers(response.data);
        } catch (error) {
            console.error('Error fetching trainer data', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
        fetchFsus();
        fetchLocations();
        fetchTrainers();
    }, [fetchData, fetchFsus, fetchLocations, fetchTrainers]);

    useEffect(() => {
        filterData(tags);
    }, [tags, classInfo]);

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
        console.log('Current tags:', tags);
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
            console.log('Filtered Data with Tags:', filteredData);
            setFilteredClassInfo(filteredData);
        }
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleOpenFilterModal = () => setIsFilterModalOpen(true);
    const handleFilterCancel = () => setIsFilterModalOpen(false);

    const handleFilter = (values) => {
        console.log('value:', values);
        let filteredData = [...classInfo];

        if (values.locations && values.locations.length > 0) {
            filteredData = filteredData.filter((item) =>
                values.locations.includes(item.locationName.toLowerCase())
            );
        }

        if (values.fsu) {
            filteredData = filteredData.filter(
                (item) => item.fsuName === values.fsu
            );
        }

        if (values.trainer) {
            filteredData = filteredData.filter(
                (item) => item.adminName === values.trainer
            );
        }

        if (values.from) {
            filteredData = filteredData.filter((item) =>
                moment(item.createdDate).isSameOrAfter(values.from, 'day')
            );
        }

        if (values.to) {
            filteredData = filteredData.filter((item) =>
                moment(item.createdDate).isSameOrBefore(values.to, 'day')
            );
        }

        // Add more filter conditions as needed

        setFilteredClassInfo(filteredData);
        setIsFilterModalOpen(false);
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(`${apiBaseURL}/${id}`);
            setClassInfo((prev) => prev.filter((item) => item.id !== id));
            message.success('Class deleted successfully');
        } catch (error) {
            console.error('There was an error deleting the class!', error);
            message.error('Error deleting class');
        }
    };

    const renderClass = (record) => {
        if (!record || !record.id) {
            return null; // hoặc hiển thị một thông báo lỗi
        }
        return <Link to={`/class/${record.id}`}>{record.className}</Link>;
    };

    const columns = [
        {
            title: 'Class',
            dataIndex: 'className',
            sorter: (a, b) => a.className.localeCompare(b.className),
            sortIcon: () => <MdOutlineSort />,
            render: (text, record) => renderClass(record),
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
            sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
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
                const classRecord = classInfo.find(
                    (item) => item.className === text
                );
                const id = classRecord ? classRecord.id : null;
                if (!id) return null; // kiểm tra id trước khi render
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
        try {
            const response = await axios.get(`${apiBaseURL}/export`, {
                responseType: 'arraybuffer',
            });
            const data = new Uint8Array(response.data);
            const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
            const blob = new Blob([bom, data], {
                type: 'text/csv;charset=utf-8;',
            });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'class-export.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        } catch (error) {
            console.error('There was an error exporting the class!', error);
            message.error('Error exporting class');
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
                            style={{
                                background: '#F6BE00',
                                color: 'black',
                                marginLeft: '6px',
                            }}
                            onClick={handleExport}
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
                    {console.log('Table data:', filteredClassInfo)}
                </div>
            </Space>

            <Modal
                open={isFilterModalOpen}
                onCancel={handleFilterCancel}
                footer={null}
                className='class-filter-tool__modal'
            >
                <FilterTool
                    onFilter={handleFilter}
                    fsus={fsus}
                    locations={locations}
                    trainers={trainers}
                />
            </Modal>
        </div>
    );
};

export default ViewClass;
