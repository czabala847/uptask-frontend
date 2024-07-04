import { AppLayout } from "@/layouts/AppLayout";
import { DashboardView } from "@/views/DashboardView";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CrearProjectView } from "./views/projects/CrearProjectView";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<DashboardView />} />
          <Route path="/projects/create" element={<CrearProjectView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
