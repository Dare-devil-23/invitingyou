import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { HashRouter } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext"
import ScrollToTop from './components/ScrollToTop';
import { WatchListContextProvider } from './context/WatchListContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <WatchListContextProvider>
        <HashRouter>
          <ScrollToTop />
          <App />
        </HashRouter>
      </WatchListContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
