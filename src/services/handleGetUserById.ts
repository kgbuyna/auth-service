import Users from "../models/user";

const handleGetUserById = async (id: string) => {
    try {
        const user = await Users.findByPk(id); 
        if (!user) { 
            throw new Error("Хэрэглэгч олдсонгүй");
        }
        return user;
    } catch (error) {
        throw new Error(`ID алдаатай байна.`);
    }
}

export default handleGetUserById
