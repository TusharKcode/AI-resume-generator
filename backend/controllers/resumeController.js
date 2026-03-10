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