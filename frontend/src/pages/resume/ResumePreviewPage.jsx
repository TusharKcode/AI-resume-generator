import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResumeById } from "../../services/resumeService"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

const ResumePreviewPage = () => {
    const {id} = useParams();
    const [resume, setResume] = useState(null);

    
    const fetchResume = async () =>{
        try {
            if(!id) return;
            const res = await getResumeById(id);

            const data = res.data
            const sections = data.sections || []
            
            let summary = "";
            let skills = [];
            let education = [];
            let projects = [];

            sections.forEach((section) => {
                if (section.section_name === "summary") {
                    summary = section.content;
                }
                if (section.section_name === "skills") {
                    const parsed = JSON.parse(section.content || "{}")
                    skills = parsed.skills || []
                }
                if (section.section_name === "education") {
                    const parsed = JSON.parse(section.content || "{}")
                    education = parsed.education || []
                }
                if (section.section_name === "projects") {
                    const parsed = JSON.parse(section.content || "{}")
                    projects = parsed.projects || []
                }
            });

            setResume({
                ...data.resume,
                careerObjective : summary, skills, education, projects
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchResume();
    }, [id]);

    if(!resume){
        return <p>Loading...</p>
    }

    const downloadPDF = async () => {
        const element = document.getElementById("resume-preview")
        const canvas = await html2canvas(element)
        const imgData = canvas.toDataURL("image/png")
        const pdf = new jsPDF()

        const imgWidth = 190
        // const pageHeight = 295

        const imgHeight = (canvas.height * imgWidth) / canvas.width
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight)
        pdf.save("resume.pdf")
    }

    return (
        <>
        <div id='resume-preview' className='max-w-4xl mx-auto bg-white shadow p-8'>
            <h1 className="text-3xl font-bold">{resume.personalInfo?.name}</h1>
            <p>{resume.personalInfo?.email}</p>
            <p>{resume.personalInfo?.phone}</p>
            <p>{resume.personalInfo?.location}</p>

            <div className='mt-6'>
                <h2 className='text-xl font-semibold border-b pb-1'>Career Objective</h2>
                <p className='mt-2'>{resume.careerObjective}</p>
            </div>

            <div className='mt-6'>
                <h2 className='text-xl font-semibold border-b pb-1'>Skills</h2>
                <ul className='list-disc ml-5'>
                    { resume.skills?.map((skills, index) => (
                        <li key={index}>{skills}</li>
                    ))}
                </ul>
            </div>

            <div className='mt-6'>
                <h2 className='text-xl font-semibold border-b pb-1'>Education</h2>
                {resume.education?.map((edu, index) => (
                    <div key={index} className='mt-2'>
                        <p className='font-semibold'>{edu.degree}</p>
                        <p>{edu.institution}</p>
                        <p>{edu.year}</p>
                    </div>
                ))}
            </div>

            <div className='mt-6'>
                <h2 className='text-xl font-semibold border-b pb-1'>Projects</h2>
                {resume.projects?.map((project, index) => (
                    <div key={index} className='mt-2'>
                        <p className='font-semibold'>{project.title}</p>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <br />
        <button className='bg-green-600 text-white px-4 py-2 rounded mb-4' onClick={downloadPDF}>
                Download PDF
        </button>
        </>
    )
}

export default ResumePreviewPage

