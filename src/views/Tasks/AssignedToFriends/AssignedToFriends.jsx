import { useState, useEffect } from "react";

/* react query */
import { useQuery } from "@tanstack/react-query";
import Header from "../../../components/Header/Header.jsx";
import Nav from "../../../components/Nav/Nav.jsx";
import { getAllTaskAssignedToFriends } from "../../../apiServices/getAllTask.js";
import Loader from "../../../components/Loader/Loader.jsx"
import "./AssignedToFriends.css"; 
import CardTaskToFriends from "../CardTaskToFriends/CardTaskToFriends.jsx";

const AssignedToFriends = () => {

  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getAllTaskAssignedToFriends,
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
        <h4 id="title-tip-task">Asignadas a mis amigos</h4>
        <div className="containerAllTask">
          { isLoading? <Loader/> : taskUser.map((task) => (
            <CardTaskToFriends key={task?.id_tarea} task={task} />
          )) }
        </div>
      </div>
    </div>
  );
};

export default AssignedToFriends;
