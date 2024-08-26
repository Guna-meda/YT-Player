import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { VideoProvider } from "./components/VideoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VideoProvider>
      <App />
    </VideoProvider>
  </StrictMode>
);
