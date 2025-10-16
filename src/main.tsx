
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Registro del Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker registrado"))
      .catch((err) => console.log("Error al registrar SW:", err));
  });
}

if ("Notification" in window && "serviceWorker" in navigator) {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification("¡Notificación de prueba!", {
          body: "Esto es una prueba local de notificación push",
          icon: "/icons/icon-192.png",
        });
      });
    }
  });
}
