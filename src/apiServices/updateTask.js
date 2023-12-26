import axios from 'axios'

const updateTask =async (newTask) => {
    
    try {
        const url = import.meta.env.VITE_BASE_URL + "/api-v1/task/" + newTask.id; 
        const headers = {
            'x-access-token': localStorage.getItem('token')
        }
        const response = await axios.put(url,newTask,{headers});
        return response
    } catch (error) {
       console.log(error);
        return error
    }
}

export const updateTaskForFriends =async (newTask) => {
    
    try {
        const url = import.meta.env.VITE_BASE_URL + "/api-v1/taskfriend/" + newTask.id; 
        const headers = {
            'x-access-token': localStorage.getItem('token')
        }
        const response = await axios.put(url,newTask,{headers});
        return response
    } catch (error) {
       console.log(error);
        return error
    }
}

export const apiUpdateTaskAssignedToMe =async (newTask) => {
   // console.log("update task assigned to me ");
   // console.log(newTask);
    try {
        const url = import.meta.env.VITE_BASE_URL + "/api-v1/taskassignedtome/" + newTask.id; 
        const headers = {
            'x-access-token': localStorage.getItem('token')
        }
        const response = await axios.put(url,newTask,{headers});
       // console.log(response);
        return response
    } catch (error) {
       console.log(error);
        return error
    }
}



export default updateTask;