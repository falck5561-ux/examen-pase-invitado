import React, { useState } from 'react';
import './PaseInvitado.css'; // Importamos el CSS actualizado

// Estado inicial del formulario
const initialState = {
  nombre: '',
  correo: '',
  tipoPase: '', // 'general' o 'vip'
  aceptoTerminos: false,
  comentarios: ''
};

function PaseInvitado() {
  // 1. ESTADO: Un solo objeto para todos los datos del formulario
  const [formData, setFormData] = useState(initialState);
  
  // 2. ESTADO: Para manejar errores de validación
  const [errors, setErrors] = useState({});
  
  // 3. ESTADO: Para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. MANEJADOR DE CAMBIOS (Controlado)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // 5. LÓGICA DE VALIDACIÓN
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido.';
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido.';
    } else if (!formData.correo.includes('@')) {
      newErrors.correo = 'El correo no es válido (debe incluir @).';
    }
    if (!formData.tipoPase) {
      newErrors.tipoPase = 'Debe seleccionar un tipo de pase.';
    }
    if (!formData.aceptoTerminos) {
      newErrors.aceptoTerminos = 'Debe aceptar los términos y condiciones.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 6. MANEJADOR DE ENVÍO
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!validateForm()) {
      return;
    }
    console.log('Formulario válido, enviando (simulado):', formData);
    setIsModalOpen(true); 
  };

  // 7. Función para cerrar el modal y resetear el formulario
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialState); 
    setErrors({}); 
  };

  return (
    <div className="pase-container">
      
      {/* --- SECCIÓN DEL FORMULARIO --- */}
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h2>Pase de Invitado</h2>
        
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="error-text">{errors.nombre}</span>}
        </div>

        {/* Campo Correo */}
        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
          {errors.correo && <span className="error-text">{errors.correo}</span>}
        </div>

        {/* Campo Tipo de Pase (Radio) */}
        <div className="form-group">
          <label>Tipo de Pase</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="tipoPase"
                value="General"
                checked={formData.tipoPase === 'General'}
                onChange={handleChange}
              />
              General
            </label>
            <label>
              <input
                type="radio"
                name="tipoPase"
                value="VIP"
                checked={formData.tipoPase === 'VIP'}
                onChange={handleChange}
              />
              VIP
            </label>
          </div>
          {errors.tipoPase && <span className="error-text">{errors.tipoPase}</span>}
        </div>

        {/* Campo Comentarios (Opcional) */}
        <div className="form-group">
          <label htmlFor="comentarios">Comentarios (Opcional)</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            maxLength={120} 
          />
          <small>{formData.comentarios.length} / 120</small>
        </div>

        {/* Campo Acepto Términos (Checkbox) */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="aceptoTerminos"
              name="aceptoTerminos"
              checked={formData.aceptoTerminos}
              onChange={handleChange}
            />
            Acepto los términos y condiciones
          </label>
          {errors.aceptoTerminos && <span className="error-text">{errors.aceptoTerminos}</span>}
        </div>

        {/* Botón de Envío */}
        <button type="submit" className="submit-btn">
          Generar Pase
        </button>
      </form>

      {/* --- SECCIÓN DERECHA (IMAGEN Y RESUMEN) --- */}
      <div className="summary-card">
        
        {/* 1. La imagen que pediste */}
        <div className="image-container">
          <img 
            src="/bar.jpg" // Asegúrate que 'bar.jpg' esté en la carpeta 'public'
            alt="Imagen de un bar" 
            className="bar-image" 
          />
        </div>

        {/* 2. El Resumen en Vivo (requerido por el examen) */}
        <div className="summary-content">
          <h3>Resumen en Vivo</h3>
          <p>
            <strong>Nombre:</strong> {formData.nombre || '...'}
          </p>
          <p>
            <strong>Correo:</strong> {formData.correo || '...'}
          </p>
          <p>
            <strong>Tipo de Pase:</strong> {formData.tipoPase || '...'}
          </p>
          <p>
            <strong>Términos:</strong> {formData.aceptoTerminos ? 'Aceptados' : 'Pendientes'}
          </p>
        </div>
      </div>


      {/* --- MODAL DE ENVÍO SIMULADO --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Envío exitoso (simulado — sin back-end)</h3>
            <p>¡Tu pase ha sido generado!</p>
            
            <div className="modal-summary">
              <p><strong>Nombre:</strong> {formData.nombre}</p>
              <p><strong>Correo:</strong> {formData.correo}</p>
              <p><strong>Tipo:</strong> {formData.tipoPase}</p>
              {formData.comentarios && (
                <p><strong>Comentarios:</strong> {formData.comentarios}</p>
              )}
            </div>
            
            <button onClick={handleCloseModal} className="modal-close-btn">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaseInvitado;