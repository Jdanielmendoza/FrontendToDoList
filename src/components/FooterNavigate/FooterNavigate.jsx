import { useNavigate } from "react-router-dom";
import "./FooterNavigate.css";
import filterIcon from "/FilterIcon.svg";

const FooterNavigate = ({ setTaskUsers, taskUsers }) => {
  const navigate = useNavigate();

  const openTaskCreate = () => {
    const url = "/task";
    navigate(url);
  };

  const filterByDone= () =>{
    const taskDone = taskUsers.filter((task) => task.hecho);
    setTaskUsers(taskDone);
  }
  const filterByImportant = ()=>{
    const taskImportants = taskUsers.filter((task)=>task.importante) 
    setTaskUsers(taskImportants); 
  }
  return (
    <section className="containerFooterNavigate">
      <div className="containerFooterNavigate-FilteGroup">
        <div className="containerFilterGroup">
          <input
            type="checkbox"
            name="checkFilterActive"
            id="checkFilterActive"
          />
          <ul className="filterOptions">
            <li onClick={() =>setTaskUsers(taskUsers)}>Todo</li>
            <li onClick={filterByDone}>Tareas Hechas</li>
            <li onClick={filterByImportant}>Tareas Importantes</li>
          </ul>
          <label htmlFor="checkFilterActive" className="buttonFilterGroup">
            <img src={filterIcon} alt="" />
            <p>mostrar solo</p>
          </label>
        </div>
      </div>
      <div className="ContainerAllButtonTask">
        <div className="ContainerAllButtonTask-Up">
          <div className="ContainerAllButtonTask-Up-Fill-Left"></div>
          <div className="containerButtonTask">
            <div className="buttonTask" onClick={openTaskCreate}>
              <div className="lineButton lineButton1"></div>
              <div className="lineButton lineButton2"></div>
            </div>
          </div>
          <div className="ContainerAllButtonTask-Up-Fill-Right"></div>
        </div>
        <div className="ContainerAllButtonTask-Down"></div>
      </div>
    </section>
  );
};

export default FooterNavigate;
