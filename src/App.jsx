import React from 'react';
import FormularioTaller from './components/FormularioTaller';
import './components/FormularioTaller.css'; // Importamos el CSS aquí

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Microtaller de UI/UX</h1>
      </header>
      <main>
        {/* Este es el componente principal de tu examen */}
        <FormularioTaller />
      </main>
    </div>
  );
}

export default App;