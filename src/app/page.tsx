"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";


export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = () => {
    authClient.signUp.email({
      name, email, password
    }, {
      onSuccess: () => {
        window.alert("success")
      },
      onError: () => {
        window.alert("something went wrong broski")
      }
    })
  }

  const onLogin = () => {
    authClient.signIn.email({ email, password})
  }

  const { data: session, isPending} = authClient.useSession() 

  if(isPending) {
    return <p>loading.....</p>
  }

  if(session) {
    return <div className="flex flex-col gap-4">
      <p>Loggged in as {session.user.name}</p>
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
  }


  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-4">
          <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={() => onSubmit()}>Submit</Button>
      </div>

       <div className="flex flex-col gap-4">
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={() => onLogin()}>Login</Button>
      </div>
    </div>
      
  );
}
