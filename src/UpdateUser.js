// import axios from "axios";
import { useEffect, useState } from "react";
import Forms from "./components/form/Forms";


export default function UpdateUser() {
  const [name , setname]=useState("");
  const [email , setemail] = useState("");
    
    const id = window.location.pathname.split("/").slice(-1)[0];
    useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res)=>res.json())
      .then((data)=>{
        setname(data[0].name);
        setemail(data[0].email);
      })
    },[])
  return (
    
    <div className="parent">
      <Forms 
                button={"Update"}
                name={name}
                email={email}
                Endpoint={`user/update/${id}`}
                navigate={"/dashboard/users"}
                buttonstyle={true}
                /> 
    </div>
    
  );
}
