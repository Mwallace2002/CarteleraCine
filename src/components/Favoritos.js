import React, { useState, useEffect } from 'react';

const Favoritos = () => {
  const storedFavorites = JSON.parse(localStorage.getItem('favoritos')) || [];
  const [favorites, setFavorites] = useState(storedFavorites);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const removeFromFavorites = (movieToRemove) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.id !== movieToRemove.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favoritos', JSON.stringify(updatedFavorites));
  };

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1200px' }}>
        <h1 className= "bg-warning text-black" style={{ marginBottom: '20px', gridColumn: '1 / -1', textAlign: 'center', color: 'white' }}>Favoritos</h1>
        {favorites.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '200px', marginTop: '20px' }}>
            <p className='text-white'>No hay películas guardadas en favoritos</p>
          </div>
        ) : (
          favorites.map((movie) => (
            <div key={movie.id} style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={'https://www.themoviedb.org/t/p/w440_and_h660_face' + movie.poster_path}
                alt={movie.title}
                style={{
                  maxWidth: '100%',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  animation: hoveredMovie === movie.id ? 'shake 2s ease-in-out infinite' : 'none',
                }}
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
              />
              <p>{movie.title}</p>
              <button className="btn btn-danger bold-btn" onClick={() => removeFromFavorites(movie)}>
                Eliminar de Favoritos
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favoritos;
