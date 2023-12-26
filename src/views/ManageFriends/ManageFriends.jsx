import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ManageFriends.css";
import CardFriendRequest from "../../components/CardFriendRequest/CardFriendRequest";
import CardSendRequest from "../../components/CardSendRequest/CardSendRequest";
import { useEffect, useState } from "react";
import {
  obtenerPersonasAConectar,
  obtenerSolicitudesDeAmistad,
} from "../../apiServices/Friends/friends.services.js";


const ManageFriends = () => {
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await obtenerPersonasAConectar();
        const res2 = await obtenerSolicitudesDeAmistad();
        console.log(res2);
        setPersonas(res);
        setListaSolicitudes(res2);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="containerAllSections">
      <Header />
      <div className="container-sections">
        <section className="section-friend">
          <div className="title-friend title-friend-1">
            <p>Amigos</p>
          </div>
          <div className="div-buttons-friend">
            <Link to="/friends/suggestion" className="button-friend">
              Sugerencias
            </Link>
            <Link to="/friends/myFriends" className="button-friend">
              Tus amigos
            </Link>
          </div>
        </section>
        <section className="section-friend">
          <div className="title-friend">
            <p>Solicitudes de amistad</p>
            <p className="numberFriend">{listaSolicitudes.length}</p>
          </div>

          <div className="requestFriends">
            {listaSolicitudes.map((user) => (
              <CardFriendRequest
                key={user?.id}
                usuario={user}
                fecha={user?.fecha}
              />
            ))}
          </div>
        </section>
        <section className="section-friend">
          <div className="title-friend">
            <p>Personas</p>
          </div>
          <div className="requestFriends">
            {personas.map((user) => (
              <CardSendRequest key={user?.id} usuario={user} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ManageFriends;
