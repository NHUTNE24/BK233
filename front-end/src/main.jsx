import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
    palette: {
        custom: {
            main: '#2D3748',
            contrastText: '#FFFFFF',
        },
    },
});
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
