import API from "./api";

export const generateAIContent = async (data) => {
    const response = await API.post("/ai/generate", data)
    return response.data;
}