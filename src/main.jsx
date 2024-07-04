import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MyProvider from './Component/ContextApi/MyProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyProvider>
  <ChakraProvider>
    <HashRouter>
    <App />
    </HashRouter>
  </ChakraProvider>
  </MyProvider>
)
