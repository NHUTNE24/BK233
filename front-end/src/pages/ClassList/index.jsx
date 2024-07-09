import Table from '../../components/Table';
import PageNavigation from '../../components/PageNavigation';
import PropTypes from 'prop-types';
import { useState } from 'react';

function ClassList({ dataSource, columns }) {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div>
            <div className="bg-[#2D3748] px-[20px] py-[15px] mt-[79px]">
                <p className="text-white text-[24px] font-semibold tracking-[0.2em]">
                    Training Class
                </p>
            </div>
            <div className='flex items-center justify-between'>
                <div>
                    
                </div>
            </div>
            <div className="mt-[30px] px-[25px]">
                <Table dataSource={dataSource} columns={columns} />
                <div className="mt-[30px]">
                    <PageNavigation
                        page={currentPage}
                        totalPages={10}
                        onChange={(_, page) => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    );
}

ClassList.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ClassList;
