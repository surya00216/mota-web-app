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
  
  const toggleVisibility = () => {
    setHidden(prev =>!prev)

    return (
      <div className="">
        <div className="flex border rounded-md">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type={ hidden ? "password" : 'text'} className="flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
          <button className="mr-3" onClick={()=>toggleVisibility()}>
            {hidden ? <EyeOpenIcon className="w-4 h-4"/> : <EyeNoneIcon className="w-4 h-4"/>}
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
          <div className="flex border rounded-md">
            <input onChange={(e)=>setPassword(e.target.value)} id="password" type={ hidden ? "password" : 'text'} className="flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" required />
            <button className="mr-3" onClick={()=>toggleVisibility()}>
              {hidden ? <EyeOpenIcon className="w-4 h-4"/> : <EyeNoneIcon className="w-4 h-4"/>}
            </button>
          </div>
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