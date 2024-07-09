import { Checkbox } from 'antd';
import './Checkbox.css'

const CheckBox = ({ text, setState }) => {
    return <Checkbox onChange={setState} className='font-primary'>{text}</Checkbox>;
};

export default CheckBox;
