import PropTypes from 'prop-types';
import { SortIcon } from '../../assets/Icons';

function Table({ dataSource, columns }) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-[14px] font-semibold rounded-t-[10px] bg-[#2D3748] text-white">
                    <tr>
                        {columns.map((item, index) => {
                            return (
                                <th
                                    key={item.key}
                                    scope="col"
                                    className={`px-[30px] py-[5px] h-[40px] ${index === 0 ? `rounded-tl-[10px]` : ``} ${index === columns.length - 1 ? `rounded-tr-[10px]` : ``}`}
                                >
                                    <div className="flex items-center justify-start">
                                        <span>{item.title}</span>
                                        <SortIcon></SortIcon>
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map((item, index) => (
                        <tr
                            className="bg-white border-b border-black text-[14px] font-semibold"
                            key={index}
                        >
                            <td className="px-[30px] py-[5px] h-[50px]">
                                {item.class}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.classCode}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.createdOn}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.createdBy}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.duration}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.attendee === 'Online fee-fresher' && (
                                    <div className="px-[15px] py-[5px] bg-[#2F903F] inline-block rounded-[50px] text-white">
                                        {item.attendee}
                                    </div>
                                )}
                                {item.attendee === 'Fresher' && (
                                    <div className="px-[15px] py-[5px] bg-[#FF7568] inline-block rounded-[50px] text-white">
                                        {item.attendee}
                                    </div>
                                )}
                                {item.attendee === 'Intern' && (
                                    <div className="px-[15px] py-[5px] bg-[#2D3748] inline-block rounded-[50px] text-white">
                                        {item.attendee}
                                    </div>
                                )}
                                {item.attendee === 'Offline fee-fresher' && (
                                    <div className="px-[15px] py-[5px] bg-[#D45B13] inline-block rounded-[50px] text-white">
                                        {item.attendee}
                                    </div>
                                )}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.location}
                            </td>
                            <td className="px-[30px] py-[10px] h-[50px]">
                                {item.fsu}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Table;
