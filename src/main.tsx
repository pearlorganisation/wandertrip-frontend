
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './registerServiceWorker'
import { Provider } from 'react-redux';
import { store } from './lib/redux/store.ts';

createRoot(document.getElementById("root")!).render(
<Provider store={store}><App /></Provider>);

// Register service worker for PWA capabilities
registerServiceWorker();
