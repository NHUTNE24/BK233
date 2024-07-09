import { useEffect, useState } from 'react';
import { Layout, Table } from 'antd';
import Logo from 'src/assets/images/logo.png';
import Uni from 'src/assets/images/unigate.png';
import NavigateMenu from '../../../components/Menu/NavigateMenu';
import axios from 'axios';
import styles from './UserList.module.css'; // Import the CSS module


const { Header, Content, Footer } = Layout;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dateofbirth',
            key: 'dateofbirth',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://66850e3656e7503d1ae22ace.mockapi.io/api/demo/users');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the users!', error);
            setLoading(false);
        }
    };

    return (
        <Layout className={styles.layout}>
            <Header className={styles.loginHeader}>
                <img src={Logo} alt="FPT Logo" className={styles.headerLogoLeft} />
                <img src={Uni} alt="unigate" className={styles.headerLogoRight} />
            </Header>
            <Layout className={styles.mainLayout}>
                <NavigateMenu />
                <Layout>
                    <Content className={styles.siteLayoutContent}>
                        <div className={styles.tableContainer}>
                            <Table columns={columns} dataSource={users} rowKey="id" loading={loading} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <Footer className={styles.loginFooter}>
                <span style={{ color: "white" }}>
                    Copyright &copy; 2024 FAMS. All rights reserved
                </span>
            </Footer>
        </Layout>
    );
};

export default UserList;
