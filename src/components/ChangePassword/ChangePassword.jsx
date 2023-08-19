import "./ChangePassword.css";
import { Toaster } from "react-hot-toast";
import { submitChangePassword } from "./changePasswordSubmit";

const ChangePassword = () => {
  return (
    <div className="containerFormChangePassword">
      <Toaster />
      <header className="titleFormchangePassword">To Do List</header>
      <div className="containerChangePassword">

        <div className="containerChangePassword-forms">
          <section className="sectionFormsChangePassword">
            <form action="" className="formChangePassword">
              <input
                type="text"
                placeholder="antigua contraseña"
                id="usernameRegister"
              />
              <input
                type="password"
                placeholder="nueva contraseña"
                id="passwordRegister"
              />
              <input
                type="password"
                placeholder="repetir nueva contraseña"
                id="passwordRepeat"
              />
            </form>
          </section>

          <section className="sectionButtonP">
            <input
              type="button"
              value="Cambiar Contraseña"
              id="buttonSendRegister"
              className="send-ChangePassword"
              onClick={submitChangePassword}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
