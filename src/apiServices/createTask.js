import axios from "axios";

const createTask = async (newTask) => {
  try {
    const url = import.meta.env.VITE_BASE_URL + "/api-v1/task"; 
    const headers = { 
        'x-access-token' : localStorage.getItem('token')
    }
    const response = await axios.post(url, newTask, {headers});
    return response; 
  } catch (error) {
    return error;
  }
};



export default createTask; 