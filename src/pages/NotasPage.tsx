import { useEffect, useState } from "react";
import { getNotas } from "../services/idb"; 
import type { Nota } from "../services/idb";
import "../App.css"

export default function NotasPage() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cargarNotas = async () => {
      const data = await getNotas();
      setNotas(data);
      setIsLoading(false);
    };

    cargarNotas();
  }, []);

  return (
    <div className="notas-page">
      <h2>Notas guardadas</h2>

      {isLoading ? (
        <p>Cargando notas...</p>
      ) : notas.length === 0 ? (
        <p>No hay notas registradas aún.</p>
      ) : (
        <ul className="notas-lista">
          {notas.map((nota) => (
            <li key={nota.id ?? Math.random()}>{nota.texto}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
