import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';        // Your global styles
import ChatWindow from './components/ChatWindow';  // Your main chat component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatWindow />
  </React.StrictMode>
);
