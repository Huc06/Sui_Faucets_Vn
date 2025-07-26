import { createRoot } from "react-dom/client";
import "./index.css";
import "@suiet/wallet-kit/style.css";
import { WalletProvider } from "@suiet/wallet-kit";
import { BrowserRouter, Route, Routes } from "react-router";
import { Header } from "./components";
import HomePage from "./pages/home";
import { AdminDashboard } from "./pages/admin";
import { Dialog } from "./components/ui";

createRoot(document.getElementById("root")!).render(
  <WalletProvider>
    <BrowserRouter>
      <Header />
      <Dialog />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  </WalletProvider>
);
