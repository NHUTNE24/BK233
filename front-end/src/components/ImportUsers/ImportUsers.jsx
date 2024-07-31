import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Upload, notification, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IoCloseCircleOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import "./ImportUsers.css";

const ImportUsers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/roles");
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        notification.error({
          message: "Error",
          description: "There was an error fetching the roles.",
        });
      }
    };
    fetchRoles();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      notification.error({
        message: "Error",
        description: "Please upload a file.",
      });
      return;
    }

    try {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const formattedData = jsonData.map((user) => {
          const role = roles.find((role) => role.name === user.roleName);
          if (!role) {
            throw new Error(`Role ${user.roleName} not found`);
          }
          return {
            email: user.email,
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            phone: user.phone,
            dob: new Date(user.dob).toISOString(),
            gender: user.gender.toLowerCase() === "male",
            status: user.status.toLowerCase() === "active",
            role: {
              id: role.id,
              name: role.name,
              syllabusPermission: role.syllabusPermission,
              trainingProgramPermission: role.trainingProgramPermission,
              classPermission: role.classPermission,
              learningMaterialPermission: role.learningMaterialPermission,
              userPermission: role.userPermission
            },
            roleName: role.name,
            "_class": "com.fams.api.entity.UserModel",
          };
        });
        console.log(formattedData)
        for (const userData of formattedData) {
          await axios.post('http://localhost:8080/api/users/register', userData);
        }

        notification.success({
          message: "Users Imported",
          description: "The users have been imported successfully.",
        });

        setIsModalVisible(false);
        setFileList([]);
      };

      reader.readAsArrayBuffer(file.originFileObj);
    } catch (error) {
      console.error('Error importing users:', error.response?.data || error.message);
      notification.error({
        message: "Error",
        description: `There was an error importing the users: ${error.message}`,
      });
    }
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList.slice(-1));
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ background: '#2D3748', color: 'white' }} icon={<UploadOutlined />}>
        Import Users
      </Button>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="import-users-modal"
        closeIcon={<IoCloseCircleOutline style={{ color: 'white', fontSize: 40 }} />}
        closable
      >
        <Row gutter={16}>
          <Col span={24}>
            <Upload.Dragger
              accept=".xlsx, .xls"
              fileList={fileList}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single upload. Please upload the file in .xlsx or .xls format.</p>
            </Upload.Dragger>
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
            key="upload"
            type="primary"
            onClick={handleUpload}
            className="upload-button"
          >
            Upload
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ImportUsers;
