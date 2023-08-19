import "./MoreDetailsTask.css";
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import updateTask from "../../apiServices/updateTask";
import createTask from "../../apiServices/createTask";
import deleteOneTask from "../../apiServices/deleteOneTask";

import Stars from "/Stars.svg";
import StarsEmpty from "/starsEmpty.svg";

import trash from "/trash.svg";
import arrowBack from "/arrowBack.svg";

import icon_pallete from "/icon_pallete.svg";

const MoreDetailsTask = () => {
  const navigate = useNavigate();
  const [isActivetedUpdating, setIsActivetedUpdating] = useState(false);
  const [title, setTitle] = useState("Titulo");
  const [description, setDescription] = useState("Descripcion");
  const [colorSelected, setColorSelected] = useState("blue"); // default is blue
  const [isDone, setIsDone] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const { state } = useLocation();
  useEffect(() => {
    if (state != null) {
      setIsActivetedUpdating(true);
      setTitle(state.titulo);
      setDescription(state.descripcion);

      if (state.hecho) {
        setIsDone(true);
      }
      if (state.importante) {
        setIsImportant(true);
      }
      const colorSelect = state?.color;
      if (colorSelect) {
        setColorSelected(colorSelect);
      }
    }
  }, []);

  const colorTask = {
    pink: "#FFC2F5",
    green: "#B9FFB3",
    orange: "#FFD7C7",
    blue: "#D2E8FE",
    yellow: "#FFF6BB",
  };

  const sendTask = async () => {
    const buttonSaved = document.getElementById("buttonSendTask");
    buttonSaved.classList.add("disableButtonSubmit");

    const newTask = {
      id: state?.id,
      Titulo: title,
      Descripcion: description,
      Color: colorSelected,
      Hecho: isDone,
      Importante: isImportant,
    };
    if (isActivetedUpdating) {
      try {
        const response = updateTask(newTask);
        await toast.promise(response, {
          loading: "cargando",
          success: "actualizado",
          error: "ocurrio algun error",
        });
      } catch (error) {
        console.log(error);
        //toast.error("ocurrio algun error!");
      } finally {
        setTimeout(() => {
          navigate(-1);
        }, 800);
      }
    } else {
      try {
        const response = createTask(newTask);
        await toast.promise(response, {
          loading: "cargando",
          success: "creado!",
          error: "ocurrio algun error!",
        });
      } catch (error) {
        console.log(error);
        toast.error("ocurrio algun error!");
      } finally {
        setTimeout(() => {
          navigate(-1);
        }, 800);
      }
    }
  };

  const confirmDeleteTask = () => {
    Swal.fire({
      title: "estas seguro?",
      text: "no podras revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteTask = async () => {
          try {
            console.log(state.id);
            const response = await deleteOneTask(state?.id);
            navigate(-1);
            Swal.fire("Deleted!", "Se elimino la nota!", "success");
          } catch (error) {
            console.log(error);
          }
        };
        deleteTask();
      }
    });
  };

  return (
    <div className="containerMoreDetailsTask">
      <Toaster />
      <Header />
      <nav className="nav_exit_back">
        <img
          src={arrowBack}
          alt="back"
          onClick={() => {
            navigate(-1);
          }}
        />
        {isActivetedUpdating ? (
          <img
            src={trash}
            alt=""
            className="trash"
            onClick={confirmDeleteTask}
          />
        ) : (
          <h3 className="newNote">nueva nota</h3>
        )}
      </nav>

      <div className="ContainerFormEditingTask">
        <div className="formEditinTask">
          <input
            style={{ "--color": colorTask[colorSelected] }}
            className="formEditing_Title"
            type="text"
            value={title}
            onChange={() => {
              setTitle(document.querySelector(".formEditing_Title").value);
            }}
          />
          <textarea
            style={{ "--color": colorTask[colorSelected] }}
            className="formEditing_Description"
            value={description}
            onChange={() => {
              setDescription(
                document.querySelector(".formEditing_Description").value
              );
            }}
          />
        </div>
      </div>

      <div className="ContainerColorPalett">
        <div className="colorPallets_icon">
          <img src={icon_pallete} alt="icon" />
        </div>
        <section className="containerColorsChoose">
          <div
            className="colorChosse colorChosse1"
            id={colorSelected == "blue" ? "active" : ""}
            onClick={() => {
              setColorSelected("blue");
            }}
          ></div>
          <div
            className="colorChosse colorChosse2"
            id={colorSelected == "orange" ? "active" : ""}
            onClick={() => {
              setColorSelected("orange");
            }}
          ></div>
          <div
            className="colorChosse colorChosse3"
            id={colorSelected == "yellow" ? "active" : ""}
            onClick={() => {
              setColorSelected("yellow");
            }}
          ></div>
          <div
            className="colorChosse colorChosse4"
            id={colorSelected == "pink" ? "active" : ""}
            onClick={() => {
              setColorSelected("pink");
            }}
          ></div>
          <div
            className="colorChosse colorChosse5"
            id={colorSelected == "green" ? "active" : ""}
            onClick={() => {
              setColorSelected("green");
            }}
          ></div>
        </section>
      </div>

      <div
        className="containerMarkImportant"
        onClick={() => {
          setIsImportant(!isImportant);
        }}
      >
        <div className="MarkImportant">
          <input
            type="button"
            value="marcar como importante"
            className="inputIsImportantTask"
          />
          <img
            src={isImportant ? Stars : StarsEmpty}
            alt="star"
            className="selectedStarsMark"
          />
        </div>
      </div>

      <div
        className="containerMarkDone"
        onClick={() => {
          setIsDone(!isDone);
        }}
      >
        <div className="markDone">
          <input
            type="button"
            value="marcar como hecho"
            className="inputIsDoneTask"
          />
          <div className={isDone ? "isDone" : "notIsDone"}></div>
        </div>
      </div>

      <div className="containerButtonSubmitTask">
        <input type="button" value="Guardar" onClick={sendTask} id='buttonSendTask'/>
      </div>
    </div>
  );
};

export default MoreDetailsTask;
