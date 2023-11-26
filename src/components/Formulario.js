import React, { useState } from 'react';
import '../CSS/Form.css';


const Formulario = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    age: '',
    subject: '',
    comment: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos, por ejemplo, a través de una API

    // Mostrar el popup de agradecimiento
    setShowPopup(true);

    // Borrar los datos del formulario
    setFormData({
      email: '',
      name: '',
      lastName: '',
      age: '',
      subject: '',
      comment: ''
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div>
        <h1 className='text-aligen-center text-white'>Formulario de contacto</h1>
        <form onSubmit={handleSubmit} className='p-5' style={{ margin: '3px', padding: '5px', textAlign: 'center' }}>
          <div className="mb-3" >
            <label htmlFor="email" className='text-white'>
              Email:
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className='text-white'>
              Name:
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className='text-white'>
              Last Name:
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className='text-white'>
              Age:
              <input
                type="number"
                name="age"
                id="age"
                value={formData.age}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="subject" className='text-white'>
              Subject:
              <input
                type="text"
                name="subject"
                id="subject"

                value={formData.subject}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className='text-white'>
              Comment:
              <textarea
                name="comment"
                id="comment"
                value={formData.comment}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
      {showPopup && (
        <div className="popup-overlay position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="popup-content bg-white p-4 rounded position-relative">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <p>¡Muchas gracias por escribirnos! Nos pondremos en contacto contigo pronto.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulario;