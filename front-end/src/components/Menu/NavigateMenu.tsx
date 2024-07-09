import React, { useState } from 'react';
import { MdOutlineSnippetFolder, MdOutlineBiotech } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { RiGraduationCapLine } from "react-icons/ri";
import {
  AppstoreOutlined,
  DesktopOutlined,
  MenuOutlined,
  CloseOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu, Layout, theme } from 'antd';
import { Link } from 'react-router-dom';
import styles from './NavigateMenu.module.css';

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;


const items: MenuItem[] = [
  { key: '1', icon: <HomeOutlined />, label: <Link to="/home-page">Home</Link>, className: styles['menu-item'] },
  {
    key: 'sub1',
    label: 'Syllabus',
    icon: <IoBookOutline />,
    children: [
      { key: '2', label: <Link to="/view-syllabus">View syllabus</Link>, className: styles['menu-item'] },
      { key: '3', label: <Link to="/create-syllabus">Create syllabus</Link>, className: styles['menu-item'] },

    ],
    className: styles['menu-item'],
  },
  {
    key: 'sub2',
    label: 'Training Program',
    icon: <MdOutlineBiotech />,
    children: [
      { key: '4', label: <Link to="/view-program">View program</Link>, className: styles['menu-item'] },
      { key: '5', label: <Link to="/create-program">Create program</Link>, className: styles['menu-item'] },

    ],
    className: styles['menu-item'],
  },
  {
    key: 'sub3',
    label: 'Class',
    icon: <RiGraduationCapLine />,
    children: [
      { key: '6', label: <Link to="/view-class">View class</Link>, className: styles['menu-item'] },
      { key: '7', label: <Link to="/create-class">Create class</Link>, className: styles['menu-item'] },

    ],
    className: styles['menu-item'],
  },
  { key: '8', icon: <DesktopOutlined />, label: <Link to="/training-calendar">Training calendar</Link>, className: styles['menu-item'] },

  {
    key: 'sub4',
    label: 'User management',
    icon: <FaUserGroup />,
    children: [
      { key: '9', label: <Link to="/user-list">User List</Link>, className: styles['menu-item'] },
      { key: '10', label: <Link to="/user-permission">User permission</Link>, className: styles['menu-item'] },

    ],
    className: styles['menu-item'],
  },

  { key: '11', icon: <MdOutlineSnippetFolder />, label: <Link to="/learning-materials">Learning materials</Link>, className: styles['menu-item'] },

  {
    key: 'sub5',
    label: 'Setting',
    icon: <AppstoreOutlined />,
    children: [
      { key: '12', label: <Link to="/calendar">Calendar</Link>, className: styles['menu-item'] },
    ],
    className: styles['menu-item'],
  },
];

const NavigateMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const getDefaultSelectedKey = () => {
    switch (location.pathname) {
      case '/home-page':
        return '1';
      case '/view-sylabus':
        return '2';
      case '/create-syllabus':
        return '3';
      case '/view-program':
        return '4';
      case '/create-program':
        return '5';
      case '/view-class':
        return '6';
      case '/create-class':
        return '7';
      case '/training-calendar':
        return '8';
      case '/user-list':
        return '9';
      case '/user-permission':
        return '10';
      case '/learning-materials':
        return '11';
      case '/calendar':
        return '12';
      default:
        return '1';
    }
  };
  const getDefaultOpenKeys = () => {
    switch (location.pathname) {
      case '/view-sylabus':
      case '/create-syllabus':
        return ['sub1'];
      case '/view-program':
      case '/create-program':
        return ['sub2'];
      case '/view-class':
      case '/create-class':
        return ['sub3'];
      case '/user-list':
      case '/user-permission':
        return ['sub4'];
      case '/calendar':
        return ['sub5'];
      default:
        return [];
    }
  };

  return (
    <div className={`${styles.container} ${collapsed ? styles['container-collapsed'] : styles['container-expanded']}`}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        style={{ opacity: 0 }}
      />
      <Button
        type="link"
        onClick={toggleCollapsed}
        className={styles.button}
      >
        {collapsed ? <MenuOutlined style={{ color: 'black' }} /> : <CloseOutlined style={{ color: 'black' }} />}
      </Button>

      <Menu
        defaultSelectedKeys={[getDefaultSelectedKey()]}
        defaultOpenKeys={getDefaultOpenKeys()}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className={styles.menu}
      />
    </div>
  );
};

export default NavigateMenu;
