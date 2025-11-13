import React, { useState, useMemo } from 'react';
import './FormularioTaller.css'; // Importamos el CSS

// Estado inicial del formulario
const initialState = {
  nombre: '',
  correo: '',
  tipoPase: '', // 'Estudiante' o 'Profesional'
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

  // 4. MANEJADOR DE CAMBIOS (Controlado)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue
    });

    // Limpia el error del campo específico si el usuario empieza a corregirlo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // 5. LÓGICA DE VALIDACIÓN (Función pura)
  const validateForm = () => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 6. MANEJADOR DE ENVÍO
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // Valida una última vez al intentar enviar
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

  // 8. MEJORA: Lógica para deshabilitar el botón
  // Usamos useMemo para que no se recalcule en cada render, solo si formData cambia
  const isFormInvalid = useMemo(() => {
    return !formData.nombre.trim() || 
           !formData.correo.includes('@') || 
           !formData.tipoPase || 
           !formData.aceptoTerminos;
  }, [formData]);


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

        {/* Campo Tipo de Pase (Radio) - REINTERPRETADO */}
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

        {/* Botón de Envío - MEJORA: Deshabilitado si es inválido */}
        <button type="submit" className="submit-btn" disabled={isFormInvalid}>
          {isFormInvalid ? 'Completa los campos requeridos' : 'Registrarme al Taller'}
        </button>
      </form>

      {/* --- SECCIÓN DERECHA (IMAGEN Y RESUMEN) --- */}
      <div className="summary-card">
        
        {/* 1. La imagen - MEJORA: Placeholder */}
        <div className="image-container">
          <img 
            src="https://placehold.co/600x300/3a3a3a/61dafb?text=Microtaller+UI/UX"
            alt="Placeholder del taller de UI/UX" 
            className="summary-image" 
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
            {/* REINTERPRETADO */}
            <strong>Asistencia:</strong> {formData.tipoPase || '...'}
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
            <p>¡Tu registro al taller ha sido confirmado!</p>
            
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