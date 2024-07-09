import { ConfigProvider, Table } from 'antd';
import { useState } from 'react';

function ViewSyllabusTable(props) {
    const { dataSource, columns } = props;
    // Handle pagination
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    // End Handle pagination
    return (
        <>
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
                    dataSource={dataSource}
                    columns={columns}
                    className="body2"
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        // cal total data from api call
                        total: 100,
                        position: ['bottomCenter'],
                        onChange: (page, pageSize) => {
                            console.log(page, pageSize);
                            setPage(page);
                            setPageSize(pageSize);
                            // make the api call here with page & page size to chang page data
                        },
                        locale: {
                            items_per_page: '',
                        },
                        pageSizeOptions: [5, 10, 15, 20],
                    }}
                ></Table>
            </ConfigProvider>
        </>
    );
}

export default ViewSyllabusTable;
