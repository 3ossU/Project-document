import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600&display=swap');

  .sprofile-page {
    min-height: 100vh;
    background: #f8f7f4;
    font-family: 'Sarabun', sans-serif;
    padding: 2rem 1rem;
  }

  .sprofile-card {
    max-width: 640px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04);
    overflow: hidden;
  }

  .sprofile-header {
    background: linear-gradient(135deg, #064e3b 0%, #059669 100%);
    padding: 2.5rem 2rem 4rem;
    position: relative;
  }

  .sprofile-header-title {
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0 0 4px;
  }

  .sprofile-header-name {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  .sprofile-avatar-wrap {
    position: absolute;
    bottom: -40px;
    right: 2rem;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #d1fae5;
    border: 4px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
    color: #047857;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .sprofile-body { padding: 3rem 2rem 2rem; }

  .sfield-group { margin-bottom: 1.25rem; }

  .sfield-label {
    font-size: 12px;
    font-weight: 500;
    color: #9ca3af;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: block;
  }

  .sfield-value {
    font-size: 16px;
    color: #111827;
    padding: 10px 14px;
    background: #f8f7f4;
    border-radius: 10px;
    border: 1.5px solid transparent;
  }

  .sfield-input {
    font-family: 'Sarabun', sans-serif;
    font-size: 16px;
    color: #111827;
    padding: 10px 14px;
    background: #fff;
    border-radius: 10px;
    border: 1.5px solid #059669;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .sfield-input:focus {
    border-color: #064e3b;
    box-shadow: 0 0 0 3px rgba(5,150,105,0.12);
  }

  .sdivider { height: 1px; background: #f0eeea; margin: 1.5rem 0; }

  .ssection-title {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  .sbtn {
    font-family: 'Sarabun', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 22px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.18s;
    border: none;
  }

  .sbtn-primary { background: #064e3b; color: #fff; }
  .sbtn-primary:hover { background: #059669; transform: translateY(-1px); }
  .sbtn-success { background: #059669; color: #fff; }
  .sbtn-success:hover { background: #047857; transform: translateY(-1px); }
  .sbtn-ghost { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }
  .sbtn-ghost:hover { background: #e5e7eb; }

  .sbtn-row { display: flex; gap: 10px; margin-top: 1.5rem; }

  .snotice {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 8px;
    margin-top: 1rem;
    animation: sfadeIn 0.3s ease;
  }

  .snotice-success { color: #059669; background: #ecfdf5; }
  .snotice-error { color: #dc2626; background: #fef2f2; }

  @keyframes sfadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .verify-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 20px;
    background: #ecfdf5;
    color: #047857;
  }

  .verify-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #10b981;
  }

  .stat-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 1rem;
  }

  .stat-box {
    background: #f8f7f4;
    border-radius: 12px;
    padding: 14px 10px;
    text-align: center;
  }

  .stat-num {
    font-size: 22px;
    font-weight: 600;
    color: #064e3b;
    display: block;
  }

  .stat-lbl { font-size: 12px; color: #9ca3af; margin-top: 2px; }

  .spw-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #f8f7f4;
    border-radius: 10px;
  }

  .sbtn-link {
    font-family: 'Sarabun', sans-serif;
    font-size: 13px;
    color: #059669;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-weight: 500;
  }

  .sbtn-link:hover { text-decoration: underline; }

  .spw-form {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: sfadeIn 0.2s ease;
  }
`;

function ProfileSeller() {
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState(null);
  const [showPwForm, setShowPwForm] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", phone: "", namesurname: "", address: "" });
  const [temp, setTemp] = useState({ username: "", email: "", phone: "", namesurname: "", address: "" });
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [totalListings, setTotalListings] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const loaded = {
            username: data.username || "",
            email: data.email || "",
            phone: data.phone || "",
            namesurname: data.namesurname || "",
            address: data.address || ""
          };
          setForm(loaded);
          setTemp(loaded);
          setTotalListings(data.totalListings || 0);
        }
      } catch (err) {
        console.error("Load profile error:", err);
      }
    };
    fetchProfile();
  }, []);

  const showNotice = (msg, type = "success") => {
    setNotice({ msg, type });
    setTimeout(() => setNotice(null), 3000);
  };

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username: temp.username, email: temp.email, phone: temp.phone })
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ ...temp });
        setIsEditing(false);
        showNotice("บันทึกข้อมูลเรียบร้อยแล้ว");
      } else {
        showNotice(data.message || "เกิดข้อผิดพลาด", "error");
      }
    } catch (err) {
      showNotice("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์", "error");
    }
  };

  const handleCancel = () => {
    setTemp({ ...form });
    setIsEditing(false);
  };

  const handlePasswordSave = async () => {
    setPwError("");
    if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
      setPwError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("รหัสผ่านใหม่ไม่ตรงกัน");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.next })
      });
      const data = await res.json();
      if (res.ok) {
        setShowPwForm(false);
        setPwForm({ current: "", next: "", confirm: "" });
        showNotice("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว");
      } else {
        setPwError(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (err) {
      setPwError("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sprofile-page">
        <div className="sprofile-card">
          <div className="sprofile-header">
            <p className="sprofile-header-title">บัญชีผู้ขาย</p>
            <h2 className="sprofile-header-name">{form.username || "..."}</h2>
            <div className="sprofile-avatar-wrap">
              {form.username ? form.username.charAt(0).toUpperCase() : "?"}
            </div>
          </div>

          <div className="sprofile-body">
            {/* Verify Status */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <p className="ssection-title" style={{ margin: 0 }}>สถานะบัญชี</p>
              <div className="verify-badge">
                <span className="verify-dot"></span>
                ยืนยันตัวตนแล้ว
              </div>
            </div>

            {/* Stats */}
            <div className="stat-grid">
              <div className="stat-box">
                <span className="stat-num">{totalListings}</span>
                <div className="stat-lbl">ประกาศทั้งหมด</div>
              </div>
              <div className="stat-box">
                <span className="stat-num">{form.namesurname ? form.namesurname.split(" ")[0] ? "✓" : "-" : "-"}</span>
                <div className="stat-lbl">ชื่อจริงยืนยัน</div>
              </div>
            </div>

            <div className="sdivider" />

            {/* Personal Info */}
            <p className="ssection-title">ข้อมูลส่วนตัว</p>

            {[
              { key: "username",    label: "ชื่อผู้ใช้งาน",  type: "text",  editable: true  },
              { key: "namesurname", label: "ชื่อ-นามสกุล",   type: "text",  editable: false },
              { key: "email",       label: "อีเมล",           type: "email", editable: true  },
              { key: "phone",       label: "เบอร์โทรศัพท์",  type: "text",  editable: true  },
              { key: "address",     label: "ที่อยู่",          type: "text",  editable: false },
            ].map(({ key, label, type, editable }) => (
              <div key={key} className="sfield-group">
                <span className="sfield-label">{label}</span>
                {isEditing && editable
                  ? <input className="sfield-input" name={key} value={temp[key]} onChange={(e) => setTemp({ ...temp, [key]: e.target.value })} type={type} />
                  : <div className="sfield-value">{form[key] || "-"}</div>
                }
              </div>
            ))}

            <div className="sbtn-row">
              {!isEditing ? (
                <button className="sbtn sbtn-primary" onClick={() => setIsEditing(true)}>แก้ไขข้อมูล</button>
              ) : (
                <>
                  <button className="sbtn sbtn-success" onClick={handleSave}>บันทึก</button>
                  <button className="sbtn sbtn-ghost" onClick={handleCancel}>ยกเลิก</button>
                </>
              )}
            </div>

            {notice && (
              <div className={`snotice snotice-${notice.type}`}>
                <span>{notice.type === "success" ? "✓" : "✕"}</span> {notice.msg}
              </div>
            )}

            <div className="sdivider" />

            {/* Password */}
            <p className="ssection-title">รหัสผ่าน</p>
            <div className="spw-row">
              <span style={{ fontSize: 16, color: "#374151" }}>••••••••</span>
              <button className="sbtn-link" onClick={() => { setShowPwForm(!showPwForm); setPwError(""); }}>
                {showPwForm ? "ยกเลิก" : "เปลี่ยนรหัสผ่าน"}
              </button>
            </div>

            {showPwForm && (
              <div className="spw-form">
                <input className="sfield-input" type="password" placeholder="รหัสผ่านปัจจุบัน"
                  value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })} />
                <input className="sfield-input" type="password" placeholder="รหัสผ่านใหม่"
                  value={pwForm.next} onChange={(e) => setPwForm({ ...pwForm, next: e.target.value })} />
                <input className="sfield-input" type="password" placeholder="ยืนยันรหัสผ่านใหม่"
                  value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} />
                {pwError && <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{pwError}</p>}
                <div>
                  <button className="sbtn sbtn-primary" onClick={handlePasswordSave}>บันทึกรหัสผ่าน</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSeller;
