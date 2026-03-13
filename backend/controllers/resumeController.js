import { createResumeModel, getUserResumesModel } from "../models/resumeModel.js";
import { saveSectionModel } from "../models/sectionModel.js";

export const createResume = (req, res) => {
    const userId = req.user.id;
    const {title, template} = req.body

    createResumeModel(userId, title, template, (err, result) => {
        if(err){
            return res.status(500).json(err);
        } else{
            return res.status(201).json({
                message: "Resume Created",
                resumeId: result.insertId
            });
        }
    });
};

export const getUserResumes = (req, res) => {
    const userId = req.user.id;

    getUserResumesModel(userId, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json(results);
        }
    });
};

export const saveResumeSection = (req, res) => {
    const { resumeId, sectionName, content } = req.body;

    saveSectionModel(resumeId, sectionName, content, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        } else {
            return res.status(200).json({
                message:"Section saved"
            });
        }
    });
};

export const getResumeById = async (req, res) =>{
    try {
        const {id} = req.params;
        const [rows] = await db.query(
            "SELECT * FROM resumes WHERE id = ?",
            [id]
        )

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message:"Error fetching resume"
        })
    }
}

export const saveSkills = async (req, res) => {
    try {
        const [resumeId, skills] = req.body
        const content = JSON.stringify({skills})
        await db.query(
            `INSERT INTO resumes_sections (resume_id, section_name, content)
            VALUES (?, 'skills', ?)
            ON DUPLICATE KEY UPDATE content = ?`,
            [resumeId, content, content]
        );

        res.json({
            message: "Skills saved successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Error saving skills"
        })
    }
}