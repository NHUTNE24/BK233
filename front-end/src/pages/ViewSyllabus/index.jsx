import { useEffect, useState } from 'react';
import './ViewSyllabus.scss';
import { SearchOutlined } from '@ant-design/icons';
import {
    MdOutlineUpload,
    MdOutlineAddCircleOutline,
    MdOutlineMoreHoriz,
    MdOutlineDeleteForever,
    MdOutlineContentCopy,
    MdOutlineCreate,
    MdOutlineSort,
    MdAddCircleOutline,
} from 'react-icons/md';
import { Space, Input, Button, Dropdown } from 'antd';
import { Flex, Tag } from 'antd';
import TagRender from '../../components/TagRender';
import RangepickerCustom from '../../components/RangepickerCustom';
import ViewSyllabusTable from './ViewSyllabusTable';
import { parse, isWithinInterval } from 'date-fns';
import ModalCustom from '../../components/ModalCustom';
import FormCusTom from '../../components/FormCustom';
import { Form } from 'antd';

// Datasource for table
const dataSource = [
    {
        key: 1,
        syllabus: 'C# Programing Language',
        code: 'NPL',
        createdOn: '22/04/2021',
        createdBy: 'HaNTT2',
        duration: '12 days',
        outputStandard: ['H4SD', 'K6SD', 'H6SD'],
        status: 'Inactive',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 2,
        syllabus: 'C# basic program',
        code: 'CBG',
        createdOn: '21/07/2019',
        createdBy: 'HaNTT2',
        duration: '7 days',
        outputStandard: ['K6SD'],
        status: 'active',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 3,
        syllabus: '.NET basic program',
        code: 'NET',
        createdOn: '07/10/2021',
        createdBy: 'HaNTT2',
        duration: '5 days',
        outputStandard: ['H4SD', 'K6SD', 'H6SD'],
        status: 'Inactive',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 4,
        syllabus: 'Python basic program',
        code: 'PYT',
        createdOn: '07/10/2021',
        createdBy: 'HaNTT2',
        duration: '15 days',
        outputStandard: ['H4SD', 'K6SD', 'H6SD'],
        status: 'Inactive',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 5,
        syllabus: 'DevOps Foundation',
        code: 'DOF',
        createdOn: '10/11/2021',
        createdBy: 'HaNTT2',
        duration: '25 days',
        outputStandard: ['H4SD', 'K6SD', 'H6SD'],
        status: 'draft',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 6,
        syllabus: 'Azure DevOps Foundation',
        code: 'AZD',
        createdOn: '10/11/2021',
        createdBy: 'HaNTT2',
        duration: '25 days',
        outputStandard: ['H4SD'],
        status: 'draft',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 7,
        syllabus: 'AWS DevOps Foundation',
        code: 'AWD',
        createdOn: '04/04/2022',
        createdBy: 'HaNTT2',
        duration: '25 days',
        outputStandard: ['H4SD'],
        status: 'draft',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 8,
        syllabus: 'Fullstack Java Web Developer',
        code: 'FULJ',
        createdOn: '04/04/2022',
        createdBy: 'HaNTT2',
        duration: '25 days',
        outputStandard: ['H4SD'],
        status: 'draft',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 9,
        syllabus: 'Fullstack .NET Web Developer',
        code: 'FULN',
        createdOn: '07/10/2021',
        createdBy: 'HaNTT2',
        duration: '25 days',
        outputStandard: ['K6SD'],
        status: 'Inactive',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
    {
        key: 10,
        syllabus: 'ISTQB Foundation',
        code: 'TES',
        createdOn: '07/10/2021',
        createdBy: 'HaNTT2',
        duration: '25 days',
        outputStandard: ['K6SD'],
        status: 'Inactive',
        actions: [
            { key: 1, label: 'Add training program' },
            { key: 2, label: 'Edit syllabus' },
            { key: 3, label: 'Duplicate syllabus' },
            { key: 4, label: 'Delete syllabus' },
        ],
    },
];
// End datasource for table

function ViewSyllabus() {
    const [searchedText, setSearchedText] = useState('');
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredDataSource, setFilteredDataSource] = useState(dataSource);


    useEffect(() => {
        filterData(tags);
    }, [tags]);

    // Handle Search
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
                        item.createdBy
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.duration
                            .toLowerCase()
                            .includes(tag.toLowerCase()) ||
                        item.outputStandard.some((os) =>
                            os.toLowerCase().includes(tag.toLowerCase())
                        ) ||
                        item.status.toLowerCase().includes(tag.toLowerCase())
                );
            });
            setFilteredDataSource(filteredData);
        }
    };
    // End Handle Search

    // Handle modal import
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // End Handle modal import

    // Data columns
    const columns = [
        {
            title: 'Syllabus',
            dataIndex: 'syllabus',
            showSorterTooltip: {
                target: 'full-header',
            },
            // onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => {
                // console.log(a, b);
                return a.syllabus.localeCompare(b.syllabus);
            },
            sortIcon: () => <MdOutlineSort />,
            // filteredValue: [searchedText],
        },
        {
            title: 'Code',
            dataIndex: 'code',
            sorter: (a, b) => {
                return a.code.localeCompare(b.code);
            },
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Created on',
            dataIndex: 'createdOn',
            sorter: (a, b) => {
                // Chuyển đổi ngày tháng từ chuỗi "dd/MM/yyyy" thành đối tượng Date
                const dateA = new Date(
                    parseInt(a.createdOn.split('/')[2]),
                    parseInt(a.createdOn.split('/')[1]) - 1,
                    parseInt(a.createdOn.split('/')[0])
                );
                const dateB = new Date(
                    parseInt(b.createdOn.split('/')[2]),
                    parseInt(b.createdOn.split('/')[1]) - 1,
                    parseInt(b.createdOn.split('/')[0])
                );
                // Sắp xếp từ mới nhất đến cũ nhất
                return dateA - dateB;
            },
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Created by',
            dataIndex: 'createdBy',
            sorter: (a, b) => {
                return a.createdBy.localeCompare(b.createdBy);
            },
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a, b) => {
                const pattern = /(\d+) days/;
                const extractNumber = (str) => {
                    const matches = str.match(pattern);
                    return matches ? parseInt(matches[1], 10) : 0;
                };
                return extractNumber(a.duration) - extractNumber(b.duration);
            },
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Output standard',
            dataIndex: 'outputStandard',

            render: (_, { outputStandard }) => (
                <>
                    {(outputStandard || []).map((tag) => {
                        return (
                            <Tag
                                color="gray"
                                key={tag}
                                style={{
                                    width: '72px',
                                    // height: "27px",
                                    padding: '5px 15px',
                                    borderRadius: '50px',
                                    textAlign: 'center',
                                    background: 'var(--primary-color)',
                                    marginBottom: '5px',
                                }}
                            >
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                let color = 'green';
                switch (status.toLowerCase()) {
                    case 'active':
                        color = '#2D3748';
                        break;
                    case 'inactive':
                        color = '#B9B9B9';
                        break;
                    case 'draft':
                        color = '#285D9A';
                        break;
                    default:
                        break;
                }
                return (
                    <>
                        {status && (
                            <Tag
                                color={color}
                                key={status}
                                style={{
                                    width: '72px',
                                    // height: "27px",
                                    padding: '5px 15px',
                                    borderRadius: '50px',
                                    textAlign: 'center',
                                }}
                            >
                                {status || ''}
                            </Tag>
                        )}
                    </>
                );
            },
        },
        {
            // dataIndex: "actions",
            render: (text) => {
                let items = [...text.actions];

                items = items.map((item, index) => {
                    let icons = [
                        <MdAddCircleOutline key={index} />,
                        <MdOutlineCreate key={index} />,
                        <MdOutlineContentCopy key={index} />,
                        <MdOutlineDeleteForever key={index} />,
                    ];
                    return {
                        ...item,
                        label: (
                            <div className="view-syllabus__item-action">
                                <div className="view-syllabus__item-action-icon">
                                    {icons[index]}
                                </div>
                                <div className="view-syllabus__item-action-text">
                                    {item.label}
                                </div>
                            </div>
                        ),
                    };
                });

                return (
                    <>
                        <Dropdown
                            menu={{ items }}
                            dropdownRender={(menu) => {
                                return (
                                    <>
                                        <div className="view-syllabus__dropdown">
                                            {menu}
                                        </div>
                                    </>
                                );
                            }}
                        >
                            <Button type="text" style={{ fontSize: '22px' }}>
                                <MdOutlineMoreHoriz />
                            </Button>
                        </Dropdown>
                    </>
                );
            },
        },
    ];
    // End Data columns

    // get date and filter
    const filterTableByDate = (start, end) => {
        if (!start || !end) {
            // Nếu không có ngày start hoặc end được chọn, hiển thị toàn bộ dữ liệu
            setFilteredDataSource(dataSource);
            return;
        }

        const filtered = dataSource.filter((item) => {
            const createdOn = parse(item.createdOn, 'dd/MM/yyyy', new Date());
            const startDate = parse(start, 'dd/MM/yyyy', new Date());
            const endDate = parse(end, 'dd/MM/yyyy', new Date());
            return isWithinInterval(createdOn, {
                start: startDate,
                end: endDate,
            });
        });
        setFilteredDataSource(filtered);
    };
    const handleDateChange = (startDate, endDate) => {
        // setRangeDate({
        //     startDate,
        //     endDate,
        // });
        filterTableByDate(startDate, endDate);
    };

    return (
        <>
            <div className="view-syllabus">
                <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: 'flex' }}
                >
                    <h4 className="view-syllabus__header header-title">
                        Syllabus
                    </h4>

                    <div className="view-syllabus__tools">
                        <div className="view-syllabus__search ">
                            <div className="view-syllabus__search-text">
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
                                    placeholder="Search here..."
                                    style={{
                                        width: '300px',
                                        height: '36px',
                                    }}
                                    value={searchedText}
                                    onChange={(e) =>
                                        setSearchedText(e.target.value)
                                    }
                                    onPressEnter={handlePressEnter}
                                ></Input>
                            </div>
                            <div className="view-syllbus__search-datepicker">
                                <RangepickerCustom
                                    onChange={handleDateChange}
                                ></RangepickerCustom>
                            </div>
                        </div>

                        <div className="view-syllabus__actions">
                            <div className="view-syllabus__import">
                                <Button
                                    className="btn-md"
                                    icon={
                                        <MdOutlineUpload
                                            style={{ fontSize: '23px' }}
                                        />
                                    }
                                    style={{
                                        background: 'var(--highlight-one)',
                                        color: 'white',
                                        padding: '7px 10px',
                                        width: '95px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        gap: '5px',
                                    }}
                                    onClick={handleOpenModal}
                                >
                                    Import
                                </Button>

                                <ModalCustom
                                    isModalOpen={isModalOpen}
                                    handleCancel={handleCancel}
                                ></ModalCustom>
                            </div>
                            <div className="view-syllabus__direct-entry"></div>
                            <Button
                                className="btn-md"
                                icon={
                                    <MdOutlineAddCircleOutline
                                        style={{
                                            fontSize: '23px',
                                        }}
                                    />
                                }
                                style={{
                                    background: 'var(--primary-color)',
                                    color: 'white',
                                    padding: '7px 10px',
                                    width: '139px',
                                    height: '32px',
                                    borderRadius: '8px',
                                    gap: '5px',
                                }}
                            >
                                Add Syllabus
                            </Button>
                        </div>
                    </div>
                    <div
                        className="view-syllabus__filter"
                        style={{ minHeight: '32px', width: '100%' }}
                    >
                        <Flex gap="4px 0" wrap>
                            {tags.map((tag, index) => (
                                <TagRender
                                    key={index}
                                    tagId={index}
                                    label={tag}
                                    onClose={handleCloseTag}
                                />
                            ))}
                        </Flex>
                    </div>
                    <div className="view-syllabus__table">
                        <ViewSyllabusTable
                            dataSource={filteredDataSource}
                            columns={columns}
                        ></ViewSyllabusTable>
                    </div>
                </Space>
            </div>
        </>
    );
}

export default ViewSyllabus;
