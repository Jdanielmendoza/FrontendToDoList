import "./App.css";
import Form from "./components/Form/Form";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import MoreDetailsTask from "./components/MoreDetailsTask/MoreDetailsTask";
import ProtectedRoutes from "./services/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Form />} />
      <Route
        element={<ProtectedRoutes permission={localStorage.getItem("token")} />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/task/:id" element={<MoreDetailsTask />} />
        <Route path="/task" element={<MoreDetailsTask />} />
      </Route>
      <Route path="*" element={<div>ruta no encontrada!</div>} />
    </Routes>
  );
}

export default App;
