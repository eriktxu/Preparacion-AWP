import { useState } from "react";
import { saveNoteOffline } from "../services/idb";

interface OfflineFormProps {
  isOnline: boolean;
  onAddNote: (texto: string) => void;
}

export default function OfflineForm({ isOnline, onAddNote }: OfflineFormProps) {
  const [texto, setTexto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (texto.trim() === "") return;

    onAddNote(texto); // actualiza el listado en la interfaz

    if (isOnline) {
      console.log("Nota enviada al servidor:", texto);
    } else {
      await saveNoteOffline(texto);

      // comprobamos si existe serviceWorker y SyncManager
      if ("serviceWorker" in navigator && "SyncManager" in window) {
        const reg = await navigator.serviceWorker.ready;

        // ✅ verificamos que sync exista y tenga register
        if (reg.sync && typeof reg.sync.register === "function") {
          await reg.sync.register("sync-notas");
          console.log("Sincronización en segundo plano registrada");
        } else {
          console.warn("Background Sync no disponible en este navegador");
        }
      } else {
        console.warn("Background Sync no soportado");
      }
    }

    setTexto(""); // limpiar input
  };

  return (
    <form onSubmit={handleSubmit} className="offline-form">
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escribe una nota o actividad..."
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

