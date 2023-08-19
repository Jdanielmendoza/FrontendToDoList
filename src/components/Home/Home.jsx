import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import "./Home.css";
import FooterNavigate from "../FooterNavigate/FooterNavigate";
import CardTask from "../CardTask/CardTask";
import { useState, useEffect } from "react";
import { getAllTask } from "../../apiServices/getAllTask";

const Home = () => {
  const [taskUser, setTaskUser] = useState([]);
  const [filterTask , setFilterTask] = useState([]);
  useEffect(() => {
    const tasks = async () => {
      try {
        const result = await getAllTask();
        setTaskUser(result.data);
        setFilterTask(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    tasks();
  }, []);

  return (
    <div className="containerAllHome">
      <Header />
      <div className="container_Home">
        <Nav setTaskUsers={setTaskUser} taskUsers={filterTask} />
        <div className="containerAllTask">
          {taskUser.map((task) => (
            <CardTask task={task} key={task?.id} />
          ))}
        </div>

        <FooterNavigate setTaskUsers={setTaskUser} taskUsers={filterTask} />
      </div>
    </div>
  );
};

export default Home;
