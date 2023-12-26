import { useState } from "react";
import "./CardSendRequest.css";
import userMen from "/userMen.png";
import userWomen from "/userWomen.png";
import { cancelarSolicitudDeAmistadEnviada, enviarSolicitudDeAmistad } from "../../apiServices/Friends/friends.services.js"; 

const defaultUser = {
  id: "1",
  nombre: "Jose Daniel Mendoza",
  sexo: "M",
};

const CardSendRequest = ({ usuario = defaultUser }) => {
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);

  const handleClick = async () => {
    setSolicitudEnviada((prevSolicitudEnviada) => {
      console.log(prevSolicitudEnviada);
      // Ahora puedes usar prevSolicitudEnviada en tu lógica
      if (!prevSolicitudEnviada) {
        enviarSolicitud(); 
      }else{
        cancelarSolicitud(); 
      }
      return !prevSolicitudEnviada;
    });
  };

  const enviarSolicitud = async () => {
    try {
      await enviarSolicitudDeAmistad(usuario?.id);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelarSolicitud = async () => {
    try {
     const res = await cancelarSolicitudDeAmistadEnviada(usuario?.id);
     console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerCardFriendRequest">
      <div className="containerImage">
        <img src={usuario?.sexo == "M" ? userMen : userWomen} alt="imgUser" />
      </div>
      <div className="containerDataFriend">
        <div className="dataRequestFriend">
          <p className="nameRequestFriend">{usuario.nombre}</p>
        </div>
        <div className="containerButtons-sendRequest">
          <button
            className="buttonFriend"
            style={{
              "--bg-color-request": solicitudEnviada ? "#3A3B3C" : "#0866ff",
            }}
            onClick={handleClick}
          >
            {solicitudEnviada ? "Cancelar solicitud" : "Agregar a amigos"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSendRequest;
