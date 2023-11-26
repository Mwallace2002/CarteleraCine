import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Busqueda({ setPeliculas }) {
  const [busqueda, setBusqueda] = useState('');

  const cargarPeliculasPrincipales = async () => {
    const apiKey = 'b23bf060f0972c01674df2ac3fa6c0a6';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setPeliculas(response.data.results);
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  };

  const handleVolverPrincipal = () => {
    cargarPeliculasPrincipales();
    setBusqueda(''); // Limpiar el campo de búsqueda al volver a las películas principales
  };

  const handleBusqueda = async () => {
    if (!busqueda) {
      cargarPeliculasPrincipales(); // Si no hay texto en la búsqueda, cargar las películas principales
      return;
    }

    const apiKey = 'b23bf060f0972c01674df2ac3fa6c0a6';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${busqueda}`;

    try {
      const response = await axios.get(apiUrl);
      setPeliculas(response.data.results);
    } catch (error) {
      console.error('Error al obtener películas:', error);
    }
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
  };

  return (
    <div>
      <div className="item-center">
        <input
          type="text"
          value={busqueda}
          onChange={handleChange}
          placeholder="Buscar películas..."
          style={{ marginRight: '10px' }} // Añade un margen a la derecha del campo de búsqueda
        />
        <button className='btn btn-light bold-btn item-center' onClick={handleBusqueda}>Buscar</button>
      </div>
      <button className='btn btn-light mt-2 bold-btn' onClick={handleVolverPrincipal}>Volver a las películas principales</button>
    </div>
  );
}

export default Busqueda;
