import Groq from "groq-sdk";
import dotenv from "dotenv"

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GroqAI_API_KEY
})

export const generateAiContent = async (section, userData) => {
    const prompt = `
        Generate a professional ${section} for a resume.
        User Details: 
        Name: ${userData.name}
        Role: ${userData.role}
        Skills: ${userData.skills}
        Experience: ${userData.experience}
        Write it professionally for a resume.
    `;

    const response = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [{
            role:"user",
            content: prompt
        }],
        temperature: 0.7
    })

    return response.choices[0].message.content;
}