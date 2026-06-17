import { query } from './db.js'

const mapArticleRow = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description || '',
  image: row.image || '',
  content: row.content || '',
  createdAt: row.created_at || null,
  updatedAt: row.updated_at || null
})

export const getArticles = async (req, res) => {
  try {
    const rows = await query('SELECT * FROM articles ORDER BY id DESC')
    res.json(rows.map(mapArticleRow))
  } catch (error) {
    console.error('Get articles failed:', error)
    res.status(500).json({ message: error.message })
  }
}

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params
    const rows = await query('SELECT * FROM articles WHERE id = ?', [id])

    if (!rows.length) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json(mapArticleRow(rows[0]))
  } catch (error) {
    console.error('Get article by id failed:', error)
    res.status(500).json({ message: error.message })
  }
}

export const createArticle = async (req, res) => {
  try {
    const { title, description, image, content } = req.body

    if (!title || !content) {
      return res.status(400).json({
        message: 'title and content are required'
      })
    }

    const result = await query(
      'INSERT INTO articles (title, description, image, content) VALUES (?, ?, ?, ?)',
      [title, description || '', image || '', content]
    )

    const rows = await query('SELECT * FROM articles WHERE id = ?', [result.insertId])
    res.status(201).json({
      message: 'Article created successfully',
      data: rows.length ? mapArticleRow(rows[0]) : null
    })
  } catch (error) {
    console.error('Create article failed:', error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params
    const result = await query('DELETE FROM articles WHERE id = ?', [id])

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Article not found' })
    }

    res.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Delete article failed:', error)
    res.status(500).json({ message: error.message })
  }
}

export const ensureArticleSchema = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS articles (
      id INT NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT NULL,
      image TEXT NULL,
      content LONGTEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
  `)
}
