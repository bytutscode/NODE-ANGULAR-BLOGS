import sequelize from "../connections/sequelize";
import { Model, DataTypes } from "sequelize";

export interface View extends Model {
    user_ip: string,
    post_id: number
}

export const View = sequelize.define<View>('View', {
    user_ip: { type: DataTypes.STRING, allowNull: false },
    post_id: { type: DataTypes.INTEGER, allowNull: false }
},
    {
        tableName: 'views',
        timestamps: false
    }
)

export default View;