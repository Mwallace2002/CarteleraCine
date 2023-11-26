import React from "react";

function Nosotros({ nombre, imagen, carrera }) {
  return (
    <div className="centered">
      <div className="circle">
        <img className="imagen" src={imagen} alt="Imagen" />
        <h3>{nombre}</h3>
        <p>{carrera}</p>
      </div>
    </div>
  );
}

export default Nosotros;
