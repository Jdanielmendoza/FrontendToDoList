const toggleForm = () => {
    const buttonLogin = document.querySelector(".buttonLogin");
    const buttonRegister = document.querySelector(".buttonRegister");
    const containerForms = document.querySelector(".sectionForms");
    const sendLogin = document.getElementById("buttonSendLogin");
    const sendRegister = document.getElementById("buttonSendRegister");

    buttonLogin.style.textDecoration = "underline";

    buttonRegister.addEventListener("click", function () {
      buttonRegister.style.textDecoration = "underline";
      buttonLogin.style.textDecoration = "none";
      const lastElement = containerForms.lastElementChild;
      lastElement.scrollIntoView({ behavior: "smooth" });

      sendRegister.classList.add("active-send-Register");
      sendLogin.classList.remove("active-send-Login");
    });

    buttonLogin.addEventListener("click", function () {
      buttonRegister.style.textDecoration = "none";
      buttonLogin.style.textDecoration = "underline";
      const firstElement = containerForms.firstElementChild;
      firstElement.scrollIntoView({ behavior: "smooth" });

      sendLogin.classList.add("active-send-Login");
      sendRegister.classList.remove("active-send-Register");
    });
  };

  export default toggleForm ; 