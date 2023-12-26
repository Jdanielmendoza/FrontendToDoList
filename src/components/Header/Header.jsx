import "./Header.css";
import { useState } from "react";
import max from "/maximizing.svg";
import min from "/minimizing.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMax, setIsMax] = useState(document.fullscreenElement);
  const element = document.documentElement;
  const handleScreen = () => {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.log(
          `Error al intentar entrar en modo de pantalla completa: ${err.message}`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsMax(!document.fullscreenElement);
  };
  return (
    <header className="header-Title">
      <p  ><Link className="titulo-letter" to='/'>To Do List</Link></p>
      <div onClick={handleScreen} className="buttonMaxMinScreen">
        <img src={isMax ? min : max} alt="" />
      </div>
    </header>
  );
};
export default Header;
