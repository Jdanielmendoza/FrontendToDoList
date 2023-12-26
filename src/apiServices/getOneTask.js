import axios from "axios"

const getOneTask = () => {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/task/"
    const response = axios.get()
}

export const getOneTaskAssignedToFriends= async (idTask) => {
    try {
      const url = import.meta.env.VITE_BASE_URL + "/api-v1/taskfriend/" + idTask ;
      const headers = {
        "x-access-token": localStorage.getItem("token"),
      };
  
      const response = await axios.get(url, { headers });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };