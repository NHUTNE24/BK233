import { ConfigProvider, Table } from 'antd';
import { useEffect, useState } from 'react';

import './TableCustom.scss';
// Delete it if you don't use it
// // Datasource for table Example
// const dataSourceExample = [
//     {
//         key: 1,
//         syllabus: 'C# Programing Language',
//         test: 'Col Test',
//         code: 'NPL',
//         training: 'Hehe',
//         createdOn: '22/04/2021',
//         createdBy: 'HaNTT2',
//         duration: '12 days',
//         outputStandard: ['H4SD', 'K6SD', 'H6SD'],
//         status: 'Inactive',
//         actions: [
//             {
//                 key: 1,
//                 label: 'Add training program',
//                 action: 'Add',
//                 icon: <MdAddCircleOutline />,
//             },
//             {
//                 key: 2,
//                 label: 'Edit syllabus',
//                 action: 'Edit',
//                 icon: <MdOutlineCreate />,
//             },
//             {
//                 key: 3,
//                 label: 'Duplicate syllabus',
//                 action: 'Duplicate',
//                 icon: <MdOutlineContentCopy />,
//             },
//             {
//                 key: 4,
//                 label: 'Delete syllabus',
//                 action: 'Delete',
//                 icon: <MdOutlineDeleteForever />,
//             },
//         ],
//     },
// ];
// // End Datasource for table Example

function TableCustom(props) {
    // props attributes:
    /*
       - dataSource : data in rows
       - columns: format columns
       - noPagination: boolean true or false
       -
    */
    const { dataSource, columns, noPagination = false, loading } = props;

    // // Columns format Example : Delete it if you don't use it
    // const navigate = useNavigate();
    // const handleCellClick = (record) => {
    //     console.log('Clicked cell with id:', record.key);
    //     // Xử lý khi click vào ô của bảng
    //     navigate(`${record.key}`);
    // };

    // const columnsExample = [
    //     {
    //         title: 'Syllabus',
    //         dataIndex: 'syllabus',
    //         showSorterTooltip: {
    //             target: 'full-header',
    //         },
    //         sorter: (a, b) => {
    //             // console.log(a, b);
    //             return a.syllabus.localeCompare(b.syllabus);
    //         },
    //         sortIcon: () => <MdOutlineSort />,
    //         render: (text, record, index) => <span onClick={() => handleCellClick(record, index, 0)}>{text}</span>,
    //     },
    //     {
    //         title: 'Test Column',
    //         dataIndex: 'test',
    //         sorter: (a, b) => {
    //             return a.code.localeCompare(b.code);
    //         },
    //         sortIcon: () => <MdOutlineSort />,
    //     },
    //     {
    //         title: 'Code',
    //         dataIndex: 'code',
    //         sorter: (a, b) => {
    //             return a.code.localeCompare(b.code);
    //         },
    //         sortIcon: () => <MdOutlineSort />,
    //     },
    //     {
    //         title: 'Created on',
    //         dataIndex: 'createdOn',
    //         sorter: (a, b) => {
    //             // Chuyển đổi ngày tháng từ chuỗi "dd/MM/yyyy" thành đối tượng Date
    //             const dateA = new Date(
    //                 parseInt(a.createdOn.split('/')[2]),
    //                 parseInt(a.createdOn.split('/')[1]) - 1,
    //                 parseInt(a.createdOn.split('/')[0]),
    //             );
    //             const dateB = new Date(
    //                 parseInt(b.createdOn.split('/')[2]),
    //                 parseInt(b.createdOn.split('/')[1]) - 1,
    //                 parseInt(b.createdOn.split('/')[0]),
    //             );
    //             // Sắp xếp từ mới nhất đến cũ nhất
    //             return dateA - dateB;
    //         },
    //         sortIcon: () => <MdOutlineSort />,
    //     },
    //     {
    //         title: 'Created by',
    //         dataIndex: 'createdBy',
    //         sorter: (a, b) => {
    //             return a.createdBy.localeCompare(b.createdBy);
    //         },
    //         sortIcon: () => <MdOutlineSort />,
    //     },
    //     {
    //         title: 'Duration',
    //         dataIndex: 'duration',
    //         sorter: (a, b) => {
    //             const pattern = /(\d+) days/;
    //             const extractNumber = (str) => {
    //                 const matches = str.match(pattern);
    //                 return matches ? parseInt(matches[1], 10) : 0;
    //             };
    //             return extractNumber(a.duration) - extractNumber(b.duration);
    //         },
    //         sortIcon: () => <MdOutlineSort />,
    //     },
    //     {
    //         title: 'Status',
    //         dataIndex: 'status',
    //         render: (status) => {
    //             let color = 'green';
    //             switch (status.toLowerCase()) {
    //                 case 'active':
    //                     color = '#2D3748';
    //                     break;
    //                 case 'inactive':
    //                     color = '#B9B9B9';
    //                     break;
    //                 case 'draft':
    //                     color = '#285D9A';
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             return (
    //                 <>
    //                     {status && (
    //                         <Tag
    //                             color={color}
    //                             key={status}
    //                             style={{
    //                                 width: '72px',
    //                                 // height: "27px",
    //                                 padding: '5px 15px',
    //                                 borderRadius: '50px',
    //                                 textAlign: 'center',
    //                             }}
    //                         >
    //                             {status || ''}
    //                         </Tag>
    //                     )}
    //                 </>
    //             );
    //         },
    //     },
    //     {
    //         // dataIndex: "actions",
    //         render: (text) => {
    //             let items = text.actions.map((item, index) => ({
    //                 key: index,
    //                 label: (
    //                     <ActionDropdown
    //                         actions={item}
    //                         key={index}
    //                     />
    //                 ),
    //             }));
    //             return (
    //                 <>
    //                     <Dropdown
    //                         menu={{ items }}
    //                         dropdownRender={(menu) => {
    //                             return (
    //                                 <>
    //                                     <div className="dropdown">{menu}</div>
    //                                 </>
    //                             );
    //                         }}
    //                     >
    //                         <Button
    //                             type="text"
    //                             style={{ fontSize: '22px' }}
    //                             onClick={(e) => {
    //                                 e.stopPropagation(); // Prevent row click
    //                             }}
    //                         >
    //                             <MdOutlineMoreHoriz />
    //                         </Button>
    //                     </Dropdown>
    //                 </>
    //             );
    //         },
    //     },
    // ];
    // // End columns format

    useEffect(() => {
        const searchInput = document.querySelector(
            '.table-custom .ant-select-selection-search .ant-select-selection-search-input',
        );
        if (searchInput) searchInput.readOnly = true;
    }, []);

    // Handle pagination
    // const [page, setPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    // End Handle pagination

    return (
        <>
            <div className="table-custom">
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: 'var(--primary-color)',
                                headerSplitColor: 'none',
                                headerColor: 'white',
                                fontWeightStrong: '500',
                                fontSize: '14px',
                                lineHeight: '22px',
                                headerBorderRadius: '10px',
                            },
                        },
                    }}
                >
                    <Table
                        loading={loading}
                        dataSource={dataSource}
                        columns={columns}
                        className="body2"
                        pagination={false}
                        // pagination={
                        //     noPagination
                        //         ? false
                        //         : {
                        //               current: page,
                        //               pageSize: pageSize,
                        //               // cal total data from api call
                        //               total: dataSource.length,
                        //               position: ['bottomCenter'],
                        //               onChange: (page, pageSize) => {
                        //                   console.log(page, pageSize);
                        //                   setPage(page);
                        //                   setPageSize(pageSize);
                        //                   // make the api call here with page & page size to chang page data
                        //               },
                        //               showSizeChanger: true,
                        //               locale: {
                        //                   items_per_page: '',
                        //               },
                        //               pageSizeOptions: [5, 10, 15, 20],
                        //           }
                        // }
                    ></Table>
                </ConfigProvider>
            </div>
        </>
    );
}

export default TableCustom;
