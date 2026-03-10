import db from "../config/db.js"

export const saveSectionModel = (resumeId, sectionName, content, callback) => {
    const sql = "INSERT INTO resume_sections (resume_id, section_name, content) VALUES (?, ?, ?)";
    db.query(sql, [resumeId, sectionName, JSON.stringify(content)], callback);
}