import axios from "axios";
import { useState } from "react";
import Header from "./components/Header";

export default function Login() {
  const[email , setEmail]=useState("");
  const[password , setPaassword]=useState("");
  const[accept , setaccept]=useState(false);
  const[emailError , setEmailErroe]=useState("");
 
 async function submit(e) {
    let flag=true;
    e.preventDefault();
    setaccept(true);
    if( password.length < 8){
     flag=false
    }else{
    flag=true
    }
    try {
    if(flag){
    let res = await axios
    .post("http://127.0.0.1:8000/api/login", {
          email:email,
          password:password,
     })
     if(res.status===200){
        window.localStorage.setItem("email" , email);
        window.location.pathname="/";
     }
    }
  }catch(err){
     setEmailErroe(err.response.status);
  }
  }
  return (
    <>
    <Header />
    <div className="parent">
      <div className="register">
        <form onSubmit={submit}>
         
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email...."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          {accept && emailError === 401 && <p className="Error">the email not found </p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password...."
            value={password}
            onChange={(e)=>setPaassword(e.target.value)}
          />
          { accept && password.length < 8 && <p className="Error">must be more than 8 chr</p>}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
