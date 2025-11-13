// En tu proyecto (src/App.jsx)
import React from 'react';
import PaseInvitado from './components/PaseInvitado';
import './App.css'; // Estilos globales si los tienes

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Evento de Bienvenida</h1>
      </header>
      <main>
        {/* Aquí renderizas tu componente de formulario */}
        <PaseInvitado />
      </main>
    </div>
  );
}

export default App;