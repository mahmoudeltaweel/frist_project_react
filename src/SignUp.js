import Header from "./components/Header";
import Forms from "./components/Forms";

export default function SignUp() {

  return (
    <>
    <Header />
    <div className="parent">
     <Forms button="Rigester" Endpoint="register" navigate={"/"} localStorage="true" />
    </div>
    </>
  );
}
