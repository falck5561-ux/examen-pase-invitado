import React, { useState, useEffect } from 'react';
import './FormularioTaller.css'; // Importamos el CSS

// Estado inicial del formulario
const initialState = {
  nombre: '',
  correo: '',
  tipoPase: '', // 'estudiante' o 'profesional'
  aceptoTerminos: false,
  comentarios: ''
};

function FormularioTaller() {
  // 1. ESTADO: Un solo objeto para todos los datos del formulario
  const [formData, setFormData] = useState(initialState);
  
  // 2. ESTADO: Para manejar errores de validación
  const [errors, setErrors] = useState({});
  
  // 3. ESTADO: Para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. ESTADO: Para saber si el formulario es válido
  const [isFormValid, setIsFormValid] = useState(false);

  // 5. EFECTO: Valida el formulario cada vez que 'formData' cambia
  useEffect(() => {
    setIsFormValid(validateForm(true));
  }, [formData]);

  // 6. MANEJADOR DE CAMBIOS (Controlado)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });

    // Limpia el error del campo que se está editando
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // 7. LÓGICA DE VALIDACIÓN
  const validateForm = (checkOnly = false) => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido.';
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido.';
    } else if (!formData.correo.includes('@') || !formData.correo.includes('.')) {
      newErrors.correo = 'El correo no es válido (ej: usuario@dominio.com).';
    }
    if (!formData.tipoPase) {
      newErrors.tipoPase = 'Debe seleccionar un tipo de asistencia.';
    }
    if (!formData.aceptoTerminos) {
      newErrors.aceptoTerminos = 'Debe aceptar los términos y condiciones.';
    }

    if (!checkOnly) {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  // 8. MANEJADOR DE ENVÍO
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!validateForm()) {
      return; 
    }
    console.log('Formulario válido, enviando (simulado):', formData);
    setIsModalOpen(true); 
  };

  // 9. Función para cerrar el modal y resetear el formulario
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialState); 
    setErrors({}); 
  };

  return (
    <div className="pase-container">
      
      {/* --- SECCIÓN DEL FORMULARIO --- */}
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <h2>Formulario de Registro</h2>
        
        {/* Campo Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Ada Lovelace"
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
            placeholder="Ej: ada@correo.com"
          />
          {errors.correo && <span className="error-text">{errors.correo}</span>}
        </div>

        {/* Campo Tipo de Pase (Radio) */}
        <div className="form-group">
          <label>Tipo de Asistencia</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="tipoPase"
                value="Estudiante"
                checked={formData.tipoPase === 'Estudiante'}
                onChange={handleChange}
              />
              Estudiante (con credencial)
            </label>
            <label>
              <input
                type="radio"
                name="tipoPase"
                value="Profesional"
                checked={formData.tipoPase === 'Profesional'}
                onChange={handleChange}
              />
              Profesional / General
            </label>
          </div>
          {errors.tipoPase && <span className="error-text">{errors.tipoPase}</span>}
        </div>

        {/* Campo Comentarios (Opcional) */}
        <div className="form-group">
          <label htmlFor="comentarios">Intereses (Opcional)</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            maxLength={120} 
            placeholder="¿Qué temas te gustaría ver en el taller?"
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
            Acepto los términos y condiciones del evento.
          </label>
          {errors.aceptoTerminos && <span className="error-text">{errors.aceptoTerminos}</span>}
        </div>

        {/* Botón de Envío (con validación proactiva) */}
        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          Registrarme en el Taller
        </button>
      </form>

      {/* --- SECCIÓN DERECHA (IMAGEN Y RESUMEN) --- */}
      <div className="summary-card">
        
        {/* 1. La imagen que subiste a 'public' */}
        <div className="image-container">
          <img 
            src="/microtaller.webp" // Ruta pública
            alt="Imagen del microtaller" 
            className="summary-image" 
          />
        </div>

        {/* 2. El Resumen en Vivo */}
        <div className="summary-content">
          <h3>Resumen en Vivo</h3>
          <p>
            <strong>Nombre:</strong> {formData.nombre || '...'}
          </p>
          <p>
            <strong>Correo:</strong> {formData.correo || '...'}
          </p>
          <p>
            <strong>Asistencia:</strong> {formData.tipoPase || '...'}
          </p>
          <p>
            <strong>Términos:</strong> {formData.aceptoTerminos ? 'Aceptados' : 'Pendientes'}
          </p>
        </div>

        {/* --- 3. MEJORA: Elemento decorativo del camión --- */}
        {/* Asegúrate de tener una imagen 'truck-icon.webp' (o como la llames) en tu carpeta /public */}
        <div className="summary-decoration">
          <img 
            src="/truck-icon.webp" 
            alt="Decoración de taller" 
            className="truck-icon" 
          />
        </div>
      </div>


      {/* --- MODAL DE ENVÍO SIMULADO --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Registro exitoso! (Simulado)</h3>
            <p>Tu lugar para el microtaller ha sido reservado.</p>
            
            <div className="modal-summary">
              <p><strong>Nombre:</strong> {formData.nombre}</p>
              <p><strong>Correo:</strong> {formData.correo}</p>
              <p><strong>Tipo:</strong> {formData.tipoPase}</p>
              {formData.comentarios && (
                <p><strong>Intereses:</strong> {formData.comentarios}</p>
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

export default FormularioTaller;