import API from "./api.js";
import axios from "axios";

export const createResume = async (data) => {
    const response = await API.post("/resume/create", data);
    return response.data;
}

export const getUserResumes = async () => {
    const response = await API.get("/resume/user");
    return response.data;
}

export const saveResumesSection = async (data) => {
    const response = await API.post("/resume/section", data);
    return response.data;
}

export const getResumeById = (id) => {
    return axios.get(`/api/resume/${id}`)
}