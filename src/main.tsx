import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root')!;
const initialPage = rootEl.getAttribute('data-page') as any;

createRoot(rootEl).render(
  <StrictMode>
    <App initialPage={initialPage || undefined} />
  </StrictMode>,
);
