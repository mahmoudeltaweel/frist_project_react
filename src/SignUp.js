import Header from "./components/Header";
import Forms from "./components/form/Forms";

export default function SignUp() {

  return (
    <>
    <Header />
    <div className="parent" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"80vh",

    }}>
     <Forms button="Rigester" Endpoint="register" navigate={"/"} localStorage="true" styleRegister={true} />
    </div>
    </>
  );
}