import { useState } from "react";
import "./CardFriendRequest.css";
import userMen from "/userMen.png";
import userWomen from "/userWomen.png";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { confirmarSolicitudDeAmistad, rechazarSolicitudDeAmistad } from "../../apiServices/Friends/friends.services.js";
const defaultUser = {
  id: "1",
  nombre: "Jose Daniel Mendoza",
  sexo: "M",
};

const CardFriendRequest = ({ usuario = defaultUser, fecha = "1 sem" }) => {
  const [confirmado, setConfirmado] = useState(false);
  const [eliminado, setEliminado] = useState(false);

  const formattedDistance = formatDistanceToNow(new Date(fecha), {
    addSuffix: true,
    locale: es,
    includeSeconds: true,
  });

  // Personaliza la presentación del tiempo
  const fechaFns = formattedDistance
    .replace(/hace/, "")
    .replace(/alrededor/, "")
    .replace(/de/, "")
    .replace(/segundos?/, "seg")
    .replace(/minutos?/, "min")
    .replace(/horas?/, "hor...")
    .replace(/días?/, "día")
    .replace(/semanas?/, "sem")
    .replace(/meses?/, "mes")
    .replace(/años?/, "año")
    .trim();

  const handleEliminar =async () => {
    setEliminado(true);
    try {
      const res = await rechazarSolicitudDeAmistad(usuario?.id);
      console.log(res);
     } catch (error) {
       console.log(error);
     }
  };

  const handleConfirmado = async() => {
    setConfirmado(true);
    try {
      const res = await confirmarSolicitudDeAmistad(usuario?.id);
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
          <p className="fechaSolicitud-friend">{fechaFns}</p>
        </div>
        <div className="containerButtons">
          {confirmado ? (
            "Ahora son amigos"
          ) : eliminado ? (
            "Solicitud eliminada"
          ) : (
            <>
              <button
                className="buttonFriend buttonFriend-confirm"
                onClick={handleConfirmado}
              >
                Confirmar
              </button>

              <button
                className="buttonFriend buttonFriend-confirm2 "
                onClick={handleEliminar}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardFriendRequest;
