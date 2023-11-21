import sequelize from "../connections/sequelize";
import { Model, DataTypes } from "sequelize";
import Post from "./Post";

export interface View extends Model {
    user_ip: string,
    post_id: number
}

export const View = sequelize.define<View>('View', {
    user_ip: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    post_id: { type: DataTypes.INTEGER, allowNull: false }
},
    {
        tableName: 'views',
        timestamps: false
    }
)
View.belongsTo(Post, { foreignKey: 'post_id' });
export default View;