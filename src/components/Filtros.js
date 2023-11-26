import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  popularidadAlta: false,
  generoAccion: false,
  generoComedia: false,
  anioLanzamiento: ''
};

export default function Filtros({ setPeliculas }) {
  const [filtros, setFiltros] = useState(initialState);
  const [filtrosGuardados, setFiltrosGuardados] = useState(initialState);

  const aplicarFiltros = async () => {
    try {
      let url = 'https://api.themoviedb.org/3/discover/movie?api_key=b23bf060f0972c01674df2ac3fa6c0a6';

      const { popularidadAlta, generoAccion, generoComedia, anioLanzamiento } = filtros;

      if (popularidadAlta) {
        url += '&sort_by=popularity.desc';
      }

      if (generoAccion) {
        url += '&with_genres=28';
      }

      if (generoComedia) {
        url += '&with_genres=35';
      }

      if (anioLanzamiento) {
        url += `&primary_release_year=${anioLanzamiento}`;
      }

      const response = await axios.get(url);
      setPeliculas(response.data.results);

      // Guardar los filtros aplicados
      setFiltrosGuardados({ ...filtros });
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: checked
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevFiltros) => ({
      ...prevFiltros,
      [name]: value
    }));
  };

  const limpiarFiltros = () => {
    setFiltros(initialState);
    setFiltrosGuardados(initialState);
  };

  return (
    <div>
      <h3>Filtros</h3>
      <div>
        <input
          type="checkbox"
          name="popularidadAlta"
          checked={filtros.popularidadAlta}
          onChange={handleCheckboxChange}
        />
        <label>Popularidad Alta</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="generoAccion"
          checked={filtros.generoAccion}
          onChange={handleCheckboxChange}
        />
        <label>Género Acción</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="generoComedia"
          checked={filtros.generoComedia}
          onChange={handleCheckboxChange}
        />
        <label>Género Comedia</label>
      </div>
      <div>
        <input
          className='mt-2 text-black text-center'
          type="number"
          name="anioLanzamiento"
          value={filtros.anioLanzamiento}
          onChange={handleInputChange}
          placeholder="Año de lanzamiento"
        />
      </div>
      <button className='btn btn-light mt-2 bold-btn' onClick={aplicarFiltros}>Aplicar Filtros</button>
      <button className='btn btn-light mt-2 bold-btn' onClick={limpiarFiltros}>Limpiar Filtros</button>
    </div>
  );
}
