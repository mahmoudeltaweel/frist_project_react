import { Route, Routes } from "react-router";
import SignUp from "./SignUp";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Home from "./components/Home";
import Users from "./Users";
import UpdateUser from "./UpdateUser";

function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;
