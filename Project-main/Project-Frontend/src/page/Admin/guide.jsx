import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Postguide = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "", content: "" });
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const fetchArticles = async () => {
    try {
      const res = await fetch("http://localhost:3000/articles");
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch articles error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert("กรุณากรอกหัวข้อและเนื้อหา");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ title: "", description: "", image: "", content: "" });
        setShowForm(false);
        fetchArticles();
      } else {
        alert("เกิดข้อผิดพลาด: " + data.message);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?")) return;
    try {
      const res = await fetch(`http://localhost:3000/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchArticles();
      } else {
        const data = await res.json();
        alert("เกิดข้อผิดพลาด: " + data.message);
      }
    } catch (err) {
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("th-TH", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <>
      <div className="w-75 m-auto mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1><strong>จัดการบทความ</strong></h1>
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <i className="bi bi-plus-lg me-2"></i>เพิ่มบทความ
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-muted mt-5">กำลังโหลด...</p>
        ) : (
          <Table striped bordered hover>
            <thead className="table-dark">
              <tr>
                <th style={{ width: "3rem" }}>ID</th>
                <th>หัวข้อ</th>
                <th>คำอธิบาย</th>
                <th style={{ width: "14rem" }}>วันที่สร้าง</th>
                <th style={{ width: "6rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.length > 0 ? articles.map((a) => (
                <tr key={a.id}>
                  <td className="text-center">{a.id}</td>
                  <td>{a.title}</td>
                  <td className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {a.description || "-"}
                  </td>
                  <td style={{ fontSize: "0.85rem" }}>{formatDate(a.createdAt)}</td>
                  <td className="text-center">
                    <Button variant="danger" size="sm" onClick={() => handleDelete(a.id)}>
                      <i className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">ยังไม่มีบทความ</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      {/* Modal เพิ่มบทความ */}
      <Modal size="lg" show={showForm} onHide={() => !submitting && setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title><strong>เพิ่มบทความใหม่</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label><strong>หัวข้อบทความ <span className="text-danger">*</span></strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="ใส่หัวข้อบทความ"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>คำอธิบายสั้น</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="ใส่คำอธิบายสั้นๆ ที่จะแสดงในหน้ารายการ"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>URL รูปภาพปก</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="https://example.com/image.jpg"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><strong>เนื้อหาบทความ <span className="text-danger">*</span></strong></Form.Label>
              <Form.Control
                as="textarea"
                rows={12}
                placeholder="ใส่เนื้อหาบทความ (ขึ้นบรรทัดใหม่สำหรับแต่ละย่อหน้า)"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowForm(false)} disabled={submitting}>
                ยกเลิก
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Postguide;
