import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { saveResumesSection } from "../../services/resumeService";
import { generateAIContent } from "../../services/aiService"

function ResumeBuilder(){
    const navigate = useNavigate();
    const {resumeId} = useParams();
    const [summary, setSummary] = useState("");
    const [skill, setSkill] = useState([])
    const [skills, setSkills] = useState("")

    const handleGenerateAI = async () => {
        try {
            const data = await generateAIContent({
                section:"summary",
                userData: "Software developer skilled in Java, React and backend development",
                resumeId: resumeId
            })

            setSummary(data.aiText);
        } catch (error) {
            console.error(error);
            alert("AI generation failed")
        }
    }

    const handleSave = async () => {
        try {
            await saveResumesSection({
                resumeId,
                sectionName: "summary",
                content: summary
            });
            alert("Summary saved successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to save section");
        }
    }

    const addSkill = () => {
        if(skill.trim() === "") return;
        setSkills([...skills, skill])
        setSkill("")
    }
    const saveSkills = async () => {
        await axios.post("/api/resume/skills", {
            resumeId, skills
        })
        alert("Skills saved!")
    }

    return(
        <div>
            <h2>Resume Builder</h2>
            
            <p>Resume ID: {resumeId}</p>
            <h3>Professional Summary</h3>
            <textarea
                rows="6"
                cols="60"
                placeholder="Write your summary...."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <br />
            <br />
            <button onClick={handleSave}>
                Save Summary
            </button>
            <br />

            <h2>Skills Section</h2>
            <input
                type="text" 
                placeholder="Enter Skills"
                onChange={(e) => setSkill(e.target.value)}
            />
            <button onClick={addSkill}>
                Add Skills
            </button>
            <ul>
                {skills.map((s, index) => (
                    <li key={index}>{s}</li>
                ))}
            </ul>
            <button onClick={saveSkills}>Save Skills</button>

            <br />
            <button onClick={handleGenerateAI}>
                Generate with AI
            </button>

            <button onClick={() => navigate(`/resume/${resumeId}`)}>
                Review Resume
            </button>
        </div>
    )
}

export default ResumeBuilder;