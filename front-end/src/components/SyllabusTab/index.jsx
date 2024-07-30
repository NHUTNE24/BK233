import Proptype from 'prop-types';

import { Tabs } from 'antd';
import "./SyllabusTab.css";

export default function SyllabusTab({
	tabContent,
	onChange,
	tabName,
}) {
	const tabs = tabName.reduce((acc, tabName, index) => {
		acc[tabName] = tabContent[index].content;
		return acc;
	}, {});
	const labelList = tabName;
	return (
		<Tabs
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

SyllabusTab.propTypes = {
	tabContent: Proptype.arrayOf(Proptype.object),
	onChange: Proptype.func,
	tabName: Proptype.arrayOf(Proptype.string),
}
