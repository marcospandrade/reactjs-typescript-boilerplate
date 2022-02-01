import React from 'react';
import { } from 'react-router-dom';
import { Routes } from './routes';
import { ThemeProvider } from '@material-ui/styles';
import theme from './styles/theme';
import { ToastContainerConfig } from './components/ToastContainerConfig';
import { BackdropComponent } from './components/Backdrop';
import { BackdropContextProvider } from './contexts/BackdropContext';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';

function App() {

  return (
    <ThemeProvider theme={theme} >
      <BackdropContextProvider>
        <Routes />
        <BackdropComponent />
      </BackdropContextProvider>
      <ToastContainerConfig />
    </ThemeProvider>
  );
}

export default App;
