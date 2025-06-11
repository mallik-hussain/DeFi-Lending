import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import { NFTProvider } from './contexts/NFTcontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NFTProvider>
    <App />
    <ToastContainer autoClose={3000} />
    </NFTProvider>
  </StrictMode>,
)
