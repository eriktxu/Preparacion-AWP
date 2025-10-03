import { useState } from "react";
import "./App.css";

function App() {
  const [notas, setNotas] = useState<string[]>([]); 
  const [texto, setTexto] = useState("");

  const agregarNota = () => {
    if (texto.trim() !== "") {
      setNotas([...notas, texto]);
      setTexto("");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Notas Rápidas</h1>
      </header>

      <main>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe una nota..."
        />
        <button onClick={agregarNota}>Agregar</button>

        <ul>
          {notas.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
