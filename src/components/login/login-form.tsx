import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth } from "@/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";


export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true)
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successfull",{position:"top-center"})
      navigate('/')
    } catch (error:any) {
      setError(error.message);
      setLoading(false)
    }
  };

  return (
      <form onSubmit={handleSignIn}>      
        <Card className="w-96 shadow-lg ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email to Login into MOTA Admin Panel
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input onChange={(e)=>setEmail(e.target.value)} id="email" type="email" placeholder="johndoe@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex border rounded-md">
                <input onChange={(e)=>setPassword(e.target.value)} id="password" type={ hidden ? "password" : 'text'} className="flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" required />
                <div className="mr-3 cursor-pointer flex justify-center items-center" onClick={()=>setHidden(!hidden)}>
                  {hidden ? <EyeOpenIcon className="w-4 h-4"/> : <EyeNoneIcon className="w-4 h-4"/>}
                </div>
              </div>
            </div>
          {error && <div className="text-red-500">Invalid email id or password</div> }
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>Sign in</Button>
          </CardFooter>
        </Card>
      </form>
  )
}


export default LoginForm