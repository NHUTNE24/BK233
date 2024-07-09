import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';
function PageNavigation({ totalPages, onChange, page }) {
    return (
        <div className="flex items-center">
            <div className='mx-auto'>
                <Pagination
                    page={page}
                    count={totalPages}
                    onChange={onChange}
                    showFirstButton
                    showLastButton
                    color="custom"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            fontWeight: 'bold',
                            fontSize: '12px',
                        },
                    }}
                />
            </div>
            <div className="flex items-center text-[12px] font-medium gap-[10px] mr-[26px]">
                <p>Rows per page</p>
                <div>
                    <select className="block w-full">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

PageNavigation.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PageNavigation;
