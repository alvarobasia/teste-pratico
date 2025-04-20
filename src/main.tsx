import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "@/redux/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import EmployeeInfos from "@/pages/employee-infos.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <main className="container w-[100vw] h-[100vh]">
          <h1 className="text-3xl font-bold mb-8 text-center w-[100%] h-fit">
            Sistema de Gerenciamento de Funcionários e IRRF
          </h1>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/new" element={<EmployeeInfos />} />
            <Route path="/edit/:id" element={<EmployeeInfos />} />
          </Routes>
        </main>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
