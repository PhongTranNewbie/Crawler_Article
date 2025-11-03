import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Article from "./article.js";

const ArticleMedia = sequelize.define('ArticleMedia', {
    url: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("image","video"), allowNull: false },
});

Article.hasMany(ArticleMedia, { foreignKey: "articleId", onDelete: "CASCADE" });
ArticleMedia.belongsTo(Article, { foreignKey: { name: "articleId", allowNull: false } });

export default ArticleMedia;