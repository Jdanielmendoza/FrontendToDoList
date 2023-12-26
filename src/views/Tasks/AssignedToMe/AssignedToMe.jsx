import { useState, useEffect } from "react";

/* react query */
import { useQuery } from "@tanstack/react-query";
import Header from "../../../components/Header/Header";
import Nav from "../../../components/Nav/Nav";
import { getAllTaskAssignedToMe } from "../../../apiServices/getAllTask.js";
import Loader from "../../../components/Loader/Loader"
import "./AssignedToMe.css"; 
import CardTaskFriend from "../CardTaskFriend/CardTaskFriend.jsx";

const AssignedToMe = () => {

  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTaskAssignedToMe,
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
      <div className="container_Home-friend">
        <Nav setTaskUsers={setTaskUser} taskUsers={filterTask} />
        <h4 id="title-tip-task">Asignadas a mi</h4>
        <div className="containerAllTask">
          { isLoading? <Loader/> : taskUser.map((task) => (
            <CardTaskFriend task={task} key={task?.id_tarea}  jijij={2} />
          )) }
        </div>
      </div>
    </div>
  );
};

export default AssignedToMe;
