import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<App />);
