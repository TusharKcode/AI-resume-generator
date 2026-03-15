import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { saveResumesSection } from "../../services/resumeService";
import { generateAIContent } from "../../services/aiService"

function ResumeBuilder(){
    const navigate = useNavigate();
    const {resumeId} = useParams();
    const [summary, setSummary] = useState("");

    const [skill, setSkill] = useState([]);
    const [skills, setSkills] = useState("");

    const [degree, setDegree] = useState("");
    const [institution, setInstitution] = useState("");
    const [year, setYear] = useState("");
    const [educationList, setEducationList] = useState([]);

    const [projectTitle, setProjectTitle] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectTechStack, setProjectTechStack] = useState("");
    const [projectList, setProjectList] = useState([]);

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
        alert("Skills details saved!")
    }

    const addEducation = () => {
        if(!degree || !institution || !year) return;

        const newEducation = {
            degree, institution, year
        }

        setEducationList([...educationList, newEducation])
        setDegree("")
        setInstitution("")
        setYear("")
    }
    const saveEducation = async () => {
        await axios.post("/api/resume/education", {
            resumeId,
            education: educationList
        });
        alert("Education details saved!")
    }

    const addProject = () => {
        if (!projectTitle || !projectDescription || !projectTechStack) return;

        const newProject = {
            title: projectTitle, 
            description: projectDescription,
            techStack: projectTechStack
        }

        setProjectList([...projectList, newProject])
        setProjectTitle("")
        setProjectDescription("")
        setProjectTechStack("")
    }
    const saveProject = async () => {
        await axios.post("/api/resume/projects", {
            resumeId,
            projects: projectList
        })
        alert("Project saved successfully")
    }

    return(
        <div>
            <h2>Resume Builder</h2>
            
            <p>Resume ID: {resumeId}</p>

            {/* SUMMARY SECTION */}
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

            {/* SKILLS Detail SECTION */}
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

            {/* EDUCATION Detail SECTION */}
            <h2>Education</h2>
            <input
                placeholder="Degree" 
                value={degree} 
                onChange={(e) => setDegree(e.target.value)} />
            <input
                placeholder="Institution" 
                value={institution} 
                onChange={(e) => setInstitution(e.target.value)} />
            <input
                placeholder="Year" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} />
            <button onClick={addEducation}>Add Education</button>
            <ul>
                {educationList.map((edu, i) => (
                    <li key={i}>
                        {edu.degree} - {edu.institution} {edu.year}
                    </li>
                ))}
            </ul>
            <button onClick={saveEducation}>Save Education</button>
            <br />
            
            {/* PROJECT Detail SECTION */}
            <h2>Education</h2>
            <input
                placeholder="Project Title" 
                value={projectTitle} 
                onChange={(e) => setProjectTitle(e.target.value)} />
            <textarea
                placeholder="Project Description" 
                value={projectDescription} 
                onChange={(e) => setProjectDescription(e.target.value)} />
            <input
                placeholder="Project Tech Stack" 
                value={projectTechStack} 
                onChange={(e) => setProjectTechStack(e.target.value)} />

            <button onClick={addProject}>Add Project</button>
            <ul>
                {projectList.map((proj, i) => (
                    <li key={i}>
                        <b>{proj.title}</b> - {proj.description} ({proj.techStack})
                    </li>
                ))}
            </ul>
            <button onClick={saveProject}>Save Projects</button>

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