import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' for React 18
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root for React 18

root.render(
    <React.StrictMode> {/* Optional: Helps with identifying potential problems */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);