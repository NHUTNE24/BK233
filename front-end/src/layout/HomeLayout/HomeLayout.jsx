import PropTypes from 'prop-types';
import NavigateMenu from '../../components/Menu/NavigateMenu';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function HomeLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Header />
            <div className="flex flex-row">
                <NavigateMenu />
                <div className="grow w-auto px-5">
                    <Outlet />
                </div>
            </div>
            <Footer />
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
