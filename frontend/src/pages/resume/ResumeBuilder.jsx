import { useState } from "react";
import { useParams } from "react-router-dom";
import { saveResumesSection } from "../../services/resumeService";
import { generateAIContent } from "../../services/aiService"

function ResumeBuilder(){

    const {resumeId} = useParams();
    const [summary, setSummary] = useState("");

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

            <button onClick={handleSave}>
                Save Summary
            </button>

            <button onClick={handleGenerateAI}>
                Generate with AI
            </button>
        </div>
    )
}

export default ResumeBuilder;