# SALA - Minimalist E-Commerce Clothing Platform 

ยินดีต้อนรับสู่โปรเจกต์ **SALA** แพลตฟอร์ม E-Commerce ขายเสื้อผ้าออนไลน์สไตล์ Minimalist ที่เน้นประสบการณ์การใช้งานที่เรียบง่าย รวดเร็ว และมีระบบดูแลลูกค้าที่ครบวงจร พัฒนาขึ้นโดยผสมผสานเทคโนโลยีสมัยใหม่เพื่อรองรับการขยายตัวในอนาคต

---

##  ที่มาและความสำคัญ (Background & Significance)

ในยุคปัจจุบันการซื้อขายเสื้อผ้าออนไลน์กลายเป็นส่วนหนึ่งของชีวิตประจำวัน แต่ผู้ใช้งานมักประสบปัญหาเกี่ยวกับหน้าเว็บที่โหลดช้า ระบบค้นหาไซส์หรือสีที่ไม่แม่นยำ ขั้นตอนการชำระเงินที่ซับซ้อน รวมถึงการบริการหลังการขายที่ติดต่อยาก แบรนด์ **SALA** จึงถูกคิดค้นขึ้นมาเพื่อลบช่องว่างเหล่านั้น โดยมุ่งเน้นไปที่การสร้างแพลตฟอร์มที่ตอบโจทย์ทั้งในแง่ของ Design (ความคลีน มินิมอล), Performance (ความเร็วและความเสถียร) และ Customer Support (ความใส่ใจลูกค้า) เพื่อมอบประสบการณ์การช็อปปิ้งที่ดีที่สุด

---

##  Pain Points (ปัญหาที่พบในปัจจุบัน)

1. **ปัญหาฝั่งลูกค้า:** การซื้อสินค้าบนเว็บทั่วไปทำได้ยาก ค้นหาเสื้อผ้าไม่เจอ ขั้นตอนชำระเงินซับซ้อน ดูประวัติการซื้อย้อนหลังไม่ได้ และเมื่อสินค้ามีปัญหา (เช่น ส่งผิดไซส์) มักไม่มีช่องทางติดต่อขอความช่วยเหลือที่เป็นระบบ ต้องคอยทักแชทเพจที่ตอบช้า
2. **ปัญหาฝั่งแอดมิน:** ขาดเครื่องมือในการจัดการร้านค้าแบบจุดเดียว (Centralized Dashboard) การเพิ่ม/ลดสินค้า ปรับเปลี่ยนหมวดหมู่เสื้อผ้า หรือจัดการข้อมูลของลูกค้าทำได้ยากและไม่เป็นระบบ
3. **ปัญหาฝั่งบริการลูกค้า:** ไม่มีระบบ Ticket ทำให้ทีมซัพพอร์ตสับสนว่าเคสไหนแก้แล้ว เคสไหนยังค้างอยู่ ส่งผลให้แก้ปัญหาให้ลูกค้าตกหล่นและล่าช้า

---

##  วัตถุประสงค์ (Objectives)

1. เพื่อพัฒนาเว็บไซต์ E-Commerce แบรนด์เสื้อผ้า SALA ที่ใช้งานง่าย รองรับการทำงานในทุกอุปกรณ์ (Responsive Design)
2. เพื่อสร้างระบบการซื้อขาย ตะกร้าสินค้า และประวัติการสั่งซื้อที่มีประสิทธิภาพ ปลอดภัย และโปร่งใส
3. เพื่อพัฒนาระบบ Customer Support ในรูปแบบ Ticket ที่เชื่อมต่อระหว่างลูกค้าและเจ้าหน้าที่ได้อย่างไร้รอยต่อ
4. เพื่อสร้าง Dashboard หลังบ้านที่ช่วยให้ผู้ดูแลระบบบริหารจัดการสินค้า หมวดหมู่ และข้อมูลลูกค้าได้ในที่เดียว

---

##  ผู้ใช้งาน (Users) และ User Requirements

ระบบนี้แบ่งผู้ใช้งานออกเป็น 3 กลุ่มหลัก โดยมีสิทธิ์และความต้องการในระบบดังนี้:

### 1. Customer (ลูกค้า)
* **Log in / Register:** สามารถสมัครสมาชิกและเข้าสู่ระบบเพื่อใช้งานฟังก์ชันต่าง ๆ ได้
* **ค้นหาสินค้า (Search Product):** สามารถค้นหาเสื้อผ้าที่ต้องการได้อย่างสะดวกรวดเร็ว
* **เพิ่มสินค้าลงตะกร้า (Add to Cart):** เลือกไซส์/สีของเสื้อผ้าที่ชอบแล้วกดเก็บไว้ในตะกร้าได้
* **Check out:** ดำเนินการสั่งซื้อ ตรวจสอบยอดเงิน และชำระเงินตามขั้นตอน
* **Buy History:** สามารถเรียกดูประวัติการสั่งซื้อเสื้อผ้าย้อนหลังของตนเองได้
* **ยื่น Ticket Support:** สามารถส่งคำร้องขอความช่วยเหลือ ติดต่อ Support หรือแจ้งปัญหาเกี่ยวกับออเดอร์ได้อย่างเป็นระบบ

### 2. Admin (ผู้ดูแลระบบ)
* **Add สินค้า:** เพิ่มเสื้อผ้ารุ่นใหม่ ๆ เข้าสู่ระบบร้านค้า
* **Delete สินค้า:** ลบสินค้าที่เลิกผลิตหรือไม่ได้ขายแล้วออกจากระบบ
* **แก้ไขสินค้า (Edit Product):** อัปเดตราคา รายละเอียด รูปภาพ หรือจำนวนสต็อกสินค้า
* **เพิ่มหมวดหมู่สินค้า (Manage Categories):** สร้างและจัดการหมวดหมู่เสื้อผ้า (เช่น เสื้อยืด, กางเกง, เดรส)
* **จัดการข้อมูลลูกค้า (Customer Management):** ดูและบริหารจัดการข้อมูลโปรไฟล์หรือบัญชีของลูกค้า
* **Dashboard:** ดูสรุปสถิติต่าง ๆ ยอดขาย สินค้าคงเหลือ และภาพรวมของร้านค้า

### 3. Support (เจ้าหน้าที่ดูแลลูกค้า)
* **ตอบ Ticket ลูกค้า:** เข้าไปดูคำร้อง/ข้อร้องเรียนที่ลูกค้าส่งเข้ามา และพิมพ์ตอบกลับเพื่อช่วยเหลือหรือแก้ไขปัญหาให้ลูกค้า

---

## 📋 System Requirements

### 1. Functional Requirements 
* **Authentication Service:** ระบบตรวจสอบสิทธิ์ (Sign-up, Log-in, Password Hashing)
* **Product Catalogs & Search Engine:** ระบบแสดงผลสินค้า กรองหมวดหมู่ และค้นหาคำสำคัญ
* **Shopping Cart & Checkout Engine:** ระบบคำนวณราคาสินค้าในตะกร้าและตัดสต็อกเมื่อชำระเงิน
* **Order & Ticket Tracking System:** ระบบจัดเก็บและดึงข้อมูลประวัติการซื้อ รวมถึงระบบออกตั๋วแจ้งปัญหา (Ticket Generation)
* **Admin Control Panel & Dashboard:** หน้าต่างสำหรับแอดมินในการทำ CRUD (Create, Read, Update, Delete) สินค้า/หมวดหมู่/ลูกค้า และแสดงกราฟสรุปยอด
* **Support Desk Workspace:** หน้าจอเฉพาะสำหรับ Support เพื่อดึงข้อมูล Ticket ที่ค้างอยู่มาตอบปฏิสัมพันธ์

### 2. Non-Functional Requirements
* **Performance:** หน้าเว็บหน้าร้านต้องแสดงผลและโหลดข้อมูลเสร็จสิ้นภายใน 2 วินาที
* **Security:** ป้องกันข้อมูลส่วนตัวของลูกค้าและรหัสผ่านด้วยการเข้ารหัสที่รัดกุม (เช่น bcrypt, HTTPS) ข้อมูลทางการเงินต้องปลอดภัย
* **Scalability:** ระบบ Ticket และระบบสั่งซื้อต้องเขียนแบบแยก Service เพื่อรองรับจำนวนเคสและยอดคำสั่งซื้อที่จะเพิ่มขึ้นในอนาคต
* **Usability:** หน้าดีไซน์ต้องมินิมอล สบายตา และใช้งานง่าย (User-Friendly) ทั้งบนมือถือและคอมพิวเตอร์

---

##  โครงสร้าง Database

* **Users** เก็บข้อมูลบัญชีผู้ใช้ทั้งหมด (id, email, password_hash, role [customer, admin, support], name, created_at)
* **Categories** เก็บหมวดหมู่เสื้อผ้า เช่น เสื้อยืด, กางเกง, แจ็คเก็ต (id, category_name, description)
* **Products** เก็บข้อมูลตัวสินค้าหลัก (id, category_id, title, description, price, image_url, created_at)
* **Product_Variants** เก็บสต็อกเสื้อผ้าแยกย่อยตามไซส์และสี (id, product_id, size, color, stock_quantity)
* **Orders** ประวัติและสถานะคำสั่งซื้อ (id, user_id, total_price, status, created_at)
* **Order_Items** รายการสินค้าในแต่ละออเดอร์ (id, order_id, variant_id, quantity, price)
* **Tickets** ระบบเก็บประวัติตั๋วขอความช่วยเหลือ (id, user_id, order_id [null if general], subject, message, status [open, pending, closed], created_at)
* **Ticket_Replies** ข้อความตอบกลับสำหรับพิมพ์คุยกันระหว่างลูกค้าและซัพพอร์ต (id, ticket_id, user_id, message, created_at)

---
##  เทคโนโลยีที่ใช้ (TechStack)

### 1. Frontend 
* React.js / Next.js: เฟรมเวิร์กหลักสำหรับการสร้าง UI ที่ตอบสนองรวดเร็ว
* Tailwind CSS + Bootstrap: ผสมผสานจุดเด่นของ Utility-First (Tailwind) และ Grid System ที่เสถียร (Bootstrap) เพื่อสร้างหน้าเว็บที่มินิมอล โหลดไว และรองรับทุกหน้าจอ
### 2. Backend
* Node.js (Express.js): สำหรับสร้าง RESTful API ที่มีประสิทธิภาพสูงและประมวลผลเร็ว
### 3. Database
* MySQL: ฐานข้อมูลแบบ Relational Database ที่เหมาะสำหรับการจัดการข้อมูลที่มีความสัมพันธ์ซับซ้อน เช่น สินค้า, สต็อกแยกไซส์, ออเดอร์ และระบบ Ticket
### 4. Authentication
* JWT (JSON Web Tokens): สำหรับออก Token ตรวจสอบและแยกสิทธิ์การเข้าถึงระหว่าง Customer, Admin และ Support อย่างปลอดภัย
### 5. Version Control & Tools:
* GitHub: สำหรับเก็บ Source Code จัดการ Repository และการทำงานร่วมกัน
* Sourcetree: โปรแกรม Git GUI Client เพื่อช่วยบริหารจัดการ Branch, ดูประวัติการ Commit และลดข้อผิดพลาดในการ Merge โค้ด

---
## การทดสอบระบบ (system testing)
* **Postman** ใช้ทดสอบ API เพื่อดูความถูกต้องของผลลัพธ์ 
* **jmeter** ทดสอบว่าเว็บจะรองรับผู้ใช้งานจำนวนมากได้มั้ย
* **User Acceptance Testing / Users ทดลองจริง** ให้ผู้ใช้งานตัวอย่างทดสอบเว็บไซต์ของเราเพื่อยีนยันว่าผู้ใช้งานจะมีประสบการณ์การใช้งานที่ดีและ ตรวจสอบความถูกต้องของ User Requirement
---
## Prototype
* **Figma url:**"[Linkhere](https://example.com/)"
---
## 📐 Mermaid Diagram

แผนภูมิแสดงความสัมพันธ์และการไหลของข้อมูลระหว่าง Users ทั้ง 3 กลุ่มผ่านระบบ SALA:

```mermaid
graph TD
    %% Customers Path
    Customer[Customer] -->|Log in / Search / Buy| Web[SALA Frontend App]
    Customer -->|Open Ticket| Ticket[Ticket System]
    
    %% API & Core Systems
    Web -->|API Requests| API(Backend: API Gateway)
    Ticket -->|Sync Data| API
    API -->|Read/Write Data| DB[(Database)]
    
    %% Admin Path
    Admin[Admin] -->|Manage Products, Categories, Customers| Dashboard[Admin Dashboard]
    Dashboard -->|API Requests| API
    
    %% Support Path
    Support[Support Staff] -->|View & Answer Tickets| SupportWorkspace[Support Workspace]
    SupportWorkspace -->|Update Ticket Status| Ticket
