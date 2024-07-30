
import './Sidebar.scss';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import {
	MdOutlineHome,
	MdOutlineSchool,
	MdOutlineBiotech,
	MdOutlineSnippetFolder,
	MdOutlinePeople,
	MdCalendarToday,
} from 'react-icons/md';

import { IoMdSettings } from 'react-icons/io';
import { Button, Menu } from 'antd';
import { FiBookOpen } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const items = [
	{
		key: '/',
		icon: <MdOutlineHome />,
		label: <Link to="/">Home</Link>,
	},
	{
		key: 'sub1',
		icon: <FiBookOpen />,
		label: 'Syllabus',
		children: [
			{
				key: '/view-syllabus',
				label: <Link to="/view-syllabus">View syllabuss</Link>,
			},
			{
				key: '/create-syllabus',
				label: <Link to="/create-syllabus">Create syllabuss</Link>,
			},
		],
	},
	{
		key: 'sub2',
		icon: <MdOutlineBiotech />,
		label: 'Training program',
		children: [
			{
				key: 'sub2-1',
				label: 'View program',
			},
			{
				key: 'sub2-2',
				label: 'Create program',
			},
		],
	},
	{
		key: 'sub3',
		icon: <MdOutlineSchool />,
		label: 'Class',
		children: [
			{
				key: '/class/list',
				label: <Link to="/class/list">View class</Link>,
			},
			{
				key: '/class/create/step1',
				label: <Link to="/class/create/step1">Create class</Link>,
			},
		],
	},
	{
		key: 'sub4',
		label: 'Training Calendar',
		icon: <MdCalendarToday />,
	},
	{
		key: 'sub5',
		icon: <MdOutlinePeople />,
		label: 'User management',
		children: [
			{
				key: 'sub5-1',
				label: 'User list',
			},
			{
				key: 'sub5-2',
				label: 'User permission',
			},
		],
	},

	{
		key: 'sub6',
		label: 'Learning materials',
		icon: <MdOutlineSnippetFolder />,
	},
	{
		key: 'sub7',
		label: 'Setting',
		icon: <IoMdSettings />,
		children: [
			{
				key: 'sub7-1',
				label: 'Calendar',
			},
		],
	},
];

function Sidebar({ setCollapsed, collapsed }) {
	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};
	return (
		<div
			className="inline-block h-[100vh] top-16 fixed"
			style={{
				width: collapsed ? 80 : 256,
			}}
		>
			<Button
				onClick={toggleCollapsed}
				style={{
					marginBottom: 16,
				}}
				className="btn btn-menu"
			>
				{collapsed ? <IoMdMenu /> : <IoMdClose />}
			</Button>
			<Menu
				defaultSelectedKeys={['/']}
				mode="inline"
				items={items}
				inlineCollapsed={collapsed}
			/>
		</div>
	);
}

Sidebar.propTypes = {
	setCollapsed: PropTypes.func,
	collapsed: PropTypes.bool,
};

export default Sidebar;
