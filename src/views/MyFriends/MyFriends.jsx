import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { obtenerMisAmigos } from "../../apiServices/Friends/friends.services";
import CardMyFriends from "../../components/CardMyFriends/CardMyFriends";

const MyFriends = () => {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await obtenerMisAmigos();
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
            <p>Tus amigos</p>
          </div>
          <br />
          <div className="requestFriends">
            {personas.map((user) => (
              <CardMyFriends key={user?.id} usuario={user} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyFriends;
