"use strict";
import { Model } from "sequelize";

interface TaskAttributes {
  status: string;
  title: string;
  description: string;
  price: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Task extends Model<TaskAttributes> implements TaskAttributes {
    status!: string;
    title!: string;
    description!: string;
    price!: string;
    static associate(models: any) {
      Task.belongsTo(models.User, {
        foreignKey: {
          name: "creatorId",
          allowNull: false,
        },
      });
      Task.belongsTo(models.User, {
        foreignKey: {
          name: "doerId",
          allowNull: true,
        },
      });
    }
  }
  Task.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
