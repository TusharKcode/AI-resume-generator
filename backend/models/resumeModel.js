import db from "../config/db.js"

export const createResumeModel = (user_id, title, template, callback) => {
    const sql = "INSERT INTO resumes (user_id, title, template_name) VALUES (?, ?, ?)";
    db.query(sql, [user_id, title, template], callback)
}

export const getUserResumesModel = (user_id, callback) => {
    const sql = "SELECT * FROM resumes WHERE user_id = ?";
    db.query(sql, [user_id], callback);
}