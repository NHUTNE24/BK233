import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import './DatepickerCustom.scss';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const dateFormat = 'DD-MM-YYYY';

function DatepickerCustom() {
    return (
        <>
            <div className="datepicker-custom">
                <DatePicker
                    defaultValue={dayjs('03-09-2023', dateFormat)}
                    // minDate={dayjs('08-01-2019', dateFormat)}
                    // maxDate={dayjs('31-10-2025', dateFormat)}
                    showNow={false}
                />
            </div>
        </>
    );
}

export default DatepickerCustom;
