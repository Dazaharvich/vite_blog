import { db } from "../db.js";
import bcrypt from "bcryptjs";


export const register = (req,res)=>{


    // Check existing User
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q,[req.body.email, req.body.username], (err, data) => {
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("El usuario ya existe!");
        
        //Hash the Password and create a User

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // Store hash in your password DB.

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            req.body.password,
            hash,
        ]

        db.query(q, [values], (err,data) => {
            if (err) return res.json(err);
            return res.status(200).json("El usuario ha sido creado");

        });

    });


}

export const login = (req,res)=>{
    
}

export const logout = (req,res)=>{
    
}