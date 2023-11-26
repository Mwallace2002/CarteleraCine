import React from 'react';
import Nosotros from "./Nosotros";
import imagen1 from "../Imagenes/Oscar.JPG";
import imagen2 from "../Imagenes/Martin.jpeg";
import imagen3 from "../Imagenes/Max.jpg";
import "../CSS/style.css";

function Info() {
  return (
    <div className="centered-content"> {/* Nuevo contenedor para centrar */}
      <div className="pagina">
        <section className="bg-warning explicacion text-black p-3 text-center">
          <h1>¡Bienvenido a nuestra web!</h1>
        </section>
        <section className="tres-columnas p-3">
          <div className="columna text-white ">
            <Nosotros
              nombre="Oscar Lobo"
              imagen={imagen1}
              carrera="Estudiante Ingeniería Civil Informática e Industrial"
            />
          </div>
          <div className="columna text-white">
            <Nosotros
              nombre="Martín Dávila"
              imagen={imagen2}
              carrera="Estudiante Ingeniería Civil Industrial e Informática"
            />
          </div>
          <div className="columna text-white">
            <Nosotros
              nombre="Max Wallace"
              imagen={imagen3}
              carrera="Estudiante Ingeniería Civil Informática e Industrial"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Info;
