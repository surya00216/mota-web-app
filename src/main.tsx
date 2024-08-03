import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './lib/theme-provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <App />
        <Toaster/>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
)
