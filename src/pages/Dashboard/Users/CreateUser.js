import  axios  from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router";



export default function CreateUser() {
  const[name,setname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[passwordR,setpasswordR]=useState("");
  const[accept, setaccept]=useState(false);
  const[EmailError,setEmailError]=useState("");
  const nav = useNavigate();  


  async function submit(e) {
    let flag=true;
    e.preventDefault();
    setaccept(true);
    if(name ==="" ||password.length < 8  || passwordR !== password){
      flag=false;
    }else{
      flag=true;
    }
    try{
      if(flag){
        let res=await axios.post("http://127.0.0.1:8000/api/user/create" , {
          name:name,
          email:email,
          password:password,
          password_confirmation:passwordR
        })
        nav("/dashboard/users")

        
      }
    }catch(err){
      setEmailError(err.response.status);
    }

   }
  return (
    <div>
    <div className="parent">
      <div className="register">
        <form onSubmit={submit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name..."
            value={name}
            onChange={(e)=>setname(e.target.value)}           
          />
          {accept && name ==="" && <p className="error">name is requird</p>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email..."
            required
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          {accept && EmailError===422 && <p className="error"> The email has already been taken</p> }
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password..."
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          {accept && password.length < 8 && <p className="error"> password must be more than 8 char </p>}
          <label htmlFor="repeatpassword">RepeatPassword:</label>
          <input
            type="password"
            id="repeatpassword"
            placeholder="repeat Password..."
            value={passwordR}
            onChange={(e)=>setpasswordR(e.target.value)}
          />
          {accept && password !== passwordR && <p className="error"> The Rebeat Password must be equal Password </p>}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
