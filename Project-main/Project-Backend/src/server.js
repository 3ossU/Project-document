import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import userRouter from './router/userRouter.js'
import adminRouter from './router/adminRouter.js'
import articleRouter from './router/articleRouter.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import router from './router/Mainrouter.js'
import { ensurePropertySchema } from './controllers/propertyControllers.js'
import { ensureArticleSchema } from './controllers/articleControllers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadDir = path.join(__dirname, '../uploads')
const documentDir = path.join(__dirname, '../documents')

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

if (!fs.existsSync(documentDir)) {
  fs.mkdirSync(documentDir, { recursive: true })
}

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(uploadDir))
app.use('/documents', express.static(documentDir))

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(documentDir, req.params.filename)

  res.download(filePath, (error) => {
    if (error) {
      console.error('DOWNLOAD ERROR:', error)
      res.status(404).json({ message: 'File not found' })
    }
  })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/auth', userRouter)
app.use('/admin', adminRouter)
app.use('/articles', articleRouter)
app.use('/', router)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'เกิดข้อผิดพลาด',
    error: err.message
  })
})

const startServer = async () => {
  try {
    await ensurePropertySchema()
    await ensureArticleSchema()

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000')
    })
  } catch (error) {
    console.error('Server startup failed:', error)
    process.exit(1)
  }
}

startServer()
