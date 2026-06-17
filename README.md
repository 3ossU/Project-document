# Project Main: Real Estate Trading and Rental Platform
> รายวิชา CSI204 ดิจิทัลแพลตฟอร์มสำหรับพัฒนาซอฟต์แวร์ (SPU SIT)

This project is now organized from a single root with 3 main parts:
- Project-Frontend for the React/Vite app
- Project-Backend for the Express API
- Project-Backend/Databases for database files and Docker compose

---

## 1. การวิเคราะห์และออกแบบสถาปัตยกรรมซอฟต์แวร์ (Analysis & Design)


### 1.1 Frontend Architecture (ส่วนหน้าบ้าน)
- **โครงสร้างระบบ:** ออกแบบในรูปแบบ Component-Based Architecture และทำงานแบบ Single Page Application (SPA) ผ่าน React และ Vite
- **การเชื่อมต่อข้อมูล:** เปลี่ยนจากการใช้ Local Mock Data มาเป็นการดึงข้อมูลจริงจากระบบหลังบ้านผ่านระบบ API Integration เพื่อแสดงรายการอสังหาริมทรัพย์ (Property List) ของผู้ซื้อและผู้ขายได้อย่างถูกต้องเป็นเรียลไทม์
- **ความปลอดภัย (Security):** ควบคุมการเข้าถึงหน้าจัดการระบบและการยืนยันตัวตนของผู้ใช้งาน (เช่น Seller Profile) ด้วยระบบ JWT Authentication

### 1.2 Backend Architecture (ส่วนหลังบ้าน)
- **โครงสร้างระบบ:** ใช้ Express.js (Node.js ecosystem) ในการประมวลผล Business Logic หลักของระบบ
- **การจัดการสภาพแวดล้อม:** แยกการตั้งค่าและมูลค่าการเชื่อมต่อฐานข้อมูล (Database Connection) ไว้ในไฟล์ Project-Backend/.env เพื่อความปลอดภัยตามหลัก Secure by Design

### 1.3 Database Architecture (ระบบจัดเก็บข้อมูล)
- **Relational Database (SQL):** ใช้ระบบ MySQL (จัดการผ่าน phpMyAdmin) ในการจัดเก็บข้อมูลโครงสร้างตารางหลักที่ต้องการความถูกต้องแม่นยำสูง (Data Integrity) เช่น ข้อมูลบัญชีผู้ใช้, ระบบการลงทะเบียนผู้ขาย และข้อมูลรายละเอียดอสังหาริมทรัพย์
- **Database Orchestration:** ใช้ Docker Compose (docker-compose-mysql-phpmyadmin.yaml) ในการควบคุมและจำลองสภาพแวดล้อมของฐานข้อมูลให้ทำงานได้อย่างอิสระและยืดหยุ่นผ่าน Container

---

## 2. วิธีการใช้งาน (How to use & run)
- npm run backend เพื่อสั่งรันระบบหลังบ้าน Express API
- npm run frontend เพื่อสั่งรันหน้าบ้าน React + Vite
- สั่งรัน Database Docker ผ่านคำสั่งสคริปต์ที่รูทโปรเจกต์ เช่น npm run db:up หรือเปิดผ่าน Docker Compose

---

## 3. แผนผังโครงสร้างระบบ (System Architecture Diagram)


```mermaid
graph TD
    User([User / Buyers & Sellers]) -->|HTTP Requests / Port 5173| Frontend[Project-Frontend <br> React + Vite SPA]
    Frontend -->|API Calls / Port 3000| Backend[Project-Backend <br> Express API]
    
    subgraph Security Layer
        Backend -->|Verify Token| JWT[JWT Authentication]
    end

    subgraph Infrastructure & Storage
        Backend -->|Read Env Config| Env[.env Configuration]
        Backend -->|Connect DB| MySQL[(Docker Container <br> MySQL Database)]
        PMA[phpMyAdmin UI] -->|Manage| MySQL
    end

    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef primary fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    class Frontend,Backend primary;
