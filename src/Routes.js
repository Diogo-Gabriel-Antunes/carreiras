import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroisPage from "./pages/Administracao/HeroisPage";
import FormHeroi from "./pages/Administracao/HeroisPage/FormularioHeroi";
import GrupoPages from "./pages/Administracao/GruposPage";
import CriacaoGrupo from "./pages/Administracao/GruposPage/CriacaoGrupo";
import InfosHerois from "./pages/Administracao/HeroisPage/InfosHerois";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/infosheroi/:id" element={<InfosHerois />} />
        <Route path="/" element={<HeroisPage />} />
        <Route path="/novoheroi" element={<FormHeroi />} />
        <Route path="/herois/:id" element={<FormHeroi />} />
        <Route path="/grupos" element={<GrupoPages />} />
        <Route path="/grupo/:id" element={<CriacaoGrupo />} />
        <Route path="/novogrupo" element={<CriacaoGrupo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
