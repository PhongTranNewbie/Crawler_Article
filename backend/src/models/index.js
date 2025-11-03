import sequelize from "../config/database.js";
import Article from "./article.js";
import Category from "./category.js";
import ArticleMedia from "./articleMedia.js";

// Associations
Category.hasMany(Article, { foreignKey: "categoryId" });
Article.belongsTo(Category, { foreignKey: "categoryId", onDelete: "SET NULL" });

export { sequelize, Article, Category, ArticleMedia };