import React, { useEffect, useState } from 'react';
import {
    Input,
    message,
    DatePicker,
    Select,
    Row,
    Col,
    Button,
    Popover,
    Space,
    Checkbox,
    Dropdown,
    Menu,
    Modal,
    Form,
    Switch,
    Radio,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IoIosMore } from 'react-icons/io';
import { IoFilterSharp } from 'react-icons/io5';
import { MdSort } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import moment from 'moment';

import './UserList.css';

import AddUserForm from '../../../components/AddNewUser/AddNewUser';
import ImportUsers from '../../../components/ImportUsers/ImportUsers';
import ExportUsers from '../../../components/ExportUsers/ExportUsers';
import TableCustom from '../../Syllabus/components/TableCusTom';

const { Option } = Select;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterDOB, setFilterDOB] = useState(null);
    const [filterRole, setFilterRole] = useState([]);
    const [filterGender, setFilterGender] = useState([]);
    const [filterStatus, setFilterStatus] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchText, filterDOB, filterRole, filterGender, filterStatus, users]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            const usersWithIndex = response.data.map((user, index) => ({
                ...user,
                index: index + 1,
            }));
            setUsers(usersWithIndex);
            setFilteredUsers(usersWithIndex);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
            message.error('There was an error fetching the users!');
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/roles');
            if (response.data && Array.isArray(response.data)) {
                const formattedRoles = response.data.map((role) => ({
                    id: role.id,
                    name: role.name,
                }));
                setRoles(formattedRoles);
            }
        } catch (error) {
            console.error('There was an error fetching the roles!', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleDateChange = (date, dateString) => {
        setFilterDOB(date ? date.format('YYYY/MM/DD') : null);
    };

    const handleTypeChange = (checkedValues) => {
        setFilterRole(checkedValues);
    };

    const handleGenderChange = (checkedValues) => {
        setFilterGender(checkedValues);
    };

    const handleStatusChange = (checkedValues) => {
        setFilterStatus(checkedValues);
    };

    const applyFilters = () => {
        let filtered = users;

        if (searchText) {
            filtered = filtered.filter(
                (user) =>
                    user.fullname
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (filterDOB) {
            filtered = filtered.filter((user) =>
                moment(user.dob, 'YYYY-MM-DD').isSame(
                    moment(filterDOB, 'YYYY/MM/DD')
                )
            );
        }

        if (filterRole.length) {
            filtered = filtered.filter((user) =>
                filterRole.includes(user.roleName)
            );
        }

        if (filterGender.length) {
            filtered = filtered.filter((user) =>
                filterGender.includes(user.gender ? 'male' : 'female')
            );
        }

        if (filterStatus.length) {
            filtered = filtered.filter((user) =>
                filterStatus.includes(user.status ? 'true' : 'false')
            );
        }

        setFilteredUsers(filtered);
    };

    const resetFilters = () => {
        setFilterRole([]);
        setFilterGender([]);
        setFilterStatus([]);
        setFilterDOB(null);
        setFilteredUsers(users);
    };

    const showModal = (user) => {
        setEditingUser(user);
        form.setFieldsValue({
            roleId: user.role.id,
            fullname: user.fullname,
            dob: moment(user.dob, 'YYYY-MM-DD'),
            gender: user.gender ? 'male' : 'female',
            status: user.status,
        });
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const roleResponse = await axios.get(
                `http://localhost:8080/api/roles/${values.roleId}`
            );
            const roleData = roleResponse.data;

            const updatedUser = {
                ...editingUser,
                role: roleData,
                roleName: roleData.name,
                fullname: values.fullname,
                dob: values.dob.format('YYYY-MM-DD'),
                gender: values.gender === 'male',
                status: values.status,
            };

            const response = await axios.put(
                `http://localhost:8080/api/users/${editingUser.id}`,
                updatedUser
            );

            message.success('User updated successfully');

            const newUsers = users.map((user) =>
                user.id === editingUser.id
                    ? { ...response.data, index: user.index }
                    : user
            );
            setUsers(newUsers);
            applyFilters();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('Failed to update user');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${userId}`);
            message.success('User deleted successfully');

            let newUsers = users.filter((user) => user.id !== userId);
            newUsers = newUsers.map((user, index) => ({
                ...user,
                index: index + 1,
            }));

            setUsers(newUsers);
            setFilteredUsers(newUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Failed to delete user');
        }
    };

    const columns = [
        {
            title: (
                <div className="customSort">
                    <span style={{ marginRight: 10 }}>ID</span>
                    <MdSort />
                </div>
            ),
            dataIndex: 'index',
            key: 'index',
            sorter: (a, b) => a.index - b.index,
        },
        {
            title: (
                <div className="customSort">
                    <span style={{ marginRight: 10 }}>Full Name</span>
                    <MdSort />
                </div>
            ),
            dataIndex: 'fullname',
            key: 'fullname',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        },
        {
            title: (
                <div className="customSort">
                    <span style={{ marginRight: 10 }}>Email</span>
                    <MdSort />
                </div>
            ),
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: (
                <div className="customSort">
                    <span style={{ marginRight: 10 }}>Date Of Birth</span>
                    <MdSort />
                </div>
            ),
            dataIndex: 'dob',
            key: 'dob',
            sorter: (a, b) => a.dob.localeCompare(b.dob),
        },
        {
            title: (
                <div className="customSort">
                    <span style={{ marginRight: 10 }}>Gender</span>
                    <MdSort />
                </div>
            ),
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) =>
                gender ? <FaUser /> : <FaUser style={{ color: 'red' }} />,
            sorter: (a, b) => a.gender - b.gender,
        },
        {
            title: (
                <div className="customSort">
                    <span style={{ marginRight: 10 }}>Type</span>
                    <MdSort />
                </div>
            ),
            dataIndex: 'roleName',
            key: 'roleName',
            sorter: (a, b) => a.roleName.localeCompare(b.roleName),
            render: (roleName) => {
                const backgroundColor =
                    roleName !== 'Super admin'
                        ? roleName !== 'Class admin'
                            ? roleName !== 'Trainer'
                                ? 'wheat'
                                : 'aqua'
                            : 'chartreuse '
                        : ' pink';
                return (
                    <div
                        style={{
                            backgroundColor,
                            borderRadius: 12,
                            padding: 6,
                            width: 100,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {roleName}
                    </div>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Dropdown
                    overlay={
                        <Menu>
                            <Menu.Item onClick={() => showModal(record)}>
                                Edit User
                            </Menu.Item>
                            <Menu.Item onClick={() => deleteUser(record.id)}>
                                Delete User
                            </Menu.Item>
                        </Menu>
                    }
                    trigger={['click']}
                >
                    <Button icon={<IoIosMore />} className="button" />
                </Dropdown>
            ),
        },
    ];

    const filterContent = (
        <div>
            <Row gutter={0} className="flex flex-col gap-5 p-5 ">
                <div className="flex flex-row gap-2 justify-center ">
                    <span className="bold">Date of Birth</span>
                    <Col span={30}>
                        <DatePicker
                            format="YYYY/MM/DD"
                            onChange={handleDateChange}
                            placeholder="YYYY/MM/DD"
                            className="w-[30vh] "
                        />
                    </Col>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <span className="bold">Type</span>
                        <Col span={24}>
                            <Checkbox.Group
                                options={roles.map((role) => ({
                                    label: role.name,
                                    value: role.name,
                                }))}
                                value={filterRole}
                                onChange={handleTypeChange}
                            />
                        </Col>
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <span className="bold">Gender</span>
                        <Col span={24}>
                            <Checkbox.Group
                                options={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                ]}
                                value={filterGender}
                                onChange={handleGenderChange}
                            />
                        </Col>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="bold">Status</span>
                        <Col span={24}>
                            <Checkbox.Group
                                options={[
                                    { label: 'Active', value: 'true' },
                                    { label: 'Inactive', value: 'false' },
                                ]}
                                value={filterStatus}
                                onChange={handleStatusChange}
                            />
                        </Col>
                    </div>
                </div>
            </Row>
            <div className="filterActions">
                <Button
                    onClick={resetFilters}
                    style={{ background: '#2D3748', color: 'white' }}
                >
                    Reset
                </Button>
                <Button
                    onClick={applyFilters}
                    style={{ background: '#2D3748', color: 'white' }}
                >
                    Apply
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <h4 className="p-8 bg-main text-primary border-t">
                User Management
            </h4>
            <div className="content">
                <div style={{ height: 36 }}>
                    <Space
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div style={{ display: 'flex', gap: 2 }}>
                            <Input
                                placeholder="Search by..."
                                value={searchText}
                                onChange={handleSearchChange}
                                prefix={<SearchOutlined />}
                                style={{ width: 200, opacity: 0.6 }}
                            />
                            <Popover
                                content={filterContent}
                                trigger="click"
                                overlayStyle={{
                                    width: '600px',
                                    height: 'fit-content',
                                }}
                            >
                                <Button
                                    icon={<IoFilterSharp />}
                                    style={{
                                        background: '#2D3748',
                                        color: 'white',
                                    }}
                                >
                                    Filters
                                </Button>
                            </Popover>
                        </div>
                        <div className="flex gap-2">
                            <ExportUsers />
                            <ImportUsers />
                            <AddUserForm />
                        </div>
                    </Space>
                </div>
                <TableCustom
                    dataSource={filteredUsers}
                    columns={columns}
                    rowKey="id"
                    loading={loading}
                    pagination={true}
                    sortIcon={<MdSort />}
                />
            </div>

            <Modal
                title={<div className="title"> Edit User</div>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[null]}
                closeIcon={
                    <IoCloseCircleOutline
                        style={{ color: 'white', fontSize: 40 }}
                    />
                }
                className="edit-user-modal"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Role"
                        name="roleId"
                        rules={[
                            { required: true, message: 'Please select a role' },
                        ]}
                    >
                        <Select placeholder="Select a role">
                            {roles.map((role) => (
                                <Option key={role.id} value={role.id}>
                                    {role.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="fullname"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the fullname',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: 'Please select the date of birth',
                            },
                        ]}
                    >
                        <DatePicker format="YYYY/MM/DD" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a gender',
                            },
                        ]}
                    >
                        <Radio.Group>
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        valuePropName="checked"
                    >
                        <Switch
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                        />
                    </Form.Item>
                    <div className="modal-footer">
                        <Button
                            key="cancel"
                            onClick={handleCancel}
                            className="cancel-button"
                        >
                            Cancel
                        </Button>
                        <Button
                            key="save"
                            type="primary"
                            onClick={handleOk}
                            className="save-button"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default UserList;
