import axios from "axios";
import { useContext, useState } from "react";
import Header from "../../../components/Header";
import './login.css'
import { User } from "../context/UserContext";
import { useNavigate } from "react-router";


export default function Login() {
  const[email , setEmail]=useState("");
  const[password , setPaassword]=useState("");
  const[accept , setaccept]=useState(false);
  const[err , setErr]=useState("");
 
  const userNow= useContext(User);
  const nav = useNavigate();


 async function submit(e) {
    e.preventDefault();
    setaccept(true);
    try {
    let res = await axios
    .post("http://127.0.0.1:8000/api/login", {
          email:email,
          password:password,
     })
     console.log("res" , res);
     const token =res.data.data.token;
        const userDetails= res.data.data.user;
        userNow.setAuth({token ,userDetails })
        nav("/dashboard")
  }catch(err){
    if( err.response.status===401){
     setErr( err.response.status);
    }
  }
  }
  return (
    <>
    <Header />
    <div className="parent Login">
      <div className="register Login" style={{boxShadow:"12px 12px 2px 1px rgba(0, 0, 255,.2)"}}>
        <form onSubmit={submit}>
         
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email...."
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="password...."
            value={password}
            onChange={(e)=>setPaassword(e.target.value)}
          />
          {accept && err === 401 && <p className="Error">wrong Email or password </p>}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}
