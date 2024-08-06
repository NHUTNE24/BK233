import { Layout, Form, Typography, Modal } from 'antd';

import 'antd/dist/reset.css'; // Import Ant Design styles
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import './index.css';
import LoginHeader from '../../components/Header/LoginHeader';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const { Content } = Layout;
const { Title, Text } = Typography;

const Login = () => {
    const redirectGoogleOAuth = () => {
        window.open(
            'http://localhost:8080/oauth2/authorization/google',
            '_self'
        );
    };

    const redirectFacebookOAuth = () => {
        window.open(
            'http://localhost:8080/oauth2/authorization/facebook',
            '_self'
        );
    };

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const error = params.get('error');

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (error) {
            setIsModalVisible(true);
        }
    }, [error]);

    return (
        <div>
            <Layout className="login-layout">
                <LoginHeader />
                <Content className="login-content">
                    <div className="login-form-container">
                        <Title level={2}>FPT Fresh Academy</Title>
                        <Title level={3}>Training Management</Title>
                        <Form
                            name="login_form"
                            className="login-form"
                            initialValues={{ remember: true }}
                        >
                            <div className="text-3xl font-semibold mb-5">
                                {' '}
                                Sign in with
                            </div>
                            <Form.Item>
                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={redirectGoogleOAuth}
                                        className="flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black font-medium hover:bg-gray-300 border border-gray-400"
                                    >
                                        <GoogleOutlined className="mr-2 h-4 w-4 mb-[1px]" />
                                        {'Sign in with Google'}
                                    </button>
                                    <button
                                        onClick={redirectFacebookOAuth}
                                        className="flex items-center justify-center px-6 py-2.5 rounded-full bg-white text-black font-medium hover:bg-gray-300 border border-gray-400"
                                    >
                                        <FacebookOutlined className="mr-2 h-4 w-4 mb-[1px]" />
                                        {'Sign in with Facebook'}
                                    </button>
                                </div>
                            </Form.Item>
                            <Text>
                                If you do not have the account, please contact:{' '}
                                <a href="mailto:FA.HCM@fsoft.com.vn">
                                    FA.HCM@fsoft.com.vn
                                </a>
                            </Text>
                        </Form>
                    </div>
                    <Modal
                        title="Login Error"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleOk}
                    >
                        <p>User not found. Please try again.</p>
                    </Modal>
                </Content>
                <Footer />
            </Layout>
        </div>
    );
};

export default Login;
