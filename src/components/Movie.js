import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Filtros from './Filtros';
import Busqueda from './Busqueda';

function Movie() {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [popupMovie, setPopupMovie] = useState(null);

  const [isShaking, setIsShaking] = useState({});

  // Función para activar la animación en una imagen específica
  const handleMouseEnter = (id) => {
    setIsShaking({ ...isShaking, [id]: true });
  };

  // Función para desactivar la animación en una imagen específica
  const handleMouseLeave = (id) => {
    setIsShaking({ ...isShaking, [id]: false });
  };

  useEffect(() => {
    const apiKey = 'b23bf060f0972c01674df2ac3fa6c0a6';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`; 
    axios.get(apiUrl)
      .then((response) => {
        setPeliculas(response.data.results);
      });
  }, []);

  const storedFavorites = JSON.parse(localStorage.getItem('favoritos')) || [];
  useEffect(() => {
    setFavoritos(storedFavorites);
  }, [storedFavorites]);


  
  const addToFavorites = (movie) => {
    const updatedFavorites = [...favoritos, movie];
    setFavoritos(updatedFavorites);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (movieToRemove) => {
    const updatedFavorites = favoritos.filter(
      (movie) => movie.id !== movieToRemove.id
    );
    setFavoritos(updatedFavorites);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
  };

  const isInFavorites = (movie) => {
    return favoritos.some((favMovie) => favMovie.id === movie.id);
  };

  const getMovieDetails = async (movie) => {
    const apiKey = 'b23bf060f0972c01674df2ac3fa6c0a6';
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
    return res.data;
  };

  const openPopup = async (movie) => {
    const details = await getMovieDetails(movie);
    setPopupMovie(details);
  };

  const closePopup = () => {
    setPopupMovie(null);
  };

  const handleBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const handleFiltro = () => {
    setShowFilters(!showFilters);
  };

  const movieContainerRef = useRef(null);
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const movieContainer = movieContainerRef.current;
    const filterButton = filterButtonRef.current;
  
    if (movieContainer && filterButton) {
      const containerWidth = movieContainer.offsetWidth;
      const screenWidth = window.innerWidth;
      const distanceFromRight = screenWidth - containerWidth;
      filterButton.style.marginRight = `${distanceFromRight}px`;
    }
  }, [peliculas, busqueda]);

  return (
    <div>
      <nav className="bg-warning" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: 'lightgray' }}>
        <div className="col-md-4 item-center text-center">
          <Busqueda setPeliculas={setPeliculas} />
        </div>
        <div className="col-md-4 text-center">
          <h1 className="text-black">Películas Populares</h1>
        </div>
        <div className="col-md-4 item-center text-center" ref={filterButtonRef}>
          <button className="btn btn-light mt-2 bold-btn" style={{ borderRadius: '10px' }} onClick={handleFiltro}>Filtrar</button>
          {showFilters && <Filtros setPeliculas={setPeliculas} />}
        </div>
      </nav>

      <main className="container bg-dark">
        <div className="row" ref={movieContainerRef}>
          {peliculas
            .filter((pelicula) => pelicula.title.toLowerCase().includes(busqueda.toLowerCase()))
            .map((pelicula) => (
              <div key={pelicula.id} className="col-4 fw-bold">
                <div style={{ margin: '3px', padding: '5px', textAlign: 'center' }}>
                  <div className="text-white" style={{ marginBottom: '10px' }}>
                    {pelicula.title}
                  </div>
                  <img
                    src={'https://www.themoviedb.org/t/p/w440_and_h660_face' + pelicula.poster_path}
                    alt={pelicula.title}
                    style={{
                      maxWidth: '100%',
                      cursor: 'pointer',
                      borderRadius: '10px',
                      animation: isShaking[pelicula.id] ? 'shake 2s' : 'none', // Aplicar la animación cuando está activada
                    }}
                    onClick={() => openPopup(pelicula)}
                    onMouseEnter={() => handleMouseEnter(pelicula.id)} // Activar la animación al pasar el mouse
                    onMouseLeave={() => handleMouseLeave(pelicula.id)} // Desactivar la animación al quitar el mouse
                  />
                  {isInFavorites(pelicula) ? (
                    <button className="btn btn-danger mt-2 bold-btn" onClick={() => removeFromFavorites(pelicula)}>Quitar de Favoritos</button>
                  ) : (
                    <button className="btn btn-warning mt-2 bold-btn" onClick={() => addToFavorites(pelicula)}>Añadir a Favoritos</button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {popupMovie && (
          <div className="popup" style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxHeight: '150%',
            backgroundColor: 'rgba(200, 200, 200, 0.9)',
            zIndex: '1000',
            padding: '20px',
            borderRadius: '5px',
            overflowY: 'auto',
          }}>
            <span className="close" onClick={closePopup} style={{ position: 'absolute', top: '5px', right: '10px', fontSize: '20px', cursor: 'pointer' }}>&times;</span>
            <div className="movie-details">
              <img
                src={'https://www.themoviedb.org/t/p/w440_and_h660_face' + popupMovie.poster_path}
                alt={popupMovie.title}
                style={{ maxWidth: '25%', cursor: 'pointer' }}
              />
              <h2>{popupMovie.title}</h2>

              <p>Sinopsis: {popupMovie.overview}</p>

              <p>Duración: {popupMovie.runtime} minutos</p>

              <p>Géneros: {popupMovie.genres.map(g => g.name).join(', ')}</p>

              <p>Fecha de estreno: {popupMovie.release_date}</p>

              <p>Rating: {popupMovie.vote_average}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Movie;
