import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePlan from "./pages/CreatePlan";
import ViewPlans from "./pages/ViewPlans";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreatePlan />} />
      <Route path="/plans" element={<ViewPlans />} />
    </Routes>
  );
}

export default AppRoutes;