import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Article = sequelize.define('Article', {
    title: { type: DataTypes.TEXT, allowNull: false },
    slug: DataTypes.STRING(500),
    summary: DataTypes.TEXT,
    content: DataTypes.TEXT,
    url: { type: DataTypes.TEXT, unique: true, allowNull: false },
    published_at: DataTypes.DATE,
    crawled_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
});

export default Article;