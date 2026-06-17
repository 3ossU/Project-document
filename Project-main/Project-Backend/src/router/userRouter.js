import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

import {
  createUser,
  getRolenamebyUserId,
  getUserByUsername,
  getUserByEmail,
  query
} from '../controllers/usersControllers.js'

const userRouter = Router()

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API สำหรับการจัดการผู้ใช้งานและการยืนยันตัวตน
 */

userRouter.post('/register', async (req, res) => {
  const { password, ...safeBody } = req.body;
  console.log("REGISTER BODY:", safeBody);

  const { username, email, password: rawPassword } = req.body;
  const roleId = 3;

  try {
    if (!username || !email || !rawPassword) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    if (email.trim() === "") {
      return res.status(400).json({ message: "Email ห้ามว่าง" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ message: "รูปแบบ Email ไม่ถูกต้อง" });
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username นี้มีอยู่แล้ว" });
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: "Email นี้มีอยู่แล้ว" });
    }

    await createUser({
      username,
      password: rawPassword,
      email,
      roleId
    });

    return res.status(200).json({ message: "Success" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
});

// ================= REGISTER SELLER =================
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'documents/')
  },
  filename: (req, file, cb) => {
    const username = req.body.username
    cb(null, `${username}-${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

userRouter.post('/register-seller', upload.single('file'), async (req, res) => {
  try {
    const {
      namesurname,
      username,
      password,
      address,
      email,
      phone
    } = req.body

    const file = req.file

    if (!file) {
      return res.status(400).json({ message: "กรุณาอัปโหลดไฟล์" })
    }

    const existingUser = await getUserByUsername(username)
    if (existingUser) {
      return res.status(400).json({ message: "Username ซ้ำ" })
    }

    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      return res.status(400).json({ message: "Email ซ้ำ" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const sql = `
      INSERT INTO verifyseller
      (username, password, role_id, address, document, namesurname, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    await query(sql, [
      username,
      hashedPassword,
      2,
      address,
      file.filename,
      namesurname,
      email,
      phone
    ])

    res.status(200).json({ message: "สมัครสำเร็จ รออนุมัติ" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: เข้าสู่ระบบ
 *     tags: [Users]
 */
userRouter.post('/login', async (req, res) => {

  const { username, password } = req.body

  const user = await getUserByUsername(username)

  if (!user)
    return res.status(404).json({ message: 'not found' })
  if (user.status === "suspended") {
    return res.status(403).json({ message: "บัญชีของคุณถูกระงับ" })
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch)
    return res.status(403).json({ message: 'รหัสไม่ถูก' })

  const token = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.status(200).json({ message: 'Success', token })
})

/* ================= Middleware ================= */
const jwtTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    req.jwtExpired = true
    req.userId = null
    return next()
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      req.jwtExpired = true
      req.userId = null
    } else {
      req.jwtExpired = false
      req.userId = payload.id
    }
    next()
  })
}

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: ตรวจสอบ JWT Token และดึงข้อมูล Role
 *     tags: [Users]
 */
userRouter.get('/verify', jwtTokenMiddleware, async (req, res) => {
  if (req.jwtExpired)
    return res.status(403).json({ message: 'Unauthorized' })

  const result = await getRolenamebyUserId(req.userId)

  res.status(200).json({
    message: 'Success',
    role: result[0].role
  })
})

userRouter.get('/me', jwtTokenMiddleware, async (req, res) => {
  if (req.jwtExpired || !req.userId)
    return res.status(403).json({ message: 'Unauthorized' })

  try {
    const rows = await query(
      `SELECT u.id, u.username, u.email, u.phone, r.name AS role
       FROM users u JOIN roles r ON u.role_id = r.id
       WHERE u.id = ?`,
      [req.userId]
    )
    if (!rows.length) return res.status(404).json({ message: 'User not found' })

    const user = rows[0]
    const result = {
      id: user.id,
      username: user.username,
      email: user.email || '',
      phone: user.phone || '',
      role: user.role
    }

    if (user.role.toLowerCase() === 'seller') {
      const sp = await query('SELECT namesurname, address FROM sellerprofile WHERE id = ?', [req.userId])
      if (sp.length) {
        result.namesurname = sp[0].namesurname || ''
        result.address = sp[0].address || ''
      }
      const cnt = await query('SELECT COUNT(*) AS total FROM property WHERE seller_id = ?', [req.userId])
      result.totalListings = cnt[0].total || 0
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

userRouter.patch('/me', jwtTokenMiddleware, async (req, res) => {
  if (req.jwtExpired || !req.userId)
    return res.status(403).json({ message: 'Unauthorized' })

  try {
    const { username, email, phone } = req.body
    if (!username || !email) return res.status(400).json({ message: 'username และ email ห้ามว่าง' })

    const existing = await query('SELECT id FROM users WHERE username = ? AND id != ?', [username, req.userId])
    if (existing.length) return res.status(400).json({ message: 'Username นี้มีคนใช้แล้ว' })

    await query('UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?', [username, email, phone || null, req.userId])
    res.json({ message: 'อัปเดตข้อมูลสำเร็จ' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

userRouter.post('/change-password', jwtTokenMiddleware, async (req, res) => {
  if (req.jwtExpired || !req.userId)
    return res.status(403).json({ message: 'Unauthorized' })

  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' })

    const rows = await query('SELECT password FROM users WHERE id = ?', [req.userId])
    if (!rows.length) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password)
    if (!isMatch) return res.status(403).json({ message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' })

    const hashed = await bcrypt.hash(newPassword, 10)
    await query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.userId])
    res.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default userRouter
