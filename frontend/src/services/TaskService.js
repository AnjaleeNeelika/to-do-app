import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

export const getAllTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const getRecentIncompleteTasks = async () => {
    const response = await axios.get(`${API_URL}/recent-tasks`);
    return response.data;
};

export const createTask = async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data;
};

export const markAsCompleted = async (taskId) => {
    const response = await axios.patch(`${API_URL}/${taskId}/complete`);
    return response.data;
}