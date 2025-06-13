import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <App />
  </BrowserRouter>
  </StrictMode>,
)
