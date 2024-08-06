import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Space, Input, Button, message, Pagination, Form, Spin } from 'antd';
import { Flex, Tag } from 'antd';
import { MdOutlineAddCircleOutline, MdOutlineSort } from 'react-icons/md';
import TagRender from '../components/TagRender';
import RangepickerCustom from '../components/RangepickerCustom';
import ImportSyllabus from './ImportSyllabus';
import { setSelectedKey } from '../../../store/app/siderBarSlice';
import {
    formatDate,
    formatNumberOfDays,
    parseDate,
} from '../../../helpers/daytimeFormat';
import {
    fetchSyllabusData,
    setCurrentPage,
    setPageSize,
} from '../../../store/syllabus/viewSyllabusSlice';
import TableCustom from '../components/TableCusTom';
import './ViewSyllabus.scss';
import { renderActions } from './ActionsSyllabus';

function ViewSyllabus() {
    const [searchedText, setSearchedText] = useState('');
    const [tags, setTags] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [dateFilter, setDateFilter] = useState({
        startDate: null,
        endDate: null,
    });
    const navigate = useNavigate();
    const [importLoading, setImportLoading] = useState(false);
    const [sorter, setSorter] = useState({ sortBy: null, order: null });

    const {
        data: tableData,
        loading,
        error,
        currentPage,
        pageSize,
        totalItems,
        totalPages,
    } = useSelector((state) => state.viewSyllabus);

    useEffect(() => {
        dispatch(
            fetchSyllabusData({
                page: currentPage,
                pageSize,
                tags,
                dateFilter,
                sorter,
            })
        );
    }, [currentPage, pageSize, tags, dateFilter, sorter]);

    const handlePageChange = (page, pageSize) => {
        dispatch(setCurrentPage(page));
        dispatch(setPageSize(pageSize));
        dispatch(fetchSyllabusData({ page, pageSize }));
    };

    // Block input type in pagination
    useEffect(() => {
        const searchInput = document.querySelector(
            '.ant-pagination-options .ant-select-selection-search .ant-select-selection-search-input'
        );
        if (searchInput) searchInput.readOnly = true;
    }, []);

    // Handle Search
    const handlePressEnter = () => {
        const value = searchedText.trim().toLowerCase();
        // Regular expression to match alphanumeric characters only
        const validPattern =
            /^[a-z0-9àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ\s]+$/i;
        if (value && validPattern.test(value) && !tags.includes(value)) {
            setTags([...tags, value]);
            setSearchedText('');
        } else {
            message.warning('Vui lòng không nhập kí tự đặc biệt');
        }
    };

    const handleCloseTag = (removedTagId) => {
        const newTags = tags.filter((_, index) => index !== removedTagId);
        setTags(newTags);
    };

    // Get date and filter
    const handleDateChange = (startDate, endDate) => {
        if (startDate && endDate) {
            setDateFilter({ startDate, endDate });
        } else {
            setDateFilter({ startDate: null, endDate: null });
        }
    };
    // End Get date and filter

    // Handle modal import
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields(); // Reset fields after successful submit
        setCsvData([]);
    };

    // Handle Form import
    const [csvData, setCsvData] = useState([]);

    const handleCsvDataChange = (data) => {
        setCsvData(data);
    };

    const [form] = Form.useForm();
    const handleFormSubmit = () => {
        form.validateFields()
            .then((values) => {
                // console.log(csvData);
                if (csvData.length === 0) {
                    message.error('Please upload CSV file before import!');
                    return;
                }

                const scanCode = form
                    .getFieldsValue()
                    .scanning?.includes('syllabus-code');
                const scanName = form
                    .getFieldsValue()
                    .scanning?.includes('syllabus-name');
                const duplicateHandle = form.getFieldsValue().duplicateHandle;
                const csvImportData = {
                    username: 'Syllabus group',
                    syllabusDTOList: [...csvData],
                    scanCode: scanCode ? true : false,
                    scanName: scanName ? true : false,
                    duplicateHandle,
                };

                // call API Import
                try {
                    const fetchApi = async () => {
                        setImportLoading(true);
                        const response = await fetch(
                            'http://localhost:8080/api/syllabus/import',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(csvImportData),
                            }
                        );

                        if (response.status === 200 && response.ok) {
                            dispatch(
                                fetchSyllabusData({
                                    page: currentPage,
                                    pageSize: pageSize,
                                })
                            );
                            message.success('Import syllabus successfully!');
                            form.resetFields(); // Reset fields after successful submit
                            handleCancel();
                        }
                        setImportLoading(false);
                    };
                    fetchApi();
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((errorInfo) => {
                console.log('Validation failed:', errorInfo);
            });
    };

    // End Handle Form import
    // End Handle modal import

    const handleCellClick = (record) => {
        // Xử lý khi click vào ô của bảng
        navigate(`${record.key}`);
    };
    // Columns format
    const onSorter = (sorter) => {
        setSorter({ ...sorter });
    };
    const columns = [
        {
            title: 'Syllabus',
            dataIndex: 'topicName',

            sorter: true,
            sortIcon: () => <MdOutlineSort />,
            render: (text, record, index) => (
                <span
                    className="table__syllabus-name"
                    onClick={() => handleCellClick(record, index, 0)}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Code',
            dataIndex: 'topicCode',
            sorter: true,
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Created on',
            dataIndex: 'createdDate',
            render: (text) => {
                return formatDate(text);
            },
            sorter: true,
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Created by',
            dataIndex: 'createdBy',
            sorter: true,
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Duration',
            dataIndex: 'days',
            key: 'days',
            render: (days) => formatNumberOfDays(days),
            sorter: true,
            sortIcon: () => <MdOutlineSort />,
        },
        {
            title: 'Output standard',
            dataIndex: 'outputStandards',
            render: (_, { outputStandards }) => (
                <>
                    {(outputStandards || []).map((tag) => {
                        return (
                            <Tag
                                color="gray"
                                key={tag}
                                style={{
                                    width: '72px',
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
                if (
                    status !== 'Active' &&
                    status !== 'Deactive' &&
                    status != 'Draft'
                ) {
                    status = '';
                }
                let color = 'green';
                switch (status.toLowerCase()) {
                    case 'active':
                        color = '#2D3748';
                        break;
                    case 'deactive':
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
                                    width: '80px',
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
            sorter: true,
            sortIcon: () => <MdOutlineSort />,
        },
        {
            // title: 'Actions',
            key: 'actions',
            render: (text, record, index) => renderActions(text, record, index),
        },
    ];
    // End columns format
    return (
        <>
            {importLoading && <Spin fullscreen tip="Importing..."></Spin>}
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
                                    placeholder="Search by..."
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
                                <ImportSyllabus
                                    isModalOpen={isModalOpen}
                                    handleCancel={handleCancel}
                                    handleOpenModal={handleOpenModal}
                                    handleFormSubmit={handleFormSubmit}
                                    form={form}
                                    onCsvDataChange={handleCsvDataChange}
                                />
                            </div>

                            <div className="view-syllabus__direct-entry">
                                <Link
                                    to="/create-syllabus"
                                    onClick={() =>
                                        dispatch(
                                            setSelectedKey('/create-syllabus')
                                        )
                                    }
                                >
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
                                </Link>
                            </div>
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
                        <TableCustom
                            loading={loading}
                            columns={columns}
                            dataSource={tableData}
                            onSorter={onSorter}
                        />

                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalItems}
                            onChange={handlePageChange}
                            pageSizeOptions={[5, 10, 20, 50]}
                            showSizeChanger={true}
                            locale={{ items_per_page: '' }}
                        />
                    </div>
                </Space>
            </div>
        </>
    );
}

export default ViewSyllabus;
