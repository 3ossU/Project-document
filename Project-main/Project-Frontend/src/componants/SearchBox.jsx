import React, { useState } from 'react';
import CountModal from './CountModal';

// 🔹 คอมโพเนนต์ SearchBox ใช้สำหรับแสดงกล่องค้นหาและตัวกรองต่าง ๆ 
const SearchBox = ({ 
  activeTab,              // แท็บที่กำลังถูกเลือก (sale หรือ rent)
  setActiveTab,           // ฟังก์ชันเปลี่ยนสถานะแท็บ
  searchTerm,             // คำที่ผู้ใช้พิมพ์เพื่อค้นหา
  setSearchTerm,          // ฟังก์ชันอัปเดตคำค้นหา
  selectedCategory,       // หมวดหมู่ที่เลือก (ใช้ภายนอก component)
  onCategoryClick,        // ฟังก์ชันเมื่อคลิกปุ่ม Category
  onPriceClick,           // ฟังก์ชันเมื่อคลิกปุ่ม Price
  onReset,                // ฟังก์ชันรีเซ็ตฟิลเตอร์
  bedroomCount, setBedroomCount, bathroomCount, setBathroomCount
}) => {
  const [bedroomOpen, setBedroomOpen] = useState(false);
  const [bathroomOpen, setBathroomOpen] = useState(false);
  return (
    <div className="search-box"> {/* กล่องหลักของระบบค้นหา */}

      {/* 🔻 ส่วนแท็บ Sale / Rent */}
      <div className="tabs">
        {/* <button 
          className={`tab-btn ${activeTab === 'sale' ? 'active' : ''}`}  // แสดง active เมื่อเลือก Sale
          onClick={() => setActiveTab('sale')}
        >
          Sale
        </button>

        <button 
          className={`tab-btn ${activeTab === 'rent' ? 'active' : ''}`}  // แสดง active เมื่อเลือก Rent
          onClick={() => setActiveTab('rent')}
        >
          Rent
        </button> */}

        {/* 🔻 ปุ่มฟิลเตอร์ Category และ Reset */}
        <div className="filter-buttons">
          <button className="tab-btn" onClick={onCategoryClick}>
            <i className="bi bi-list" aria-hidden="true"></i> หมวดหมู่  {/* ไอคอนหมวดหมู่ */}
          </button>

          <button className="tab-btn" onClick={onReset}>
            <i className="bi bi-arrow-counterclockwise" aria-hidden="true"></i> รีเซ็ต {/* ปุ่มรีเซ็ต */}
          </button>
        </div>
      </div>

      {/* 🔻 ช่องกรอกข้อความสำหรับค้นหา */}
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          placeholder="ค้นหาอสังหาริมทรัพย์..."  // ข้อความตัวอย่างในช่องค้นหา
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // อัปเดตค่าค้นหาเมื่อผู้ใช้พิมพ์
        />
        <button className="search-btn">
          <i className="bi bi-search" aria-hidden="true"></i> ค้นหา {/* ปุ่มค้นหา */}
        </button>
      </div>

      {/* 🔻 แท็กฟิลเตอร์สำหรับคัดกรองเพิ่มเติม */}
      <div className="filter-tags">

        <button 
          className="filter-tag"
          onClick={onPriceClick}      // เปิดตัวเลือก Price
        >
          <i className="bi bi-cash-stack" aria-hidden="true"></i> ราคา
        </button>

        <button
          className="filter-tag"
          onClick={() => setBedroomOpen(true)}
          type="button"
          aria-haspopup="dialog"
        >
          <i className="bi bi-person" aria-hidden="true"></i>
          {' '}
          ห้องนอน{bedroomCount ? `: ${bedroomCount}` : ''} {/* ฟิลเตอร์จำนวนห้องนอน */}
        </button>

        <button
          className="filter-tag"
          onClick={() => setBathroomOpen(true)}
          type="button"
          aria-haspopup="dialog"
        >
          <i className="bi bi-droplet" aria-hidden="true"></i>
          {' '}
          ห้องน้ำ{bathroomCount ? `: ${bathroomCount}` : ''} {/* ฟิลเตอร์จำนวนห้องน้ำ */}
        </button>
      </div>
      {bedroomOpen && (
        <CountModal
          title="ห้องนอน"
          initial={bedroomCount}
          onClose={() => setBedroomOpen(false)}
          onApply={(val) => {
            setBedroomCount(val);
            setBedroomOpen(false);
          }}
        />
      )}

      {bathroomOpen && (
        <CountModal
          title="ห้องน้ำ"
          initial={bathroomCount}
          onClose={() => setBathroomOpen(false)}
          onApply={(val) => {
            setBathroomCount(val);
            setBathroomOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBox;
