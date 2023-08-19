import Login from "../Login/Login";
import Register from "../Register/Register";
import "./Form.css";
import { useEffect} from "react";
import toggleForm from "./toggleForm";
import { handleLogin, handleRegister } from "./submitButton";
import { Toaster } from "react-hot-toast";
import background from '/background.svg'

const Form = () => {
  useEffect(() => {
    toggleForm();
    document
      .getElementById("buttonSendRegister")
      .addEventListener("click", handleRegister);
    document
      .getElementById("buttonSendLogin")
      .addEventListener("click", handleLogin);
    console.log("running!");

    return  () => {
      console.log("cleaning");
      document
        .getElementById("buttonSendLogin")
        .removeEventListener("click", handleLogin );
      document
        .getElementById("buttonSendRegister")
        .removeEventListener("click", handleRegister);
    };
  }, []);

  return (
    <div className="containerForm">
      <Toaster />
      <header className="titleFormLoginRegister">To Do List</header>
      <div className="containerFormRegisterLogin">
        <div className="containerFormRegisterLogin-forms">
          <ul className="ulToggle">
            <li className="buttonLogin">Sign Up</li>
            <li className="buttonRegister">Register</li>
          </ul>
          <section className="sectionForms">
            <Login />
            <Register />
          </section>
          <section className="sectionButton">
            <input
              type="button"
              value="Register"
              id="buttonSendRegister"
              className="send-Register"
            />
            <input
              type="button"
              value="Sign Up"
              id="buttonSendLogin"
              className="send-Login"
            />
          </section>
        </div>
      </div>
      <footer className="backgroundForm">
        <img src={background} alt="bg" />
      </footer>
    </div>
  );
};

export default Form;
