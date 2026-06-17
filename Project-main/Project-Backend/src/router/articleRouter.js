import express from 'express'
import {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticle
} from '../controllers/articleControllers.js'
import { requireAuth, requireRole } from '../middleware/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     tags:
 *       - Articles
 *     responses:
 *       200:
 *         description: Article list
 */
router.get('/', getArticles)

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get article by id
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article detail
 *       404:
 *         description: Article not found
 */
router.get('/:id', getArticleById)

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create article
 *     tags:
 *       - Articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article created
 */
router.post('/', requireAuth, requireRole(['Admin']), createArticle)

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Delete article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article deleted
 *       404:
 *         description: Article not found
 */
router.delete('/:id', requireAuth, requireRole(['Admin']), deleteArticle)

export default router
