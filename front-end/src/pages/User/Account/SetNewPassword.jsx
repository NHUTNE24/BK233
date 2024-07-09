import { Layout, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from 'src/assets/images/logo.png';
import Uni from 'src/assets/images/unigate.png';
import "../../../App.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const SetNewPassword  = () => {
  const navigate = useNavigate();

  const handleFinish = (values) => {
    console.log("Success:", values);
    // Handle setting new password logic here
    navigate("/"); // Redirect to login page after setting new password
  };

  return (
    <Layout className="login-layout">
      <Header className="login-header">
        <img src={Logo} alt="FPT Logo" className="header-logo-left" />
        <img src={Uni} alt="unigate" className="header-logo-right" />
      </Header>
      <Content className="login-content">
        <div className="login-form-container">
          <Title level={2}>Password Recovery</Title>
          <Text>Enter your new password.</Text>
          <Form
            name="set_new_password_form"
            className="login-form"
            onFinish={handleFinish}
          >
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm New Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button custom-button"
                block
              >
                Change Password
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => navigate("/")}
                className="login-form-return"
              >
                Return to Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className="login-footer">
        <text style={{ color: "white" }}>
          Copyright &copy; 2024 FAMS. All rights reserved
        </text>
      </Footer>
    </Layout>
  );
};

export default SetNewPassword;
