import { Tabs } from 'antd';
import SyllabusGeneral from '../../../components/SyllabusGeneral';
import OthersTab from '../../OthersTab';
import OutlineTab from '../../OutlineTab';
import { useSelector } from 'react-redux';
import './SyllabusTab.css';

const onChange = (key) => {};

function SyllabusTab({handleReloadData}) {
    const tabs = {
        General: <SyllabusGeneral />,
        Outline: <OutlineTab handleReloadData={handleReloadData} />,
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
