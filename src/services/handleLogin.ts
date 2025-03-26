import Users from "../../models/user.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const handleLogin = async (
    providedPassword: string,
    username: string,
  ) => {
    const user = await Users.findOne({
      where: {
        username: username,
      },
    });
  
    if (!user) {
      throw new Error("Бүртгэлгүй хэрэглэгч байна");
    }
  
    const userData = user.dataValues;
    if (!bcrypt.compareSync(providedPassword, userData.password!)) {
      throw new Error("Нууц үг бүруу");
    }
  
    const token = jwt.sign(
      { id: userData.id, username: userData.username },
        process.env.SECRET || "error",
      {
        expiresIn: "3h", 
      },
    );
  
    return token;
  };