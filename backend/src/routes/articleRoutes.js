import express from "express";
import { getArticles, getArticleById } from "../controllers/articleController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API for retrieving news articles
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 96
 *                   title:
 *                     type: string
 *                     example: "Loại thuyền nào tạo nên những trận thủy chiến oai hùng trong lịch sử"
 *                   slug:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   summary:
 *                     type: string
 *                     example: "Việt Nam ta có nhiều trận thủy chiến lừng lẫy trong trong mấy ngàn năm dựng và giữ nước..."
 *                   url:
 *                     type: string
 *                     example: "https://tuoitre.vn/loai-thuyen-nao-tao-nen-nhung-tran-thuy-chien-oai-hung-trong-lich-su-20251029113239416.htm"
 *                   crawled_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-29T10:30:00.665Z"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-29T10:30:00.665Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-10-29T10:30:00.665Z"
 *                   categoryId:
 *                     type: integer
 *                     nullable: true
 *                     example: null
 *                   Category:
 *                     type: object
 *                     nullable: true
 *                     example: null
 *                   ArticleMedia:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 */

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get article details by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Article ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the article details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 96
 *                 title:
 *                   type: string
 *                   example: "Loại thuyền nào tạo nên những trận thủy chiến oai hùng trong lịch sử"
 *                 summary:
 *                   type: string
 *                   example: "Việt Nam ta có nhiều trận thủy chiến lừng lẫy..."
 *                 url:
 *                   type: string
 *                   example: "https://tuoitre.vn/loai-thuyen-nao-tao-nen-nhung-tran-thuy-chien-oai-hung-trong-lich-su-20251029113239416.htm"
 *                 Category:
 *                   type: object
 *                   example: { "id": 5, "name": "Văn hóa", "slug": "van-hoa" }
 *                 ArticleMedia:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       url:
 *                         type: string
 *                         example: "https://cdn.tuoitre.vn/2025/10/29/boat.jpg"
 *                       type:
 *                         type: string
 *                         example: "image"
 *       404:
 *         description: Article not found
 */

router.get("/", getArticles);
router.get("/:id", getArticleById);

export default router;
