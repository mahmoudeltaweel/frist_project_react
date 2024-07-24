import { Route, Routes } from "react-router";
import Home from "./pages/Website/Home";
import SignUp from "./pages/Website/Auth/SignUp";
import Login from "./pages/Website/Auth/Login";
import Users from "./pages/Dashboard/Users/Users";
import UpdateUser from "./pages/Dashboard/Users/UpdateUser";
import CreateUser from "./pages/Dashboard/Users/CreateUser";
import Dashboard from "./pages/Dashboard/Dashboard";
import RequireAuth from "./pages/Website/Auth/RequireAuth";

// Dashboard
function App() {
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />} >
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UpdateUser />} />
          <Route path="user/create" element={<CreateUser />} />
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
