import axios from "axios";

export const getAllTask = async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/task";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getAllTaskAssignedToMe = async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/tasksassignedtome";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllTaskAssignedToFriends= async () => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/taskfriend";
    const headers = {
      "x-access-token": localStorage.getItem("token"),
    };

    const response = await axios.get(url, { headers });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};