import { Op } from "sequelize"
import Users from "../models/user";

const handleGetUsers = (userId?: string) =>{
    if (userId) {
        return Users.findAll({
            where: {
                id: {
                    [Op.not]: userId,
                },
            },
        });
    } else {
        return Users.findAll();
    }
}

export default handleGetUsers