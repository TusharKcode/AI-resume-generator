import OpenAI from "openai"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateResumeContent = async (section, userData) => {
    const prompt = `
        Generate a professional ${section} for a resume.
        User Data: ${JSON.stringify(userData)}
        Write it professionally for recruiters.
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
            role:"user",
            content: prompt
        }]
    })

    return response.choices[0].message.content;
}