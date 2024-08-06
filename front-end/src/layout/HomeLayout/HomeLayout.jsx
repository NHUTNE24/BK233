import PropTypes from 'prop-types';
import NavigateMenu from '../../components/Menu/NavigateMenu';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './HomeLayout.scss';
function HomeLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div className="layout-default">
                <Header />
                <div className="flex flex-row main-content">
                    <div className="sidebar">
                        <NavigateMenu />
                    </div>
                    <div className="right-content grow w-auto px-5">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
HomeLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default HomeLayout;
