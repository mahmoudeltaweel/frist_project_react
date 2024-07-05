import { Link } from "react-router-dom";
export default function Header() {
    function handellogout(){
        window.localStorage.removeItem("email");
        window.location.pathname="/";
    }
  return (
    <div className="container">
    <nav className="d-flex">
        <div className="d-flex">
      <Link  to="/" style={{textDecoration:"none"}}>Home</Link>
      <Link to="/about" style={{textDecoration:"none"}}>About</Link>
      </div>
      <div className="d-flex">{
        !window.localStorage.getItem("email")?(
        <>
      <Link to="/register" className="register-nav" style={{ textAlign: "center" }}>
        Register
      </Link>
      <Link to="/login" className="register-nav" style={{ textAlign: "center" }}>
        Login
      </Link> </> ) :(
      <Link to="/" className="register-nav" style={{ textAlign: "center" }} onClick={handellogout}>
      Log out
    </Link>
  )
      }
      </div>
    </nav>
    </div>
  );
}
