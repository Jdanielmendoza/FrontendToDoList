import Header from "../Header/Header";
import Nav from "../Nav/Nav";
import "./Home.css";
import FooterNavigate from "../FooterNavigate/FooterNavigate";
import CardTask from "../CardTask/CardTask";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import { getAllTask } from "../../apiServices/getAllTask";


/* react query */
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  /* useEffect(() => {
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
  }, []); */
  
  // Queries
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTask,
  })
  
  const [taskUser, setTaskUser] = useState([]);
  const [filterTask, setFilterTask] = useState([]);
  
  useEffect(() => {
    if (!isLoading && !isError) {
      setTaskUser(data.data);
      setFilterTask(data.data);
    }
  }, [isLoading, isError, data]);
  
  /* if (isLoading) {
    return <Loader/>
  } */
  
  if (isError) {
    return <span>Error: {error.message}</span>
  }
  
  //console.log(data.data);
  
  return (
    <div className="containerAllHome">
      <Header />
      <div className="container_Home">
        <Nav setTaskUsers={setTaskUser} taskUsers={filterTask} />
        <div className="containerAllTask">
          { isLoading? <Loader/> : taskUser.map((task) => (
            <CardTask task={task} key={task?.id}  jijij={2} />
          )) }
        </div>
        <FooterNavigate setTaskUsers={setTaskUser} taskUsers={filterTask} />
      </div>
    </div>
  );
};

export default Home;
