import { createUser, findUserByEmail } from "../models/userModel.js";
import generateToken from "../utils/generateTokens.js";
import bcrypt from "bcryptjs"

export const registerUser = (req, res) => {
    const {name, email, password} = req.body;

    findUserByEmail(email, async(err, results) => {
        if(results.length > 0){
            return res.status(400).json({message: "User already exists"})
        }

        const hashPassword = await bcrypt.hash(password, 10);

        createUser(name, email, hashPassword, (err, result) => {
            if(err){
                return res.status(500).json(err);
            } else{
                return res.status(201).json({
                    message: "User registered successfully",
                    token: generateToken(result.insertId)
                })
            }
        })
    })
}

export const loginUser = (req, res) => {
    const {email, password} = req.body;

    findUserByEmail(email, async(err, result) => {
        if(result.length === 0){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const user = result[0]
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        } else{
            return res.status(200).json({
                message:"Login Successful",
                token: generateToken(user.id)
            })
        }
    })
}