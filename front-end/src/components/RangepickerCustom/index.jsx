import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdCalendarToday } from 'react-icons/md';
import 'react-datepicker/dist/react-datepicker.css';
import './RangepickerCustom.scss';
import { format } from 'date-fns';
function RangepickerCustom({ onChange }) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const handleDateChange = (update) => {
        setDateRange(update);

        if (update[0] && update[1]) {
            const formattedStartDate = format(update[0], 'dd/MM/yyyy');
            const formattedEndDate = format(update[1], 'dd/MM/yyyy');

        

            onChange(formattedStartDate, formattedEndDate);
        } else {
            onChange(null, null);
        }
    };
    return (
        <div className="rangepicker-custom">
            <DatePicker
                className="rangepicker-custom__input"
                showIcon
                icon={<MdCalendarToday></MdCalendarToday>}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange}
                isClearable={true}
                placeholderText="Created date"
                dateFormat="dd/MM/yyyy"
            />
        </div>
    );
}

export default RangepickerCustom;
