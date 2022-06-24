import React from 'react';
import ReactDOM from 'react-dom/client';
// to use react router add library here and wrap whole App with <BrowserRouter>
import { BrowserRouter } from "react-router-dom"

import App from './App';
import { UserProvider } from './contexts/user.context';

import './index.scss';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      {/* any component inside UserProvider can access the context value inside the Provider itself */}
      <UserProvider>
        <App />
      </UserProvider>

    </BrowserRouter>
    
  </React.StrictMode>
);
