import  axios  from "axios";
import { useContext, useState } from "react";
import Header from "../../../components/Header";
import { User } from "../context/UserContext";
import { useNavigate } from "react-router";


export default function SignUp() {
  const[name,setname]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[passwordconfirmation,setpasswordConfirmation]=useState("");
  const[accept, setaccept]=useState(false);
  const[EmailError,setEmailError]=useState(false);

  const userNow= useContext(User);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setaccept(true);
    try{
        let res=await axios.post("http://127.0.0.1:8000/api/register" , {
          name:name,
          email:email,
          password:password,
          password_confirmation:passwordconfirmation
        })
        const token =res.data.data.token;
        const userDetails= res.data.data.user;
        userNow.setAuth({token ,userDetails })
        nav("/dashboard")
      
    }catch(err){
      if(err.response.status===422){
      setEmailError(true);
      }
      setaccept(true);
    }

   }
  return (
    <div>
      <Header />
    <div className="parent Login">
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
            value={passwordconfirmation}
            onChange={(e)=>setpasswordConfirmation(e.target.value)}
          />
          {accept && password !== passwordconfirmation && <p className="error"> The Rebeat Password must be equal Password </p>}
          <div style={{ textAlign: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
