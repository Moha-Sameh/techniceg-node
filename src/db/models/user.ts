"use strict";
import { Model } from "sequelize";

interface UserAttributes {
  name: string;
  username: string;
  password: string;
  role: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    name!: string;
    username!: string;
    password!: string;
    role!: string;
    static associate(models: any) {
      User.hasMany(models.Task, {
        foreignKey: {
          name: "creatorId",
          allowNull: false,
        },
      });
      User.hasMany(models.Task, {
        foreignKey: {
          name: "doerId",
          allowNull: true,
        },
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
