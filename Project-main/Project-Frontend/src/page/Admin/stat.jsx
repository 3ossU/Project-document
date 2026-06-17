import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import * as XLSX from 'xlsx'; // <-- เพิ่ม Import ตรงนี้

const Stat = () => {

  // เปลี่ยน State ใหม่ให้เก็บข้อมูลสถิติ User ทั้งหมด
  const [userStats, setUserStats] = useState({
    total: 0,
    buyers: 0,
    sellers: 0,
    online: 0
  });
  
  // State สำหรับเก็บข้อมูลประเภทอสังหาริมทรัพย์
  const [propertyStats, setPropertyStats] = useState([]);

  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลผู้ใช้งานสถิติ
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3000/admin/stats');
        if (res.ok) {
          const data = await res.json();
          // อัปเดตข้อมูลเข้า State
          setUserStats({
            total: data.totalUsers || 0,
            buyers: data.totalBuyers || 0,
            sellers: data.totalSellers || 0,
            online: data.activeTotal || 0
          });
        }
      } catch (err) {
        console.error("Fetch stats failed", err);
      }
    };

    // ฟังก์ชันดึงข้อมูลสถิติอสังหาริมทรัพย์
    const fetchPropertyStats = async () => {
        try {
          const res = await fetch('http://localhost:3000/admin/property-stats');
          if (res.ok) {
            const data = await res.json();
            setPropertyStats(data);
          }
        } catch (err) {
          console.error("Fetch property stats failed", err);
        }
    };

    // ฟังก์ชันรวมการโหลดข้อมูลทั้งหมด
    const loadAllData = async () => {
      await Promise.all([fetchStats(), fetchPropertyStats()]);
    };

    // 1. เรียกใช้งานครั้งแรกทันทีที่เปิดหน้าเว็บ
    loadAllData(); 

    // 2. ตั้งเวลาดึงข้อมูลใหม่ทุกๆ 10 วินาที (10000 ms) แบบ Auto-refresh
    const statsInterval = setInterval(() => {
      loadAllData();
    }, 10000);

    // 3. ล้างการทำงานของ setInterval เมื่อผู้ใช้ออกจากหน้านี้
    return () => clearInterval(statsInterval);
  }, []);

  //  Export ข้อมูลเป็น Excel
  const handleExportExcel = () => {
    // 1. จัดเตรียมข้อมูลสถิติผู้ใช้งานให้อยู่ในรูปแบบตาราง 
    const userExportData = [
      ["--- สถิติผู้ใช้งาน ---", ""],
      ["ออนไลน์", userStats.online],
      ["ผู้ซื้อ", userStats.buyers],
      ["ผู้ขาย", userStats.sellers],
      ["ผู้ใช้งานทั้งหมด", userStats.total],
      ["", ""], // เว้นบรรทัด
    ];

    // 2. จัดเตรียมข้อมูลสถิติอสังหาให้เป็นตาราง
    const propertyExportData = [
      ["--- สถิติจำนวนอสังหาริมทรัพย์ ---", ""],
      ["ประเภท", "จำนวน (รายการ)"],
      ...propertyStats.map(stat => [stat.type, stat.count])
    ];

    // นำข้อมูลทั้งมาต่อกัน
    const finalData = [...userExportData, ...propertyExportData];

    // สร้างexcekและใส่ข้อมูลลงไป
    const worksheet = XLSX.utils.aoa_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Statistics");

    // โหลดไฟล์ออกมาเป็น Excel
    XLSX.writeFile(workbook, "สถิติ.xlsx");
  };

  // สีของกราฟแต่ละแท่ง
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#4ECDC4', '#556270'];

  return (
    <>
      <div style={{ backgroundColor: '#ffffffff', minHeight: '100vh', padding: '2rem' }}>
        <Container className="p-4 rounded-4 shadow-sm" style={{ backgroundColor: '#DFDFDF', maxWidth: '1000px' }}>

          <div className='d-flex justify-content-between align-items-center mb-4'>
            <h3 className="fw-bold mb-0">สถิติ</h3>
          </div>

          {/* ส่วนอสังหา (กราฟและจำนวน) */}
          <Card className="mb-4 shadow-sm border-0" style={{ backgroundColor: '#eef3fb' }}>
            <Card.Body>
              <h5 className="fw-bold mb-4 text-center">สถิติจำนวนอสังหาริมทรัพย์</h5>
              
              {/* กราฟ */}
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={propertyStats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip cursor={{ fill: '#f5f5f5' }} />
                    <Legend />
                    <Bar dataKey="count" name="จำนวน (รายการ)" radius={[5, 5, 0, 0]}>
                      {propertyStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* ข้อความระบุว่ามีกี่อัน */}
              <Row className="mt-4 px-3 text-center">
                {propertyStats.map((stat, idx) => (
                  <Col key={idx} md={3} sm={6} className="mb-3">
                    <div className="p-3 bg-white rounded shadow-sm border h-100">
                      <div className="fw-semibold text-secondary mb-1">{stat.type}</div>
                      <h4 className="fw-bold mb-0" style={{ color: COLORS[idx % COLORS.length] }}>
                        {stat.count} <span style={{ fontSize: '1rem', color: '#6c757d' }}>รายการ</span>
                      </h4>
                    </div>
                  </Col>
                ))}
              </Row>  

            </Card.Body>
          </Card>

          {/* ส่วนผู้ใช้งาน */}
          <Card className="mb-4 shadow-sm border-0" style={{ backgroundColor: '#eef3fb' }}>
            <Card.Body>
              <Row className="text-center">
                <Col md={3}>
                  <i className="bi bi-person-workspace" style={{ fontSize: '2.5rem', color: '#ff4d4f' }}></i>
                  <p className="fw-semibold mt-2 mb-0">ออนไลน์ <span style={{color: '#00b140'}}>●</span></p>
                  {/* แสดงจำนวนออนไลน์ */}
                  <h5 className="fw-bold text-danger">{userStats.online}</h5>
                </Col>

                <Col md={3}>
                  <i className="bi bi-cart-check-fill" style={{ fontSize: '2.5rem', color: '#00b140' }}></i>
                  <p className="fw-semibold mt-2 mb-0">ผู้ซื้อ</p>
                  {/* แสดงจำนวนผู้ซื้อ */}
                  <h5 className="fw-bold text-success">{userStats.buyers}</h5>
                </Col>

                <Col md={3}>
                  <i className="bi bi-shop" style={{ fontSize: '2.5rem', color: '#f7b500' }}></i>
                  <p className="fw-semibold mt-2 mb-0">ผู้ขาย</p>
                  {/* แสดงจำนวนผู้ขาย */}
                  <h5 className="fw-bold text-warning">{userStats.sellers}</h5>
                </Col>

                <Col md={3}>
                  <i className="bi bi-people-fill" style={{ fontSize: '2.5rem', color: '#0045FF' }}></i>
                  <p className="fw-semibold mt-2 mb-0">ผู้ใช้งานทั้งหมด</p>
                  {/* แสดงจำนวนผู้ใช้ทั้งหมด */}
                  <h5 className="fw-bold">{userStats.total}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* ปุ่ม Export */}
          <div className="text-start">
            <Button variant="primary" className="px-4 rounded-3" onClick={handleExportExcel}>
              <i className="bi bi-download me-2"></i>
              Export
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Stat;