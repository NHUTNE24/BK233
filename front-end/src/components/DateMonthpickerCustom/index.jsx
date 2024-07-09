import { useState } from 'react';
import { DatePicker, Radio, Space } from 'antd';
const { RangePicker } = DatePicker;
import './DateMonthpickerCustom.scss';
function DateMonthpickerCustom() {
    const [picker, setPicker] = useState('month');
    const handlePickerChange = (e) => {
        setPicker(e.target.value);
    };
    return (
        <>
            <div className="date-month-picker-custom">
                <Space direction="vertical" size={12}>
                    <Radio.Group value={picker} onChange={handlePickerChange}>
                        <Radio.Button value="date">Day</Radio.Button>
                        <Radio.Button value="week">Week</Radio.Button>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>

                    <RangePicker picker={picker} />
                </Space>
            </div>
        </>
    );
}

export default DateMonthpickerCustom;
