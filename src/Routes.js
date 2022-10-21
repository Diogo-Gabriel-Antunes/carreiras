import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroisPage from "./pages/Administracao/HeroisPage";
import Heroes from "./pages/Heroes";
import HeroesId from "./pages/Heroes/HeroesId";
import Home from "./pages/Home";
import FormHeroi from "./pages/Administracao/HeroisPage/FormularioHeroi";
import GrupoPages from "./pages/Administracao/GruposPage";
import CriacaoGrupo from "./pages/Administracao/GruposPage/CriacaoGrupo";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/heroes" element={<Heroes />} />
        <Route path="/heroes/:id" element={<HeroesId />} />
        <Route path="/herois" element={<HeroisPage />} />
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
