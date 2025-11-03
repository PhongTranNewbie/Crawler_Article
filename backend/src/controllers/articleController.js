import Article  from "../models/article.js";
import Category from "../models/category.js";
import ArticleMedia from "../models/articleMedia.js";

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ 
            include: [Category, ArticleMedia],
            order: [['createdAt', 'DESC']],
            limit: 20,
         });
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch articles" });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: "Article not found" });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch article" });
    }
}