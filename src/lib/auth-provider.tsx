import { auth } from "@/firebase";
import {  onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  currentUser: User | null;
  isLoggedIn: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export function AuthProvider({children}:{children:React.ReactNode}){
  const [ currentUser, setCurrentUser ] = useState<User|null>(null)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user)=>{
      if(user){
        setCurrentUser(user)
        setIsLoggedIn(true)
      }else{
        setCurrentUser(null)
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    })
    return unsubscribe
  },[])
  
  const value = {
    currentUser,
    isLoggedIn,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  return useContext(AuthContext)
}