import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
)
