import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

screenResize();

window.onresize = screenResize;
function screenResize() {
  // eslint-disable-next-line no-restricted-globals
  document.documentElement.style.fontSize = screen.width / 360 * 16 + 'px';
}

