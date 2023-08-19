import { Outlet, useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";

const ProtectedRoutes = ({ permission }) => {
  console.log(permission);

  if (permission === null) {
    return <Form/>
  }

  return <Outlet />;
}

export default ProtectedRoutes;
