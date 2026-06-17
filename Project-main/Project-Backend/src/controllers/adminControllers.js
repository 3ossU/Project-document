import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    waitForConnections: true,
    connectionLimit: 10
};

const pool = mysql.createPool(config);

export const getAllUsers = async (req, res) => {
    try {
        const sql = `
            SELECT
                u.id,
                u.username AS name,
                u.email,
                r.name AS role,
                u.status,
                sp.address,
                sp.document,
                sp.namesurname
            FROM users u
            JOIN roles r ON u.role_id = r.id
            LEFT JOIN sellerprofile sp ON u.id = sp.id
        `;
        const [rows] = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลจาก Database ได้" });
    }
};

export const getVerifySellers = async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        username AS name,
        email,
        address,
        phone,
        'Seller' AS role,
        document
      FROM verifyseller
    `;

    const [rows] = await pool.query(sql);

    res.status(200).json(rows);

  } catch (error) {
    console.error("Verify Seller Error:", error);
    res.status(500).json({ message: "ดึงข้อมูล verify seller ไม่สำเร็จ" });
  }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. ค้นหาข้อมูลของผู้ใช้ที่ต้องการจะระงับก่อน
        const [userRows] = await pool.query("SELECT role_id FROM users WHERE id = ?", [id]);

        // ถ้าไม่พบผู้ใช้งานในระบบ
        if (userRows.length === 0) {
            return res.status(404).json({ message: "ไม่พบบัญชีผู้ใช้งานนี้ในระบบ" });
        }

        // 2. ตรวจสอบว่าผู้ใช้นั้นเป็น Admin (role_id = 1) หรือไม่
        if (userRows[0].role_id === 1) {
            return res.status(403).json({ message: "ไม่อนุญาตให้ระงับบัญชีผู้ดูแลระบบ (Admin) ด้วยกันเองได้" });
        }

        // 3. ถ้าไม่ใช่ Admin ก็ทำการระงับบัญชีตามปกติ
        await pool.query("UPDATE users SET status = 'suspended' WHERE id = ?", [id]);
        res.status(200).json({ message: `ระงับบัญชี User ID: ${id} สำเร็จ` });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" });
    }
};

export const unsuspendUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("UPDATE users SET status = 'active' WHERE id = ?", [id]);
        res.status(200).json({ message: `ยกเลิกการระงับบัญชี ID: ${id} สำเร็จ` });
    } catch (error) {
        console.error("Unsuspend Error:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดของระบบ" });
    }
};

export const getUserStats = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT count(*) as total FROM users');
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ================== VERIFY SELLER ==================
export const getAllVerifySeller = async (req, res) => {
    try {
        const sql = `
            SELECT
                id,
                username AS name,
                namesurname AS NS,
                id AS userId,
                'Seller' AS role,
                address,
                phone,
                email,
                document
            FROM verifyseller
        `;
        const [rows] = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Verify Seller Error:", error);
        res.status(500).json({ message: "ดึงข้อมูล verify seller ไม่ได้" });
    }
};

// ================== APPROVE SELLER ==================
export const approveSeller = async (req, res) => {
    const {
        id,
        username,
        email,
        phone,
        namesurname,
        address,
        role_id
    } = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [verifyRows] = await connection.query('SELECT password, document FROM verifyseller WHERE id = ?', [id]);

        if (verifyRows.length === 0) {
            throw new Error("ไม่พบข้อมูลคำขออนุมัตินี้");
        }

        const hashedPassword = verifyRows[0].password;
        const documentFile = verifyRows[0].document;

        
        const insertUserSql = `
            INSERT INTO users (username, password, email, role_id, status, phone)
            VALUES (?, ?, ?, ?, 'active', ?)
        `;
        const [userResult] = await connection.query(insertUserSql, [
            username, hashedPassword, email, role_id, phone
        ]);

        const newUserId = userResult.insertId;

        const insertProfileSql = `
            INSERT INTO sellerprofile (id, namesurname, address, document)
            VALUES (?, ?, ?, ?)
        `;
        await connection.query(insertProfileSql, [
            newUserId, namesurname, address, documentFile
        ]);

        const deleteVerifySql = `DELETE FROM verifyseller WHERE id = ?`;
        await connection.query(deleteVerifySql, [id]);

        await connection.commit();
        res.status(200).json({ message: "อนุมัติและสร้างบัญชีผู้ขายสำเร็จ" });

    } catch (error) {
        await connection.rollback();
        console.error("Approve Seller Error:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในการอนุมัติผู้ขาย" });
    } finally {
        connection.release();
    }
};

// ================== REJECT SELLER ==================
export const rejectSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT document FROM verifyseller WHERE id = ?', [id]);

        if (rows.length > 0) {
            const documentFile = rows[0].document;

            if (documentFile) {
                const filePath = path.resolve('documents', documentFile);

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`ลบไฟล์เอกสาร ${documentFile} ออกจาก Server เรียบร้อยแล้ว`);
                }
            }
        }

        const sql = `DELETE FROM verifyseller WHERE id = ?`;
        await pool.query(sql, [id]);

        res.status(200).json({ message: "ปฏิเสธและลบคำขอสำเร็จ" });
    } catch (error) {
        console.error("Reject Error:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดของระบบในการปฏิเสธคำขอ" });
    }
};

// สร้าง Map เก็บข้อมูล { userId: { lastActive: timestamp, role } }
const activeUsersMap = new Map();

export const updateLastActive = (req, res) => {
    const { userId, role } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "No userId provided" });
    }

    activeUsersMap.set(userId, {
        lastActive: Date.now(),
        role: role ? role.toLowerCase() : 'buyer'
    });

    res.status(200).json({ message: "Updated active status in memory" });
};
// นับคน online
export const getUserCount = async (req, res) => {
    try {
        // 1.  นับรวมเฉพาะผู้ซื้อ (3) และผู้ขาย (2) โดยไม่นับ Admin (1)
        const [totalRows] = await pool.query('SELECT count(*) as total FROM users WHERE role_id != 1');
        
        // ผู้ซื้อ (role_id = 3)
        const [buyerRows] = await pool.query('SELECT count(*) as total FROM users WHERE role_id = 3');
        
        // ผู้ขาย (role_id = 2)
        const [sellerRows] = await pool.query('SELECT count(*) as total FROM users WHERE role_id = 2');

        // 2. ตั้งค่าเวลาสำหรับตรวจสอบสถานะออนไลน์  1 นาที
        const oneMinuteAgo = Date.now() - (1 * 60 * 1000);
        let activeTotal = 0;

        for (const [userId, data] of activeUsersMap.entries()) {
            // 3. ตรวจสอบเงื่อนไข ต้องยังออนไลน์อยู่ และ ไม่ใช่ admin
            if (data.lastActive >= oneMinuteAgo) {
                if (data.role !== 'admin') { 
                    activeTotal++;
                }
            } else {
                // ลบข้อมูลที่หมดเวลา
                activeUsersMap.delete(userId);
            }
        }

        // ส่งข้อมูลกลับไปที่หน้าบ้าน
        res.status(200).json({
            totalUsers: totalRows[0].total,
            totalBuyers: buyerRows[0].total,
            totalSellers: sellerRows[0].total,
            activeTotal: activeTotal
        });
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// ดึงข้อมูลสถิติอสังหาริมทรัพย์แยกตามประเภท
export const getPropertyStats = async (req, res) => {
    try {
        const sql = `
            SELECT property_type AS type, COUNT(*) AS count
            FROM property
            GROUP BY property_type
            ORDER BY count DESC
        `;
        const [rows] = await pool.query(sql);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Property Stats Error:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถิติอสังหาฯ ได้" });
    }
};