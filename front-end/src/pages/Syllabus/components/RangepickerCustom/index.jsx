import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdCalendarToday } from 'react-icons/md';
import { addMonths, format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './RangepickerCustom.scss';
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
                selected={startDate}
                icon={<MdCalendarToday></MdCalendarToday>}
                selectsRange={true}
                startDate={startDate}
                // minDate={new Date()}
                maxDate={addMonths(new Date(), 4)}
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
