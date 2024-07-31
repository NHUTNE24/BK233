import "./TimePicker.css";
import { TimePicker } from "antd";
import { useState } from 'react';
import dayjs from 'dayjs';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CustomTimePicker() {
    const format = 'HH:mm';
    const [time, setTime] = useState(dayjs(null, format));

    const onChange = (time) => {
      setTime(time);
    };

    return (
        <TimePicker
            format="HH:mm"
            placeholder="--:--"
            minuteStep={15}
            suffixIcon={null}
            allowClear={false}
            needConfirm={false}
            className="custom-time-picker"
            popupClassName="custom-time-picker-popup"
            onChange={onChange}
            style={{ width: 60}}
        />
  );
}

export default CustomTimePicker;
