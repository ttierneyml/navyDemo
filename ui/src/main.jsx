import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MLProvider } from "ml-fasttrack";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/all.css';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MLProvider
    scheme="http"
    host="localhost"
    port="4000"
    options="basic-options"
    auth={{ username: "DrSmith", password: "demo" }}
    paginationOptions={{ pageLength: 10 }}
  >
    <App />
  </MLProvider>
);