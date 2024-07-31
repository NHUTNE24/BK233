import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
		<Provider store={store}>
			<ConfigProvider
				theme={{
					token: {
						fontFamily: "Inter"
					}
				}}
			>
				<App />
			</ConfigProvider>
		</Provider>
	// </React.StrictMode>
);
