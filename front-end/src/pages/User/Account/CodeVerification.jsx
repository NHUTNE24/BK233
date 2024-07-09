import { Layout, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import Logo from "src/assets/images/logo.png"
import Uni from "src/assets/images/unigate.png"

import "../../../App.css";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const CodeVerification = () => {
  const navigate = useNavigate();

  const handleFinish = (values) => {
    console.log("Success:", values);
    // Handle code verification logic here
    navigate("/set-new-password"); // Redirect to set new password step
  };

  const handleResendCode = () => {
    // Handle resend code logic here
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
          <Text>Enter the code sent to your email.</Text>
          <Form
            name="code_verification_form"
            className="login-form"
            onFinish={handleFinish}
          >
            <Form.Item
              name="verificationCode"
              rules={[
                {
                  required: true,
                  message: "Please input the verification code!",
                },
              ]}
            >
              <Input placeholder="Enter your code" />
            </Form.Item>
            <Form.Item>
              <Button type="link" onClick={handleResendCode}>
                Resend Code
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button custom-button"
                block
              >
                Submit
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

export default CodeVerification;
