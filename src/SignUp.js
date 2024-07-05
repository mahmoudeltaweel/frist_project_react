import axios from "axios";
import { useState } from "react";
import Header from "./components/Header";

export default function SignUp() {
const [name , setName]=useState("") ;
const [email , setEmail]=useState("") ;
const [password , setPaassword]=useState("") ;
const [passwordR , setPasswordR]=useState("") ;
const [accept , setaccept]=useState(false);
const [emailError , setEmailErroe]=useState("")

async function submit(e){
  let flag= true;
  e.preventDefault();
  setaccept(true);
  if(name==="" || password < 8 || passwordR !== password ){
    flag=false
  }else{
    flag=true;
  }
  try{
  if(flag){
    let res= await axios.post("http://127.0.0.1:8000/api/register", {
          name:name,
          email:email,
          password:password,
          password_confirmation:passwordR
     })
     if(res.status===200){
      window.localStorage.setItem("email" , email);
      window.location.pathname="/"

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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name...."
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          {accept && name.length === 0 && <p className="Error">user name is required </p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email...."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          {accept && emailError === 422 && <p className="Error">the email already been taken </p>}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password...."
            value={password}
            onChange={(e)=>setPaassword(e.target.value)}
          />
          { accept && password.length < 8 && <p className="Error">must be more than 8 chr</p>}
          <label htmlFor="repeat">Repeat Password</label>
          <input
            type="password"
            id="repeat"
            placeholder="Repeat Password...."
            value={passwordR}
            onChange={(e)=>setPasswordR(e.target.value)}
          />
          {accept && passwordR !==password &&  <p className="Error">password does not match</p>}

          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
