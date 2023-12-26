import axios from "axios";

export const obtenerPersonasAConectar = async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/friend";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerSolicitudesDeAmistad = async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/friend/request";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerPersonasSugeridas = async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/friend/suggestion";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const obtenerMisAmigos = async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/friend/myfriends";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const enviarSolicitudDeAmistad = async (idAmigo) => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/friend";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    console.log(idAmigo);
    const response = await axios.post(url, { idFriend: idAmigo }, { headers });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const confirmarSolicitudDeAmistad = async (idAmigo) => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/friend";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const response = await axios.put(url, { idFriend: idAmigo }, { headers });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const cancelarSolicitudDeAmistadEnviada = async (idAmigo) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api-v1/friend/cancel?idFriend=${idAmigo}`;
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const response = await axios.delete(url, { headers });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const rechazarSolicitudDeAmistad = async (idAmigo) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api-v1/friend/denied?idFriend=${idAmigo}`;
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const response = await axios.delete(url, { headers });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const eliminarDeTuListaDeAmigos = async (idAmigo) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/api-v1/friend?idFriend=${idAmigo}`;
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const response = await axios.delete(url, { headers });
    console.log(response);
    return response?.data;
  } catch (error) {
    throw new Error(error.message);
  }
};