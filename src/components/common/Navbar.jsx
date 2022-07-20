import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = ({user}) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <h1 className="navbar-brand"> Vidly </h1>
  <div className= "navbar-nav" >
    <ul className="navbar-nav" >
      <li className="nav-item ">
        <NavLink  className="nav-link" to="/movies"> Movies </NavLink>
      </li>
      <li className="nav-item">
        <NavLink   className="nav-link" to="/customer"> Customer </NavLink>
      </li>
      <li className="nav-item">
        <NavLink   className="nav-link" to="/rentals"> Rentals </NavLink>
      </li>
      {!user && <> <li className="nav-item">
        <NavLink   className="nav-link" to="/login"> Login </NavLink>
      </li>
      <li className="nav-item">
        <NavLink   className="nav-link" to="/register"> Register </NavLink>
      </li>
      </>}
      {user && <> <li className="nav-item">
        <NavLink   className="nav-link" to="/profile"> {user.name} </NavLink>
      </li>
      <li className="nav-item">
        <NavLink   className="nav-link" to="/logout">log out </NavLink>
      </li>
      </>}
    </ul>
  </div>
</nav>
     );
}
 
export default Navbar;