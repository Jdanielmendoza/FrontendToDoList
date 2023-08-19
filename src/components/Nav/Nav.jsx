import "./Nav.css";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = ({ setTaskUsers, taskUsers }) => {
  const [user, setUser] = useState("ToDoList");
  useEffect(() => {
    const name = localStorage.getItem("user");
    setUser(name);
  }, []);

  const openMenu = () => {
    const navMenu = document.querySelector(".container-nav-menu");
    navMenu.classList.add("container-nav-menu-Active");
    document.querySelector(".nav-Menu").classList.add("nav-Menu-active");
  };
  const closeMenu = () => {
    const navMenu = document.querySelector(".container-nav-menu");
    navMenu.classList.remove("container-nav-menu-Active");
    document.querySelector(".nav-Menu").classList.remove("nav-Menu-active");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const filterTaskUser = (e) => {
    if (e.target.value == "") {
      setTaskUsers(taskUsers);
    } else {
      const responseFilter = taskUsers.filter((task) =>
        task.titulo.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setTaskUsers(responseFilter)
    }
  };
  return (
    <section className="container_Nav_Search">
      <div className="container_Nav_Search-div">
        <div className="container-MenuHamburguer-nav">
          <div className="MenuHamburguer" onClick={openMenu}>
            <div className="MenuBar MenuBar1"></div>
            <div className="MenuBar MenuBar2"></div>
            <div className="MenuBar MenuBar3"></div>
          </div>
          <div className="container-nav-menu">
            <nav className="nav-Menu">
              <h3 className="nav-menu-titleUser">{user}</h3>
              <details open className="detailsProfile">
                <summary>Perfil</summary>
                <div className="details">
                  <Link to={"/changePassword"} className="LinkPage">
                    cambiar contraseña
                  </Link>{" "}
                </div>
                <div className="details" onClick={logout}>
                  cerrar sesión
                </div>
              </details>
              <details open className="detailsContact">
                <summary>contácto</summary>
                <div className="details">
                  <a
                    href="https://www.linkedin.com/in/jose-daniel-mendoza-guzman-927867234/"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="details">
                  <a
                    href="https://www.instagram.com/daniel_mendoza.dev/"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </div>
                <div className="details">
                  {" "}
                  <a href="https://github.com/Jdanielmendoza" target="_blank">
                    Github
                  </a>
                </div>
              </details>
              <div className="buttonCloseNavMenu" onClick={closeMenu}>
                <img src="/arrowCloseMenu.svg" alt="arrow" />
              </div>
            </nav>
          </div>
        </div>
        <div className="container-input-Search">
          <input
            type="search"
            name=""
            id=""
            className="inputSearch"
            placeholder="Buscar tus notas"
            onChange={filterTaskUser}
          />
        </div>
      </div>
    </section>
  );
};

export default Nav;
