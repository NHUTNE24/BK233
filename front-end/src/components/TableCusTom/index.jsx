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
    const { dataSource, columns, pagination = false, loading } = props;

    // Hủy sự kiện nhập ở ô input selection
    useEffect(() => {
        const searchInput = document.querySelector(
            '.table-custom .ant-table-pagination .ant-pagination-options .ant-select-selection-search .ant-select-selection-search-input'
        );

        if (searchInput) searchInput.readOnly = true;
    }, [dataSource]);

    // Handle pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    // End Handle pagination

    return (
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
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: dataSource.length,
                        position: ['bottomCenter'],
                        onChange: (page, pageSize) => {
                            setPage(page);
                            setPageSize(pageSize);
                            // make the api call here with page & page size to change page data
                        },
                        showSizeChanger: true,
                        pageSizeOptions: [5, 10, 15, 20],
                        locale: {
                            items_per_page: '',
                        },
                    }}
                />
            </ConfigProvider>
        </div>
    );
}

export default TableCustom;
