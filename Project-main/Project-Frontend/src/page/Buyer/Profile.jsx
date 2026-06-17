import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600&display=swap');

  .profile-page {
    min-height: 100vh;
    background: #f8f7f4;
    font-family: 'Sarabun', sans-serif;
    padding: 2rem 1rem;
  }

  .profile-card {
    max-width: 640px;
    margin: 0 auto;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04);
    overflow: hidden;
  }

  .profile-header {
    background: linear-gradient(135deg, #1e3a5f 0%, #2d5fa0 100%);
    padding: 2.5rem 2rem 4rem;
    position: relative;
  }

  .profile-header-title {
    color: rgba(255,255,255,0.7);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin: 0 0 4px;
  }

  .profile-header-name {
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    margin: 0;
  }

  .profile-avatar-wrap {
    position: absolute;
    bottom: -40px;
    right: 2rem;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: #e8f0fe;
    border: 4px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
    color: #2d5fa0;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .profile-body {
    padding: 3rem 2rem 2rem;
  }

  .field-group { margin-bottom: 1.25rem; }

  .field-label {
    font-size: 12px;
    font-weight: 500;
    color: #9ca3af;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: block;
  }

  .field-value {
    font-size: 16px;
    color: #111827;
    padding: 10px 14px;
    background: #f8f7f4;
    border-radius: 10px;
    border: 1.5px solid transparent;
  }

  .field-input {
    font-family: 'Sarabun', sans-serif;
    font-size: 16px;
    color: #111827;
    padding: 10px 14px;
    background: #fff;
    border-radius: 10px;
    border: 1.5px solid #2d5fa0;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .field-input:focus {
    border-color: #1e3a5f;
    box-shadow: 0 0 0 3px rgba(45,95,160,0.12);
  }

  .divider { height: 1px; background: #f0eeea; margin: 1.5rem 0; }

  .section-title {
    font-size: 13px;
    font-weight: 600;
    color: #6b7280;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  .btn {
    font-family: 'Sarabun', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 22px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.18s;
    border: none;
  }

  .btn-primary { background: #1e3a5f; color: #fff; }
  .btn-primary:hover { background: #2d5fa0; transform: translateY(-1px); }
  .btn-success { background: #059669; color: #fff; }
  .btn-success:hover { background: #047857; transform: translateY(-1px); }
  .btn-ghost { background: #f3f4f6; color: #374151; border: 1px solid #e5e7eb; }
  .btn-ghost:hover { background: #e5e7eb; }

  .btn-row { display: flex; gap: 10px; margin-top: 1.5rem; }

  .notice {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 8px;
    margin-top: 1rem;
    animation: fadeIn 0.3s ease;
  }

  .notice-success { color: #059669; background: #ecfdf5; }
  .notice-error { color: #dc2626; background: #fef2f2; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .password-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #f8f7f4;
    border-radius: 10px;
  }

  .btn-link {
    font-family: 'Sarabun', sans-serif;
    font-size: 13px;
    color: #2d5fa0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-weight: 500;
  }

  .btn-link:hover { text-decoration: underline; }

  .pw-form {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeIn 0.2s ease;
  }
`;

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [notice, setNotice] = useState(null);
  const [showPwForm, setShowPwForm] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", phone: "" });
  const [temp, setTemp] = useState({ username: "", email: "", phone: "" });
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");

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
            phone: data.phone || ""
          };
          setForm(loaded);
          setTemp(loaded);
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
        body: JSON.stringify(temp)
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
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <p className="profile-header-title">บัญชีผู้ใช้</p>
            <h2 className="profile-header-name">{form.username || "..."}</h2>
            <div className="profile-avatar-wrap">
              {form.username ? form.username.charAt(0).toUpperCase() : "?"}
            </div>
          </div>

          <div className="profile-body">
            <p className="section-title">ข้อมูลส่วนตัว</p>

            <div className="field-group">
              <span className="field-label">ชื่อผู้ใช้งาน</span>
              {isEditing
                ? <input className="field-input" name="username" value={temp.username} onChange={(e) => setTemp({ ...temp, username: e.target.value })} />
                : <div className="field-value">{form.username}</div>
              }
            </div>

            <div className="field-group">
              <span className="field-label">อีเมล</span>
              {isEditing
                ? <input className="field-input" name="email" value={temp.email} onChange={(e) => setTemp({ ...temp, email: e.target.value })} type="email" />
                : <div className="field-value">{form.email || "-"}</div>
              }
            </div>

            <div className="field-group">
              <span className="field-label">เบอร์โทรศัพท์</span>
              {isEditing
                ? <input className="field-input" name="phone" value={temp.phone} onChange={(e) => setTemp({ ...temp, phone: e.target.value })} />
                : <div className="field-value">{form.phone || "-"}</div>
              }
            </div>

            <div className="btn-row">
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>แก้ไขข้อมูล</button>
              ) : (
                <>
                  <button className="btn btn-success" onClick={handleSave}>บันทึก</button>
                  <button className="btn btn-ghost" onClick={handleCancel}>ยกเลิก</button>
                </>
              )}
            </div>

            {notice && (
              <div className={`notice notice-${notice.type}`}>
                <span>{notice.type === "success" ? "✓" : "✕"}</span> {notice.msg}
              </div>
            )}

            <div className="divider" />

            <p className="section-title">รหัสผ่าน</p>
            <div className="password-row">
              <span style={{ fontSize: 15, color: "#374151" }}>••••••••</span>
              <button className="btn-link" onClick={() => { setShowPwForm(!showPwForm); setPwError(""); }}>
                {showPwForm ? "ยกเลิก" : "เปลี่ยนรหัสผ่าน"}
              </button>
            </div>

            {showPwForm && (
              <div className="pw-form">
                <input className="field-input" type="password" placeholder="รหัสผ่านปัจจุบัน"
                  value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })} />
                <input className="field-input" type="password" placeholder="รหัสผ่านใหม่"
                  value={pwForm.next} onChange={(e) => setPwForm({ ...pwForm, next: e.target.value })} />
                <input className="field-input" type="password" placeholder="ยืนยันรหัสผ่านใหม่"
                  value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} />
                {pwError && <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{pwError}</p>}
                <div>
                  <button className="btn btn-primary" onClick={handlePasswordSave}>บันทึกรหัสผ่าน</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
