import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./auth-provider"

const ProtectRoute = () => {
  const user = useAuth()
  const isLoggedIn:boolean|undefined = user?.isLoggedIn
  return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectRoute