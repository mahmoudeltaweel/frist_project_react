import Forms from "./components/form/Forms";

export default function CreateUser() {
  return (
    <>
      <div
        className="parent"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Forms
          button="Create"
          Endpoint="user/create"
          navigate={"/dashboard/user"}
          buttonstyle={true}
          
        />
      </div>
    </>
  );
}
