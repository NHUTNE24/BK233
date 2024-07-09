import { Tabs } from 'antd';
import "./SyllabusTab.css";
import { SyllabusGeneral } from '../../../components';

const onChange = (key) => {
    console.log(key);
};
const SyllabusTab = (generalInfo) => {
    console.log(generalInfo);
    const tabs = {
        'General': <SyllabusGeneral infoData={generalInfo.generalInfo} />,
        'Outline': 'Outline here',
        'Others': 'Others here'
    }
    const labelList = ['General', 'Outline', 'Others'];
    return (
        <Tabs
            style={{padding: '0px 20px 0 20px'}}
            className="custom-tab"
            onChange={onChange}
            type="card"
            items={labelList.map((name, i) => {
                return {
                    label: `${name}`,
                    key: i,
                    children: tabs[name],
                };
            })}
        />
    )
};
export default SyllabusTab;