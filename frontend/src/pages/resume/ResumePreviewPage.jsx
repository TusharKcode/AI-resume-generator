import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResumeById } from "../../services/resumeService"

const ResumePreviewPage = () => {
    const {id} = useParams();
    const [resume, setResume] = useState(null);

    
    const fetchResume = async () =>{
        try {
            if(!id) return;
            const res = await getResumeById(id);
            setResume(res.data)
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

    return (
        <div className='max-w-4xl mx-auto bg-white shadow p-8'>
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
    )
}

export default ResumePreviewPage

