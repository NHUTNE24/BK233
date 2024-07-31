import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Space, message, Layout, Input } from 'antd';
import axios from 'axios';
import './RolePermission.css';
import TableCustom from '../../../components/Table/index';

const { Option } = Select;
const { Content } = Layout;

const RolePermission = () => {
    const [permissions, setPermissions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isClick, setIsClick] = useState(false);
    const [editingRole, setEditingRole] = useState([]);
    const [newRole, setNewRole] = useState(null);

    useEffect(() => {
        fetchRoles();
        fetchPermissions();
    }, []);

    const fetchRoles = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/roles');
            const data = response.data.map((item) => ({
                id: item.id,
                name: item.name,
                syllabusPermission: item.syllabusPermission.id,
                trainingProgramPermission: item.trainingProgramPermission.id,
                classPermission: item.classPermission.id,
                learningMaterialPermission: item.learningMaterialPermission.id,
                userPermission: item.userPermission.id,
            }));
            setRoles(data);
        } catch (error) {
            message.error('Failed to fetch roles');
        } finally {
            setLoading(false);
            setIsClick(false);
            setNewRole(null);
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/permissions');
            const data = response.data.map((item) => ({
                id: item.id,
                name: item.name,
            }));
            setPermissions(data);
        } catch (error) {
            message.error('Failed to fetch permissions');
        }
    };

    const handleChange = (value, id, field) => {
        const updatedRoles = roles.map((role) => {
            if (role.id === id) {
                return { ...role, [field]: value };
            }
            return role;
        });
        setRoles(updatedRoles);

        const updatedEditingRole = [...editingRole];
        const existingIndex = updatedEditingRole.findIndex(
            (role) => role.id === id
        );
        if (existingIndex !== -1) {
            updatedEditingRole[existingIndex] = {
                ...updatedEditingRole[existingIndex],
                [field]: value,
            };
        } else {
            const originalRole = roles.find((role) => role.id === id);
            updatedEditingRole.push({
                id,
                ...originalRole,
                [field]: value,
            });
        }
        setEditingRole(updatedEditingRole);
    };

    const getPermissionById = (id) => {
        const permission = permissions.find((perm) => perm.id === id);
        return permission || null;
    };

    const handleSave = async () => {
        if (editingRole.length === 0) {
            message.warning('No changes to save');
            return;
        }

        setLoading(true);

        try {
            await Promise.all(
                editingRole.map((role) => {
                    const updatedRole = {
                        id: role.id,
                        name: role.name,
                        syllabusPermission: getPermissionById(role.syllabusPermission),
                        trainingProgramPermission: getPermissionById(role.trainingProgramPermission),
                        classPermission: getPermissionById(role.classPermission),
                        learningMaterialPermission: getPermissionById(role.learningMaterialPermission),
                        userPermission: getPermissionById(role.userPermission),

                    };

                    console.log('Updating role with ID:', role.id);
                    console.log('Payload:', updatedRole);

                    return axios.put(
                        `http://localhost:8080/api/roles/${role.id}`,
                        updatedRole
                    );
                })
            );
            message.success('Roles updated successfully');
            setEditingRole([]);
            setIsClick(false);
        } catch (error) {
            console.error('Error updating roles:', error);
            console.error('Error response:', error.response?.data);  
            message.error('Failed to update roles');
        } finally {
            setLoading(false);
        }
    };


    const handleAddNewRole = async () => {
        if (!newRole) {
            message.warning('Please fill in the new role details');
            return;
        }
        setLoading(true);
        try {
            const newRoleData = {
                name: newRole.name,
                syllabusPermission: newRole.syllabusPermission,
                trainingProgramPermission: newRole.trainingProgramPermission,
                classPermission: newRole.classPermission,
                learningMaterialPermission: newRole.learningMaterialPermission,
                userPermission: newRole.userPermission,
                "_class": "com.fams.api.entity.Role"
            };
            const response = await axios.post(
                'http://localhost:8080/api/roles',
                newRoleData
            );
            message.success('New role added successfully');
            setRoles([...roles, response.data]);
            setNewRole(null);
        } catch (error) {
            console.error('Error adding new role:', error);
            message.error('Failed to add new role');
        } finally {
            setLoading(false);
            setIsClick(false);
        }
    };

    const columns = [
        {
            title: 'Role name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (text, record) => (
                <Input
                    defaultValue={text}
                    onChange={(e) =>
                        handleChange(e.target.value, record.id, 'name')
                    }
                    style={{ width: 130 }}
                />
            ),
        },
        {
            title: 'Syllabus',
            dataIndex: 'syllabusPermission',
            key: 'syllabusPermission',
            width: 150,
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    onChange={(value) =>
                        handleChange(value, record.id, 'syllabusPermission')
                    }
                    style={{ width: 130 }}
                >
                    {permissions.map((perm) => (
                        <Option key={perm.id} value={perm.id}>{perm.name}</Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Training program',
            dataIndex: 'trainingProgramPermission',
            key: 'trainingProgramPermission',
            width: 150,
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    onChange={(value) =>
                        handleChange(value, record.id, 'trainingProgramPermission')
                    }
                    style={{ width: 130 }}
                >
                    {permissions.map((perm) => (
                        <Option key={perm.id} value={perm.id}>{perm.name}</Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Class',
            dataIndex: 'classPermission',
            key: 'classPermission',
            width: 150,
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    onChange={(value) =>
                        handleChange(value, record.id, 'classPermission')
                    }
                    style={{ width: 130 }}
                >
                    {permissions.map((perm) => (
                        <Option key={perm.id} value={perm.id}>{perm.name}</Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Learning material',
            dataIndex: 'learningMaterialPermission',
            key: 'learningMaterialPermission',
            width: 150,
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    onChange={(value) =>
                        handleChange(value, record.id, 'learningMaterialPermission')
                    }
                    style={{ width: 130 }}
                >
                    {permissions.map((perm) => (
                        <Option key={perm.id} value={perm.id}>{perm.name}</Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'User',
            dataIndex: 'userPermission',
            key: 'userPermission',
            width: 150,
            render: (text, record) => (
                <Select
                    defaultValue={text}
                    onChange={(value) => handleChange(value, record.id, 'userPermission')}
                    style={{ width: 130 }}
                >
                    {permissions.map((perm) => (
                        <Option key={perm.id} value={perm.id}>{perm.name}</Option>
                    ))}
                </Select>
            ),
        },
    ];

    const columns1 = [
        {
            title: 'Role name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Syllabus',
            dataIndex: 'syllabusPermission',
            key: 'syllabusPermission',
            width: 150,
            render: (text) => getPermissionById(text)?.name || text,
        },
        {
            title: 'Training program',
            dataIndex: 'trainingProgramPermission',
            key: 'trainingProgramPermission',
            width: 150,
            render: (text) => getPermissionById(text)?.name || text,
        },
        {
            title: 'Class',
            dataIndex: 'classPermission',
            key: 'classPermission',
            width: 150,
            render: (text) => getPermissionById(text)?.name || text,
        },
        {
            title: 'Learning material',
            dataIndex: 'learningMaterialPermission',
            key: 'learningMaterialPermission',
            width: 150,
            render: (text) => getPermissionById(text)?.name || text,
        },
        {
            title: 'User',
            dataIndex: 'userPermission',
            key: 'userPermission',
            width: 150,
            render: (text) => getPermissionById(text)?.name || text,
        },
    ];

    return (
        <div>
            <h4 className="p-8 bg-main text-primary border-t">
                Role Permission
            </h4>
            <div className="content">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        height: 36,
                    }}
                >
                    <Button
                        type="default"
                        onClick={() =>
                            setNewRole({
                                name: 'New Role',
                                syllabusPermission: "66a1015f77601f133cafe707",
                                trainingProgramPermission: "66a1015f77601f133cafe707",
                                classPermission: "66a1015f77601f133cafe707",
                                learningMaterialPermission: "66a1015f77601f133cafe707",
                                userPermission: "66a1015f77601f133cafe707",
                                "_class": "com.fams.api.entity.Role",
                            })
                        }
                        style={{
                            display: isClick
                                ? 'none'
                                : newRole
                                    ? 'none'
                                    : 'block',
                            background: '#2D3748',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Add Role
                    </Button>
                    <Button
                        type="default"
                        onClick={() => setIsClick(true)}
                        style={{
                            display: isClick
                                ? 'none'
                                : newRole
                                    ? 'none'
                                    : 'block',
                            background: '#2D3748',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    >
                        Update permission
                    </Button>
                </div>
                <TableCustom
                    dataSource={
                        newRole
                            ? [...roles, { ...newRole, id: 'new' }]
                            : roles
                    }
                    columns={isClick ? columns : columns1}
                    noPagination={false}
                    rowKey="id"
                    loading={loading}
                />
                <div style={{ textAlign: 'right', marginTop: 20 }}>
                    <Space>
                        <Button
                            type="link"
                            onClick={fetchRoles}
                            style={{
                                display: isClick
                                    ? newRole
                                        ? 'none'
                                        : 'block'
                                    : newRole
                                        ? 'block'
                                        : 'none',
                                fontWeight: 'bold',
                            }}
                            danger
                        >
                            <span
                                style={{ borderBottom: '1.5px solid ' }}
                            >
                                Cancel
                            </span>
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            style={{
                                display: isClick
                                    ? newRole
                                        ? 'none'
                                        : 'block'
                                    : 'none',
                                background: '#2D3748',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            Save
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleAddNewRole}
                            className="save-button"
                            style={{
                                display: isClick
                                    ? 'none'
                                    : newRole
                                        ? 'block'
                                        : 'none',
                            }}
                        >
                            Save New Role
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default RolePermission;
