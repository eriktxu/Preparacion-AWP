import { useState, useEffect } from "react";
import "./App.css";
import { getNotas } from "./services/idb";
import OfflineForm from "./components/OfflineForm";
import NotasPage from "./pages/NotasPage";

function App() {
  const [notas, setNotas] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const saved = await getNotas();
      setNotas(saved.map((n) => n.texto));
    })();
  }, []);

  const handleAddNote = (texto: string) => {
    setNotas((prev) => [...prev, texto]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Formulario Offline con IndexedDB</h1>
        <p className={isOnline ? "online" : "offline"}>
          {isOnline ? "🟢 Conectado" : "🔴 Sin conexión"}
        </p>
      </header>

      <main>
        <OfflineForm isOnline={isOnline} onAddNote={handleAddNote} />

        <h2>Notas recientes</h2>
        <ul>
          {notas.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>

        {/* Página completa de notas */}
        <NotasPage />
      </main>
    </div>
  );
}

export default App;
