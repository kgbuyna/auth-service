import { DataTypes, Model } from "sequelize";

import { UserAttributes, UserCreationAttributes } from "../types/user";

import { sequelizer} from "../db/connect";


export default class Users extends Model<
  UserAttributes,
  UserCreationAttributes
> {}

Users
  .init(
    {
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      id: {
        primaryKey: true,
        type: DataTypes.UUID,  
        defaultValue: DataTypes.UUIDV1
      },
    },
    {
      sequelize: sequelizer,
      modelName: "Users",
    },
  );
