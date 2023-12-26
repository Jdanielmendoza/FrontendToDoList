import "./MoreDetailsTask.css";
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

import updateTask, {
  apiUpdateTaskAssignedToMe,
  updateTaskForFriends,
} from "../../apiServices/updateTask";
import createTask from "../../apiServices/createTask";
import deleteOneTask from "../../apiServices/deleteOneTask";

import Stars from "/Stars.svg";
import StarsEmpty from "/starsEmpty.svg";

import trash from "/trash.svg";
import arrowBack from "/arrowBack.svg";

import icon_pallete from "/icon_pallete.svg";
import clockTimer from "/clockPomodoro.svg";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { obtenerMisAmigos } from "../../apiServices/Friends/friends.services.js";
import { getOneTaskAssignedToFriends } from "../../apiServices/getOneTask.js";

const userDefaultAssginedTask = { value: localStorage.getItem("id") };

const MoreDetailsTask = () => {
  const navigate = useNavigate();
  const [isActivetedUpdating, setIsActivetedUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [colorSelected, setColorSelected] = useState("blue"); // default is blue
  const [isDone, setIsDone] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [personasAsignadas, setPersonasAsignadas] = useState([]);
  const [friendsOptions, setFriendsOptions] = useState([]);
  const [isToAssigned, setIsToAssigned] = useState(false);
  const [isToUpdateAssigned, setIsToUpdateAssigned] = useState(false);
  const [defaultUsersOptions, setDefaultUsersOptions] = useState([]);
  const [isLoadingUsersDefault, setIsLoadingUsersDefault] = useState(true);
  const [isToUpdateTaskAssignedToMe, setIsToUpdateTaskAssignedToMe] =
    useState(false);

  const { state } = useLocation();
  const location = useLocation();

  const animatedComponents = makeAnimated();

  useEffect(() => {
    // console.log(state);
    if (state != null) {
      //quiere decir que voy a actualizar una tarea o asignar una tarea
      if (state?.asignarTarea) {
        //entonces voy a asignar una tarea
        setIsToAssigned(true);
        setIsLoadingUsersDefault(false);
        loadOptions();
      } else {
        if (state?.actualizarTareaParaAmigos) {
          setIsToUpdateAssigned(true);
          loadOptions();
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
          const defaultFriendsAssigned = async () => {
            try {
              const usersAssignedOptions = [];
              const response = await getOneTaskAssignedToFriends(
                state.id_tarea
              );
              const assignedUsers = response.data;

              assignedUsers.forEach((user) => {
                usersAssignedOptions.push({
                  value: user.id,
                  label: user.nombre,
                });
              });
              setPersonasAsignadas(usersAssignedOptions);
              setDefaultUsersOptions(usersAssignedOptions);
              setIsLoadingUsersDefault(false);
            } catch (error) {
              console.log(error);
            }
          };
          defaultFriendsAssigned();
        } else {
          if (state?.soloVerTareaAsignadaAMi) {
            setIsToUpdateTaskAssignedToMe(true);
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
          } else {
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
        }
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
      personas_tareas: [],
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
      if (isToAssigned) {
        if (personasAsignadas.length == 0) {
          toast.error("asigna la tarea a un amigo!");
          buttonSaved.classList.remove("disableButtonSubmit");
        } else {
          try {
            const response = createTask({
              ...newTask,
              personas_tareas: personasAsignadas,
            });
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
      } else {
        if (isToUpdateAssigned) {
          //actualizar una tarea asignada a mis amigos
          if (personasAsignadas.length == 0) {
            toast.error("asigna la tarea al menos a un amigo!");
            buttonSaved.classList.remove("disableButtonSubmit");
          } else {
            try {
              
              const response = updateTaskForFriends({
                ...newTask,
                id: state?.id_tarea,
                personas_tareas: personasAsignadas,
              });
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
          }
        } else {
          if (isToUpdateTaskAssignedToMe) {
            try {
              const response = apiUpdateTaskAssignedToMe({
                ...newTask,
                id: state?.id_tarea,
                idFriend: state.id,
                personas_tareas: [userDefaultAssginedTask],
              });
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
            // entonces es para crear una tarea para mi
            try {
              const response = createTask({
                ...newTask,
                personas_tareas: [userDefaultAssginedTask],
              });
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
        }
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
            const taskId = location.pathname.split("/").pop();
            const response = await deleteOneTask(taskId);
            // console.log(response);
            navigate(-1);
            Swal.fire("Deleted!", "Se elimino la tarea!", "success");
          } catch (error) {
            console.log(error);
          }
        };
        deleteTask();
      }
    });
  };

  const loadOptions = async (inputValue, callback) => {
    try {
      // Llama a obtenerMisAmigos para obtener las opciones de manera asíncrona
      const amigos = await obtenerMisAmigos();
      const options = amigos.map((amigo) => {
        return { label: amigo?.nombre, value: amigo?.id };
      });
      setFriendsOptions(options);
    } catch (error) {
      console.error("Error al cargar opciones:", error);
    }
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
        ) : isToUpdateAssigned ? (
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

      {(isToAssigned || isToUpdateAssigned) && !isLoadingUsersDefault && (
        <div className="div-select-container">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={friendsOptions}
            className="select-friend-task"
            styles={{
              control: (styles) => {
                return { ...styles, backgroundColor: "#2C2E30", width: "100%" };
              },
              input: (styles) => {
                return { ...styles, color: "#E4E6EB" };
              },
            }}
            onChange={(event) => setPersonasAsignadas(event)}
            defaultValue={defaultUsersOptions}
          />
        </div>
      )}

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
            placeholder="Titulo"
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
            placeholder="Descripcion"
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

      {isActivetedUpdating && (
        <div
          className="ContainerDoPomodoro"
          onClick={() => {
            navigate("pomodoro");
          }}
        >
          <div className="DoPomodoro">
            <p>Hacer con Pomodoro</p>
            <img src={clockTimer} alt="Clock" />
          </div>
        </div>
      )}

      <div className="containerButtonSubmitTask">
        <input
          type="button"
          value="Guardar"
          onClick={sendTask}
          id="buttonSendTask"
        />
      </div>
    </div>
  );
};

export default MoreDetailsTask;
