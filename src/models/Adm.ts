import sequelize from "../connections/sequelize";
import { Model, DataTypes } from "sequelize";

export interface Adm extends Model {
    id: number,
    name: string,
    email: string,
    passowrd: string,
}

export const Adm = sequelize.define<Adm>('Adm', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
},
    {
        tableName: 'adms',
        timestamps: false
    }
)

export default Adm;