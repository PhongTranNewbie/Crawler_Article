import Article  from "../models/article.js";
import Category from "../models/category.js";
import ArticleMedia from "../models/articleMedia.js";

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({ 
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name'],
                },
                {
                    model: ArticleMedia,
                    attributes: ['id', 'url'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit: 20,
         });

        return res.status(200).json({
            success: true,
            count: articles.length,
            data: articles,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch articles",
        });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id, {
            include: [
                {
                    model: Category,
                    attributes: ['id', 'name'],
                },
                {
                    model: ArticleMedia,
                    attributes: ['id', 'url'],
                },
            ],
        });

        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Article not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch article",
        });
    }
};