import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { Provider } from 'react-redux';
import store, { persistedStore } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
