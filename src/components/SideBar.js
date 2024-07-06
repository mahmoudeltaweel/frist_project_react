import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink
        to={"/dashboard/users"}
        activeClassName="active"
        className="item-link"
      >
        <i className="fa-solid fa-users"></i> users
      </NavLink>
      <NavLink
        to={"/dashboard/user/create"}
        activeClassName="active"
        className="item-link"
      >
        <i className="fa-solid fa-user-plus"></i>
        New User
      </NavLink>
    </div>
  );
}
