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
import { EyeIcon } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";


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
      const userCredential = await signInWithEmailAndPassword(auth, email, password!);      // Redirect to the user's dashboard or protected content
      console.log(userCredential)
      console.log("Signin successfull")
      navigate('/dashboard')
    } catch (error:any) {
      setError(error.message);
      setLoading(false)
    }
  };

  const PasswordInput = () => {
    const toggleVisibility = (e: React.FormEvent) => {
      // e.preventDefault()
      setHidden(prev =>!prev)
    }
    return (
      <div className="">
        <div className="">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className="text-black" type={hidden ? "password" : 'text'} required/>
          <button onClick={toggleVisibility}>
            {hidden ? <EyeIcon/> : <EyeClosedIcon/>}
          </button>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input onChange={(e)=>setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          {/* <PasswordInput/> */}
          <Input onChange={(e)=>setPassword(e.target.value)} id="password" type="password" required />
        </div>
       {error && <div className="text-red-500">Invalid email id or password</div> }
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignIn} className="w-full" disabled={loading}>Sign in</Button>
      </CardFooter>
    </Card>
  )
}


export default LoginForm