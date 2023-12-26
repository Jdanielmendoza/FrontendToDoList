import { useEffect, useState } from "react";
import { obtenerPersonasSugeridas } from "../../apiServices/Friends/friends.services.js";
import Header from "../../components/Header/Header.jsx";
import CardSendRequest from "../../components/CardSendRequest/CardSendRequest.jsx";

const FriendSuggestion = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await obtenerPersonasSugeridas();
        setPersonas(res);
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
            <p>Sugerencias</p>
          </div>
          <br />
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

export default FriendSuggestion;
