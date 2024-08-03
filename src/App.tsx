import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { AuthProvider } from './lib/auth-provider'
import ProtectRoute from './lib/ProtectRoute'


function App() {
  return (
    <>
      <AuthProvider >
        <Routes>
          <Route element={<Login/>} path="/login"/>
          <Route element={<ProtectRoute/>}>
            <Route element ={<Dashboard/>} path="/"/>
          </Route>
        </Routes>
        
      </AuthProvider>
    </>
  )
}

export default App
