import PropTypes from 'prop-types';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function HomeLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();

	const isLoginPage = location.pathname === '/login';
	return (
		<>
			<Header />
			{!isLoginPage && <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />}			
			<div className={`mb-8 ${isLoginPage ? 'ml-0' : (collapsed ? 'ml-[80px]' : 'ml-[256px]')}`}>
				<Outlet />
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
