import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TradingGuide = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const buttons = [
    { text: "ซื้อ", color: "#A3D5F9", icon: "🛒", link: "/seller/tgbuyer" },
    { text: "เช่า", color: "#BEE7C3", icon: "🏠", link: "/seller/tgrent" },
    { text: "ขาย", color: "#BEE7C3", icon: "💰", link: "/seller/tgseller" },
    { text: "สินเชื่อบ้าน", color: "#BDB3F2", icon: "💸", link: "/seller/tgfinancing" },
  ];

  const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    width: "200px",
    height: "200px",
    fontFamily: "sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  };

  const textStyle = {
    marginTop: "6px",
    fontSize: "25px",
    fontWeight: "500",
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '2rem' }}>คู่มืออสังหาฯ</h1>
      <h2
        style={{
          textAlign: 'center',
          marginTop: '2rem',
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        แหล่งรวมความรู้ ทิปส์และเทคนิคต่าง ๆ รวมไปถึงเครื่องคำนวณสินเชื่อ
        ที่จะช่วยให้คุณตัดสินใจซื้อ-ขาย-เช่า-ลงทุนธุรกิจอสังหาริมทรัพย์ ได้อย่างมั่นใจยิ่งขึ้น
      </h2>

      <h1 style={{ textAlign: 'left', marginTop: '2rem', marginLeft: '100px', fontWeight: 'bold' }}>
        คู่มือตามหมวดหมู่
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '3rem' }}>
        {buttons.map((btn, i) => (
          <Link
            to={btn.link || "#"}
            key={i}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{ ...buttonStyle, backgroundColor: btn.color }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
            >
              <div style={{ fontSize: "26px" }}>{btn.icon}</div>
              <div style={textStyle}>{btn.text}</div>
            </div>
          </Link>
        ))}
      </div>

      <hr className="mt-5 mb-5" />
      <h1 style={{ textAlign: 'left', marginTop: '2rem', marginLeft: '100px', fontWeight: 'bold' }}>บทความตามเวลา</h1>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          marginTop: "2rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        {loading ? (
          <p style={{ color: '#888', textAlign: 'center' }}>กำลังโหลดบทความ...</p>
        ) : articles.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>ยังไม่มีบทความ</p>
        ) : (
          articles.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "30px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "20px",
              }}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "220px", height: "130px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                />
              ) : (
                <div style={{ width: "220px", height: "130px", background: "#e9ecef", borderRadius: "8px", flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '14px' }}>
                  ไม่มีรูปภาพ
                </div>
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ color: "#555", lineHeight: 1.5 }}>
                  {item.description}
                </p>
                <Link to={`/seller/tgarticle/${item.id}`} style={{ color: "#0d6efd", textDecoration: "none", fontWeight: "500" }}>
                  อ่านต่อ →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TradingGuide;
