import sequelize from "../connections/sequelize";
import { Model, DataTypes } from "sequelize";

export interface Category extends Model {
    id: number,
    category: string
}

export const Category = sequelize.define<Category>('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    category: { type: DataTypes.STRING, allowNull: false }
},
    {
        tableName: 'categories',
        timestamps: false
    }
)

export default Category;