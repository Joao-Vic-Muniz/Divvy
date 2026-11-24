import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import DetalhesRole from "./pages/detalhesRole/DetalhesRole";
import Perfil from "./pages/perfil/Perfil";
import Role from "./pages/role/Role";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="roles" element={<Role />} />
          <Route path="roles/:roleId" element={<DetalhesRole />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}