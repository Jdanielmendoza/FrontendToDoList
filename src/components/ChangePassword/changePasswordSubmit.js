import toast from "react-hot-toast";
import axios from "axios";

const config = {
  duration: 3000,
  position: "top-center",
};

export const submitChangePassword = async () => {
  const buttonchangePassword = document.getElementById("buttonSendRegister");
  buttonchangePassword.classList.add("disableButtonSubmit");

  const oldPassword = document.getElementById("usernameRegister").value;
  const newPassword = document.getElementById("passwordRegister").value;
  const newPasswordRepeat = document.getElementById("passwordRepeat").value;
  if (oldPassword.length > 4) {
    if (oldPassword.length < 25) {
      if (newPassword.length > 4) {
        if (newPassword == newPasswordRepeat) {
          try {
            const url = import.meta.env.VITE_BASE_URL + "/api-v1/user";
            const headers = {
              "x-access-token": localStorage.getItem("token"),
            };

            const data = axios.put(url, { newPassword }, { headers });
            await toast.promise(data, {
              loading: "loading",
              success: "exito!",
              error: "error!"
            });
            setTimeout(() => {
              buttonchangePassword.classList.remove("disableButtonSubmit");
              window.location.href = "/";
            }, 2000);
          } catch (error) {
            console.log(error);
            buttonchangePassword.classList.remove("disableButtonSubmit");
          }
        } else {
          toast.error("new passwords don't match", config);
          buttonchangePassword.classList.remove("disableButtonSubmit");
        }
      } else {
        toast.error("password should be at least 5 characters", config);
        buttonchangePassword.classList.remove("disableButtonSubmit");
      }
    } else {
      toast.error("very long password");
      buttonchangePassword.classList.remove("disableButtonSubmit");
    }
  } else {
    toast.error("very short password", config);
    buttonchangePassword.classList.remove("disableButtonSubmit");
  }
};
