import { useNavigate} from "react-router-dom";
import "./CardTask.css";
import Stars from "/Stars.svg";

const CardTask = ({ task }) => {
  const { titulo, descripcion, fechadeinicio, color, hecho, importante } = task;
  const colorTask = {
    pink: "#FFC2F5",
    green: "#B9FFB3",
    orange: "#FFD7C7",
    blue: "#D2E8FE",
    yellow: "#FFF6BB",
  };

  const navigate = useNavigate();

  const openTask = () => {
    const url = "/task/" + task.id;
    navigate(url,{ state : task });
  };

  return (
    <div className="containerTask" onClick={openTask}>
      <div className="task" style={{ "--color": colorTask[color] }}>
        <div className="containerTitleTask">
          <h4 className={hecho ? "taskDone" : "titleTask"}>{titulo}</h4>
          <div>{importante ? <img src={Stars} /> : ""}</div>
        </div>
        <p className={hecho ? "taskDone" : "descriptionTask"}>{descripcion}</p>
      </div>
    </div>
  );
};

export default CardTask;
