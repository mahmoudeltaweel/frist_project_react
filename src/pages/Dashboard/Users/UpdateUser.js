/* eslint-disable react-hooks/rules-of-hooks */
import axios  from "axios";
import React , { useState, useEffect } from "react";

export default function updateUser(){
    const[name,setname]=useState("");
    const[email,setemail]=useState("");
    const[password,setpassword]=useState("");
    const[passwordR,setpasswordR]=useState("");
    const[accept, setaccept]=useState(false);
    const id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res)=>res.json())
      .then((data)=>{
        setname(data[0].name);
        setemail(data[0].email);
      })
    },[id])
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
          let res=await axios.post(`http://127.0.0.1:8000/api/user/update/${id}` , {
            name:name,
            email:email,
            password:password,
            password_confirmation:passwordR
          })
          if(res.status===200){
            window.localStorage.setItem("email",email);
            window.location.pathname="/dashboard/users"
          }
        }
      }catch(err){
        console.log(err);
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
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
          </div>
        </div>
      );
}