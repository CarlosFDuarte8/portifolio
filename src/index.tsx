import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Importando configuração do i18n
import './i18n';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <App />
);