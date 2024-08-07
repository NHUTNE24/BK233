import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Radio,
  Switch,
  Row,
  Col,
  notification,
} from "antd";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import "./AddUserForm.css";

const { Option } = Select;

const AddUserForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/roles')
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          console.log('Roles:', response.data);
          const formattedRoles = response.data.map(role => ({
            id: role.id,
            name: role.name
          }));
          setRoles(formattedRoles);
        }
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);

      const roleResponse = await axios.get(`http://localhost:8080/api/roles/${values.roleId}`);
      const roleData = roleResponse.data;
      console.log('Role data:', roleData);

      const userData = {
        email: values.email,
        username: values.username,
        password: values.password,
        fullname: values.fullname,
        phone: values.phone,
        dob: values.dob.toISOString(),
        gender: values.gender,
        status: values.status !== undefined ? values.status : false,
        role: {
          id: roleData.id,
          name: roleData.name,
          syllabusPermission: roleData.syllabusPermission,
          trainingProgramPermission: roleData.trainingProgramPermission,
          classPermission: roleData.classPermission,
          learningMaterialPermission: roleData.learningMaterialPermission,
          userPermission: roleData.userPermission
        },
        roleName: roleData.name,
        "_class": "com.fams.api.entity.UserModel"
      };

      await axios.post('http://localhost:8080/api/users/register', userData);

      notification.success({
        message: 'User Added',
        description: 'The user has been added successfully.',
      });

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding user:', error.response?.data || error.message);
      notification.error({
        message: 'Error',
        description: 'There was an error adding the user.',
      });
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ background: '#2D3748', color: 'white' }} icon={<IoMdAddCircleOutline />}>
        Add User
      </Button>
      <Modal
        title={<div className="custom-modal-title">Add a new user</div>}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="add-user-modal"
        closeIcon={<IoCloseCircleOutline style={{ color: 'white', fontSize: 40 }} />}
        closable
      >
        <Form
          form={form}
          layout="vertical"
          className="form"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="roleId"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Select a role">
                  {roles.map(role => (
                    <Option key={role.id} value={role.id}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Full Name" name="fullname" rules={[{ required: true, message: 'Please enter the full name' }]}>
                <Input placeholder="Full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter the email address' }]}>
                <Input placeholder="Email address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter the username' }]}>
                <Input placeholder="User name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter the password' }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Phone Number" name="phone">
                <Input placeholder="Phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: 'Please select date of birth' }]}>
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="yyyy/mm/dd"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            
            <Col span={12}>
              <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
                <Radio.Group>
                  <Radio value={true}>Male</Radio>
                  <Radio value={false}>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Status" name="status" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </Col>
          </Row>
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

export default AddUserForm;
