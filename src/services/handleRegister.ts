import { BaseError } from "sequelize";
import Users from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { UserCreationAttributes } from "../types/user";

const handleRegister = async (body:UserCreationAttributes)=>{
    try {   
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(body.password!, salt);

        console.log(process.env);
        const user = new Users({...body, 'password': hashedPassword});
        user.save()
        const {id, username} = user.dataValues;
        const token = jwt.sign(
            { id, username },
                process.env.SECRET!,
            {
                expiresIn: "3h",
            },
        );

        return {token, username};
    }
    catch (error) {
        throw new Error(`Хэрэглэгч бүртгэхэд алдаа гарлаа ${(error instanceof BaseError && error.message) || ""}`)
    }
}

export default handleRegister