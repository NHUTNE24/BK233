import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography, Spin, notification } from "antd";
import type { FormProps } from 'antd';
import "antd/dist/reset.css"; // Import Ant Design styles
import "../../../App.css";
import Logo from "../../assets/Logo.png";
import Uni from "../../assets/unigate.png";
import BG from "../../assets/bg.png";



const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
import { useNavigate } from 'react-router-dom';



const App: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPasswordClick = () => {
    navigate('/password-recovery');
  };
  const onFinish = (values: any) => {

    if (values.username === 'admin' && values.password === 'admin') {
      navigate("/home-page");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <Layout className="login-layout">
      <Header className="login-header">
        <img src={Logo} alt="FPT Logo" className="header-logo-left" />
        <img src={Uni} alt="unigate" className="header-logo-right" />
      </Header>
      <Content className="login-content">
        <div className="login-form-container">
          <Title level={2}>FPT Fresh Academy</Title>
          <Title level={3}>Training Management</Title>
          <Form
            name="login_form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Sign In
              </Button>
              <a className="login-form-forgot" onClick={handleForgotPasswordClick}>
                Forgot password?
              </a>
            </Form.Item>
            <Text>
              If you do not have the account, please contact:{" "}
              <a href="mailto:FA.HCM@fsoft.com.vn">FA.HCM@fsoft.com.vn</a>
            </Text>
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

export default App;

// type FieldType = {
//   username?: string;
//   password?: string;
// };

// const { Header, Content, Footer } = Layout;
// const { Title, Text } = Typography;
// import { useHref, useNavigate } from 'react-router-dom';
// import { DataGet, DataDelete, DataPost, DataPut } from "../../API/Data";
// import { url } from "inspector";



// const App: React.FC = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [status, setStatus] = useState('');


//   const handleForgotPasswordClick = () => {
//     navigate('/password-recovery');
//   };
//   const openNotification = () => {
//     notification.error({
//       message: 'Login Failed',
//       description: 'Sai tài khoản hoặc mật khẩu',
//     });
//   };
//   const onFinish: FormProps<FieldType>['onFinish'] = async () => {
//     const result = await DataPost(username, password);
//     const newStatus = result !== undefined ? 'successful' : "sai tk hoac mk";
//     setStatus(newStatus);
//     console.log(result, newStatus);
//     newStatus == 'successful' ? navigate('/home-page') : openNotification();;
//     setSpinning(false);
//   }

//   const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//     setSpinning(false);
//   };
//   const [spinning, setSpinning] = React.useState(false);


//   return (
//     <Layout className="login-layout">
//       {spinning ? <Spin spinning={spinning} fullscreen /> : ""}
//       <Header className="login-header">
//         <img src={Logo} alt="FPT Logo" className="header-logo-left" />
//         <img src={Uni} alt="unigate" className="header-logo-right" />
//       </Header>
//       <Content className="login-content">
//         <div className="login-form-container">
//           <Title level={2}>FPT Fresh Academy</Title>
//           <Title level={3}>Training Management</Title>
//           <Form
//             name="login_form"
//             className="login-form"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//           >
//             <Form.Item
//               name="username"
//               rules={[
//                 { required: true, message: "Please input your Username!" },
//               ]}
//             >
//               <Input placeholder="Username"
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               rules={[
//                 { required: true, message: "Please input your Password!" },
//               ]}
//             >
//               <Input type="password" placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </Form.Item>
//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="login-form-button"
//                 block
//                 onClick={() => setSpinning(true)}
//               >
//                 Sign In
//               </Button>

//               <a className="login-form-forgot" onClick={handleForgotPasswordClick} >
//                 Forgot password?
//               </a>
//             </Form.Item>
//             <Text>
//               If you do not have the account, please contact:{" "}
//               <a href="mailto:FA.HCM@fsoft.com.vn">FA.HCM@fsoft.com.vn</a>
//             </Text>
//           </Form>
//         </div>
//       </Content>
//       <Footer className="login-footer">
//         <text style={{ color: "white" }}>
//           Copyright &copy; 2024 FAMS. All rights reserved
//         </text>
//       </Footer>
//     </Layout>

//   );
// };

// export default App;
