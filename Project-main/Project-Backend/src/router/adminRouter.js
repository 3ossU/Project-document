import express from 'express'
import {
    getAllUsers,
    deleteUser,
    unsuspendUser,
    getAllVerifySeller,
    approveSeller,
    rejectSeller,
    updateLastActive,
    getUserCount,
    getPropertyStats
} from '../controllers/adminControllers.js';

const router = express.Router()
//ดึงข้อมูลผู้ใช้งานทั้งหมดในระบบ
router.get('/', getAllUsers)

//ดึงข้อมูลตาราง verify seller
router.get('/verify-seller', getAllVerifySeller)

//ระงับบัญชี (apiยังไม่ได้เปลี่ยนชื่อ)
router.delete('/:id', deleteUser)

//ยกเลิกระงับบัญชี 
router.patch('/unsuspend/:id', unsuspendUser);

//ดึงข้อมูลสถิติผู้ใช้งาน
router.get('/stats', getUserCount)

//ยืนยันตัวตนคนขาย
router.post('/approve-seller', approveSeller);

//ไม่ยืนยัน
router.delete('/reject-seller/:id', rejectSeller);

//ตรวจจำนวนคน online
router.post('/heartbeat', updateLastActive);

//ดึงข้อมูลสถิติอสังหา
router.get('/property-stats', getPropertyStats);


export default router
