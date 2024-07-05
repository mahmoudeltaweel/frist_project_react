import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Users(){
    const[users , setusers]=useState([]);
    const[run , setrun]=useState(0);

   useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/user/show")
    .then((res)=>res.json())
    .then((data)=>setusers(data))
   },[run])

   async function deleteuser(id){
    try{
    let res= await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
    if(res.status===200){
        console.log("res" , res);
    setrun(run+1)
    }
}catch{
    console.log("none");
}
}

   const userdetails=users.map((user,index)=>
    <tr key={index}>
        <td>{index+1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
            <Link to={`${user.id}`} >
        <i 
             
             className="fa-solid fa-pen-to-square" 
             style={{color:"#74afb9" , fontSize:"20px" ,paddingRight:"4px" , cursor:"pointer" }}
             ></i>
             </Link>

               <i 
             className="fa-sharp fa-solid fa-trash" onClick={()=>deleteuser(user.id)}
             style={{color:"red" , fontSize:"20px" , cursor:"pointer" }}
             ></i>
 
        </td>
    </tr>
)

    
    return(
        <div style={{padding:"20px"}}>
          <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>users</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                
                {userdetails}
                
            </tbody>
          </table>
        </div>
    );
}