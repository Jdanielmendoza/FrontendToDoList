import axios from "axios";

const deleteOneTask = async (idTask) => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/task/" + idTask;
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };
    const response = await axios.delete(url, {headers});
    return response;
  } catch (error) {
    return error;
  }
};

export default deleteOneTask;
