
import { Layout, Avatar } from 'antd';
// import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import Logo from 'src/assets/images/logo.png';
import Uni from 'src/assets/images/unigate.png';
import NavigateMenu from '../../../components/Menu/NavigateMenu';
import './Home.css';
import Cat from "src/assets/images/cat.png"
const { Header, Content, Footer } = Layout;

const HomePage = () => {
    // const menu = (
    //     <Menu>
    //         <Menu.Item key="1">
    //             <LogoutOutlined />
    //             Log out
    //         </Menu.Item>
    //     </Menu>
    // );
    const handleLogout = () => {
        window.location.href = '/LoginForm';
    };

    return (
        <div className="home-background">
            <Layout>
                <Header className="login-header">
                    <img src={Logo} alt="FPT Logo" className="header-logo-left" />
                    <div className="header-right">
                        <img src={Uni} alt="unigate" className="header-logo-right" />
                        <div className="header-profile">
                            <Avatar src={Cat} alt="Profile Avatar" />
                            <div className="profile-info">
                                <span className="profile-name">Warrior Tran</span>
                                <a href="/" onClick={handleLogout} className="logout-link">Log out</a>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content className="home-background"></Content>
                <Layout className="main-layout">
                    <NavigateMenu />
                    <Layout>

                    </Layout>
                </Layout>
                <Footer className="login-footer">
                    <span style={{ color: "white" }}>
                        Copyright &copy; 2024 FAMS. All rights reserved
                    </span>
                </Footer>
            </Layout>
        </div>
    );
};


export default HomePage;