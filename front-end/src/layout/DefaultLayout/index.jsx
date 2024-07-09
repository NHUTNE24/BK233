import PropTypes from 'prop-types';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
function DefaultLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <>
            <Header />
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className={`${collapsed ? ' ml-[80px]' : ' ml-[256px]'}`}>
                {children}
            </div>
            <Footer />
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default DefaultLayout;
