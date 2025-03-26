import { Optional } from "sequelize";

export interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password?: string;
    phone: string;
    profile: string;
  }

  export type UserCreationAttributes = Optional<UserAttributes, "id">;
