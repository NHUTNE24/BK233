import { ConfigProvider, Table } from 'antd';
import { useEffect, useState } from 'react';

import './TableCustom.scss';


function TableCustom(props) {
    // props attributes:
    /*
       - dataSource : data in rows
       - columns: format columns
       - noPagination: boolean true or false
       -
    */
    const { dataSource, columns, noPagination = false, loading } = props;

  

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
