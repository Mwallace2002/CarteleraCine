import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar navbar-expand-lg bg-warning p-6 d-flex justify-content-center bg-ffc107">
      <div className="topnav">
        <ul className="navbar-nav" style={{ fontSize: "20px"}}>
          <li className="nav-item">
            <NavLink className="nav-link" to="/movie">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/info">
              Sobre Nosotros
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/formulario">
              Contactanos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/favoritos">
              Favoritos
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
