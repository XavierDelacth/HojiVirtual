import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Early cleanup: remove old dynamic products key before React mounts
try {
	localStorage.removeItem('hoji_dynamic_products_v1');
} catch (e) {
	// Non-fatal; log for debugging
	// eslint-disable-next-line no-console
	console.error('Falha ao remover hoji_dynamic_products_v1 no arranque:', e);
}

createRoot(document.getElementById("root")!).render(<App />);
