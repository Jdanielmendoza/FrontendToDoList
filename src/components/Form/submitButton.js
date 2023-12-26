import toast from "react-hot-toast";
import axios from "axios";

const config = {
  duration: 3000,
  position: "top-center",
};

export const handleRegister = async () => {
  const buttonRegister = document.getElementById("buttonSendRegister");
  const buttonLogin = document.getElementById("buttonSendLogin");
  buttonRegister.classList.add("disableButtonSubmit");
  buttonLogin.classList.add("disableButtonSubmit");

  const name = document.getElementById("usernameRegister").value;
  const password = document.getElementById("passwordRegister").value;
  const passwordRepeat = document.getElementById("passwordRepeat").value;
  const sexoSeleccionado = document.getElementById("selectSexo").value ;
  if (name.length > 3) {
    if (name.length < 25) {
      if (password.length > 4) {
        if (password == passwordRepeat) {
          const dataNewUser = {
            name,
            password,
            sexo : sexoSeleccionado
          };

          try {
            const url = import.meta.env.VITE_BASE_URL + "/api-v1/auth/register";
            const response = axios.post(url, dataNewUser);
            //toast.success("user register");
            await toast.promise(response, {
              loading: "loading",
              success: "successful registration",
              error: "error",
            });
            buttonRegister.classList.remove("disableButtonSubmit");
            buttonLogin.classList.remove("disableButtonSubmit");
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
            buttonRegister.classList.remove("disableButtonSubmit");
            buttonLogin.classList.remove("disableButtonSubmit");
          }
        } else {
          toast.error("Passwords don't match", config);
          buttonRegister.classList.remove("disableButtonSubmit");
        buttonLogin.classList.remove("disableButtonSubmit"); 
        }
      } else {
        toast.error("password should be at least 5 characters", config);
        buttonRegister.classList.remove("disableButtonSubmit");
        buttonLogin.classList.remove("disableButtonSubmit"); 
      }
    } else {
      toast.error("very long userName");
      buttonRegister.classList.remove("disableButtonSubmit");
        buttonLogin.classList.remove("disableButtonSubmit"); 
    }
  } else {
    toast.error("very short userName", config);
    buttonRegister.classList.remove("disableButtonSubmit");
        buttonLogin.classList.remove("disableButtonSubmit"); 
  }
};

export const handleLogin = async () => {
  const buttonRegister = document.getElementById("buttonSendRegister");
  const buttonLogin = document.getElementById("buttonSendLogin");
  buttonRegister.classList.add("disableButtonSubmit");
  buttonLogin.classList.add("disableButtonSubmit");

  const userName = document.getElementById("usernameLogin").value;
  const password = document.getElementById("passwordLogin").value;
  if (userName.length > 3) {
    if (password.length > 4) {
      const dataUser = {
        name: userName,
        password,
      };

      try {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const url = baseUrl + "/api-v1/auth/login";
        const data = axios.post(url, dataUser);
        const response = await toast.promise(data, {
          loading: "loading",
          success: "success",
          error: "error",
        });

        //console.log(response);
        buttonRegister.classList.remove("disableButtonSubmit");
        buttonLogin.classList.remove("disableButtonSubmit");

        localStorage.setItem("token", response.data?.token);
        localStorage.setItem("id", response.data?.id);
        localStorage.setItem("user", response.data?.name);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
        buttonRegister.classList.remove("disableButtonSubmit");
        buttonLogin.classList.remove("disableButtonSubmit");
        const messageError = error.response?.data?.message;
        toast.error(messageError, config);
      }
    } else {
      buttonRegister.classList.remove("disableButtonSubmit");
      buttonLogin.classList.remove("disableButtonSubmit");
      toast.error("password should be at least 5 characters", config);
    }
  } else {
    buttonRegister.classList.remove("disableButtonSubmit");
    buttonLogin.classList.remove("disableButtonSubmit");
    toast.error("very short userName", config);
  }
};
