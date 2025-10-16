# 🧠 PWA con IndexedDB, Cache y Notificaciones (Semana 4)

Este proyecto forma parte de la práctica de la **Semana 4** del curso, donde se implementa una **Aplicación Web Progresiva (PWA)** con funcionalidades offline, almacenamiento local mediante **IndexedDB**, estrategias de cacheo en el **Service Worker**, sincronización simulada y notificaciones push locales.  

---

## 🚀 Características principales

### 📝 Formulario Offline
- Se implementó un componente `OfflineForm.tsx` donde el usuario puede agregar registros (notas o tareas).
- Cuando la app está **sin conexión**, los datos se almacenan en **IndexedDB** usando la librería `idb`.
- Al volver la conexión, se activa el **Background Sync API**, que simula el envío de los datos y los limpia de la base local.
- Los registros guardados se muestran al recargar la página.

### 📦 IndexedDB
- Se creó un archivo `idb.ts` para manejar la base de datos `offlineDB`.
- Los registros se guardan en el almacén `entries`.
- Se utilizan operaciones asincrónicas con `idb` para abrir, agregar, listar y eliminar entradas.

### 🔄 Sincronización en segundo plano
- En el archivo `service-worker.js`, se configuró el evento `sync` con la etiqueta `sync-entries`.
- Cuando el usuario envía un formulario sin conexión, se registra un evento de sincronización.
- Al recuperar la conexión, el Service Worker “sincroniza” los datos (simulando el envío al servidor) y luego limpia la base local.

> 💡 Esta práctica **no utiliza backend**, por lo que la sincronización se simula dentro del Service Worker con `setTimeout` y `console.log`.

### ⚙️ Estrategias de cache
- Se dividieron los recursos en **estáticos** y **dinámicos**.
- **Cache First:** para archivos del App Shell (HTML, CSS, JS).
- **Stale-While-Revalidate:** para imágenes o contenido no crítico.
- **Network First:** para solicitudes que requieren información fresca (por ejemplo, APIs externas si existieran).
- Se añadió una **página offline personalizada** (`offline.html`) para cuando el usuario no tenga conexión.

### 🔔 Notificaciones Push
- Se solicita permiso al usuario para recibir notificaciones locales.
- No se requiere backend ni claves VAPID.
- Se muestra una **notificación de prueba** usando `registration.showNotification()`.

### 🧭 Indicador Offline
- La app detecta el estado de conexión (`navigator.onLine`) y muestra un mensaje visual indicando si el usuario está **offline**.

---

## 📂 Estructura del proyecto

📦 my-pwa
├── public/
│ ├── manifest.json
│ ├── service-worker.js
│ ├── offline.html
│ └── icons/
├── src/
│ ├── components/
│ │ └── OfflineForm.tsx
│ ├── services/
│ │ └── idb.ts
│ ├── App.tsx
│ ├── main.tsx
│ └── App.css
├── package.json
└── README.md


---

## 🧪 Pruebas realizadas

- ✅ Prueba en modo **offline**: los datos se almacenan correctamente en IndexedDB.  
- ✅ Al recuperar la conexión, los registros se “sincronizan” y se eliminan.  
- ✅ **Notificación local** mostrada exitosamente al permitir permisos.  
- ✅ **Service Worker** instalado y activo.  
- ✅ Aplicación **instalable** en pantalla de inicio (Add to Home Screen).  
- ✅ Evaluación en Lighthouse (Performance, Accessibility, Best Practices y PWA).

---

## 🧰 Tecnologías utilizadas

- **React + TypeScript**
- **IndexedDB (idb)**
- **Service Worker + Background Sync**
- **Cache API**
- **Push API / Notification API**
- **Vite (como bundler)**
- **HTML, CSS**

---

## 🌐 Despliegue

La aplicación está servida mediante HTTPS usando **GitHub Pages / Vercel / Netlify** (según configuración del estudiante).  
Esto permite probar correctamente las características de PWA, notificaciones y el modo offline.

---

## 📸 Evidencias sugeridas

- Captura del formulario funcionando offline.  
- Captura de la app instalada como PWA.  
- Captura del mensaje o icono de “Offline”.  
- Captura de la notificación push.  
- Captura del resultado de Lighthouse.  

---

## 📜 Autor

**Nombre del estudiante:** _[Tu nombre aquí]_  
**Materia:** Aplicaciones Web Progresivas  
**Semana:** 4  
**Proyecto:** Implementación de funcionalidades offline con IndexedDB, Service Worker y Push API  

---
