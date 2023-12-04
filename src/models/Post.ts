import sequelize from "../connections/sequelize";
import { Model, DataTypes } from "sequelize";
import User from "./User";

export interface Post extends Model {
    id: number,
    user_id: number,
    category_id: number,
    image: string,
    title: string,
    content: string,
    date: Date,
    status: boolean
}

export const Post = sequelize.define<Post>('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
    category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'categories', key: 'id' }, defaultValue: 4 },
    image: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: Date.now() },
    status: { type: DataTypes.BOOLEAN, defaultValue: false }
},
    {
        tableName: 'posts',
        timestamps: false
    }
)
Post.belongsTo(User, { foreignKey: 'user_id' });
export default Post;