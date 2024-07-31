import { Tabs } from 'antd';
import OthersTab from '../../Syllabus/OthersTab';
import OutlineTab from '../../Syllabus/OutlineTab';
import SyllabusGeneral from '../../Syllabus/SyllabusGeneral';
import './SyllabusTab.css';

function SyllabusTab() {
    const tabs = {
        General: <SyllabusGeneral />,
        Outline: <OutlineTab />,
        Others: <OthersTab />,
    };

    const labelList = ['General', 'Outline', 'Others'];
    return (
        <Tabs
            style={{ padding: '0px 20px 0 20px' }}
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
    );
}
export default SyllabusTab;
