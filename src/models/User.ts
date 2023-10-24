import sequelize from "../connections/sequelize";
import { Model, DataTypes } from "sequelize";

export interface User extends Model {
    id: number,
    name: string,
    email: string,
    profile_photo: string,
    banner_photo: string,
    password: string,
}

export const User = sequelize.define<User>('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    profile_photo: { type: DataTypes.STRING, defaultValue: 'default.jpg' },
    banner_photo: { type: DataTypes.STRING, defaultValue: 'defaultBanner.jpg' },
    password: { type: DataTypes.STRING, allowNull: false }
},
    {
        tableName: 'users',
        timestamps: false
    }
)

export default User;