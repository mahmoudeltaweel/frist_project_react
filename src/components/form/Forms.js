import './index.css'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Forms(props) {
  const[name , setName]=useState("");
  const[email , setEmail]=useState("");
  const[password , setPaassword]=useState("");
  const[passwordR , setPasswordR]=useState("");
  const[accept , setaccept]=useState(false);
  const[emailError , setEmailErroe]=useState("");

  let styleRegister={
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      marginTop:"40px",
      width:"500px"
  }

  const form ={
    boxShadow:"12px 12px 2px 1px rgba(0, 0, 255,.2)",
  }

  const buttonstyle={
    width:"100%"
  }
  useEffect(()=>{
    setName(props.name);
    setEmail(props.email)
  },[props.name , props.email])
 
 async function submit(e) {
    let flag=true;
    e.preventDefault();
    setaccept(true);
    if(name===" " || password.length < 8 || passwordR !== password){
     flag=false
    }else{
    flag=true
    }
    try {
    if(flag){
    let res = await axios.post(`http://127.0.0.1:8000/api/${props.Endpoint}`, {
          name:name,
          email:email,
          password:password,
          password_confirmation:passwordR
     })
      if(res.status===200){
       props.localStorage && window.localStorage.setItem("email",email);
        window.location.pathname=props.navigate
      }
    }
  }catch(err){
     setEmailErroe(err.response.status);
  }
  }
  
  return (
      <div className="register" style={props.styleRegister && styleRegister}>
        <form onSubmit={submit} style={props.styleRegister&&form} >
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
            <button type="submit" style={props.buttonstyle && buttonstyle}>{props.button}</button>
          </div>
        </form>
      </div>
  );
}
