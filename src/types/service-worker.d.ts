export {}; // asegura que este archivo sea un módulo

declare global {
  interface ServiceWorkerRegistration {
    sync?: SyncManager;
  }

  interface SyncManager {
    register(tag: string): Promise<void>;
  }

  interface Window {
    SyncManager?: typeof SyncManager;
  }
}