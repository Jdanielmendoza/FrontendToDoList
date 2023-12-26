import { useState } from "react";
import userMen from "/userMen.png";
import userWomen from "/userWomen.png";
import { cancelarSolicitudDeAmistadEnviada, eliminarDeTuListaDeAmigos } from "../../apiServices/Friends/friends.services.js";

const defaultUser = {
  id: "1",
  nombre: "Jose Daniel Mendoza",
  sexo: "M",
};

const CardMyFriends = ({ usuario = defaultUser }) => {
  const [solicitudCancelada, setSolicitudCancelada] = useState(false);
  const [removeFriend, setRemoveFriend] = useState(false);

  const cancelRequest = async () => {
    setSolicitudCancelada(true);
    try {
      const res = await cancelarSolicitudDeAmistadEnviada(usuario?.id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFriendList =async () => {
    setRemoveFriend(true);
    try {
      const res = await eliminarDeTuListaDeAmigos(usuario?.id);
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
          {usuario.estado_solicitud == "pendiente" ? (
            <button
              className="buttonFriend"
              style={{
                "--bg-color-request": solicitudCancelada
                  ? "#3A3B3C"
                  : "#3A3B3C",
              }}
              onClick={solicitudCancelada ? () => {} : cancelRequest}
            >
              {solicitudCancelada
                ? "se cancelo la solitud..."
                : "Cancelar solicitud"}
            </button>
          ) : (
            <button
              className="buttonFriend"
              style={{
                "--bg-color-request": solicitudCancelada
                  ? "#3A3B3C"
                  : "#3A3B3C",
              }}
              onClick={removeFriend ? () => {} : removeFromFriendList}
            >
              {removeFriend ? "se elimino de tus amigos..." : "Eliminar"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardMyFriends;
