import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createContext } from "react";
import { Domain } from "@shared/schema";

export const DomainContext = createContext<{
  currentDomain: Domain | null;
  setCurrentDomain: (domain: Domain | null) => void;
}>({
  currentDomain: null,
  setCurrentDomain: () => {},
});

createRoot(document.getElementById("root")!).render(<App />);
