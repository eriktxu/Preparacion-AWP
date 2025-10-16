export const openDB = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NotasDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("notas")) {
        db.createObjectStore("notas", { keyPath: "id", autoIncrement: true });
      }
    };
  });
};

export const saveNoteOffline = async (texto: string): Promise<void> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("notas", "readwrite");
    const store = tx.objectStore("notas");
    store.add({ texto });

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export interface Nota {
  id?: number;
  texto: string;
}

export const getNotas = async (): Promise<Nota[]> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("notas", "readonly");
    const store = tx.objectStore("notas");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result as Nota[]);
    request.onerror = () => reject(request.error);
  });
};

export const clearNotas = async (): Promise<void> => {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction("notas", "readwrite");
    const store = tx.objectStore("notas");
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
