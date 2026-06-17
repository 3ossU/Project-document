import { useEffect, useState } from "react";
import { Table, InputGroup, Form, Button, Modal, Row, Col } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Verify = () => {
  const [usersRaw, setUsersRaw] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    const text = searchText.toLowerCase().trim();

    if (text === "") {
      setUsers(usersRaw);
    } else {
      const filtered = usersRaw.filter((user) => {
        const nameMatch = user.name ? user.name.toLowerCase().includes(text) : false;
        const userIdMatch = user.userId ? user.userId.toString().toLowerCase().includes(text) : false;
        const idMatch = user.id ? user.id.toString().includes(text) : false;

        return nameMatch || userIdMatch || idMatch;
      });
      setUsers(filtered);
      setCurrentPage(1);
    }
  }, [searchText, usersRaw]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/admin/verify-seller");
        const data = await res.json();

        console.log("DATA:", data);

        setUsersRaw(data);
        setUsers(data);

      } catch (err) {
        console.error("ERROR:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setUsers(usersRaw);
  }, [usersRaw]);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setUsers(usersRaw);
    } else {
      const text = searchText.toLowerCase().trim();
      const filtered = usersRaw.filter((user) => {
        const nameMatch = user.name ? user.name.toLowerCase().includes(text) : false;
        const userIdMatch = user.userId ? user.userId.toString().toLowerCase().includes(text) : false;
        const idMatch = user.id ? user.id.toString().includes(text) : false;

        return nameMatch || userIdMatch || idMatch;
      });
      setUsers(filtered);
      setCurrentPage(1);
    }
  };

  const handleApproveUser = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/approve-seller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedUser.id,
          username: selectedUser.name,
          namesurname: selectedUser.NS,
          email: selectedUser.email,
          phone: selectedUser.phone,
          address: selectedUser.address,
          role_id: 2
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("ยืนยันตัวตนสำเร็จ!");

        const updated = usersRaw.filter(u => u.id !== selectedUser.id);
        setUsersRaw(updated);
        setUsers(updated);

        setLgShow(false);
      } else {
        alert("เกิดข้อผิดพลาด: " + data.message);
      }

    } catch (err) {
      console.error("ERROR:", err);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  const handleRejectUser = async () => {
    if (!selectedUser) return;

    const confirmReject = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการปฏิเสธคำขอของ ${selectedUser.name}?`);
    if (!confirmReject) return;

    try {
      const res = await fetch(`http://localhost:3000/admin/reject-seller/${selectedUser.id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (res.ok) {
        alert("ปฏิเสธคำขอสำเร็จ ระบบได้ลบข้อมูลคำขอนี้แล้ว");

        const updated = usersRaw.filter(u => u.id !== selectedUser.id);
        setUsersRaw(updated);
        setUsers(updated);

        setLgShow(false);
      } else {
        alert("เกิดข้อผิดพลาด: " + data.message);
      }

    } catch (err) {
      console.error("ERROR:", err);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };


  return (
    <>
      {/* modalstart */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title><strong>Verify</strong> </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedUser && (
            <>
              <Row>
                {/* <Col md={6} className="d-flex justify-content-center">
                  <img
                    src={selectedUser.profile}
                    alt="profile"
                    style={{
                      width: "140px",
                      height: "140px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #ddd",
                    }}
                  />
                </Col> */}
              </Row>

              <div className="mt-4" style={{ lineHeight: "2rem" }}>
                <p><strong>User ID :</strong> {selectedUser.userId}</p>
                <p><strong>ชื่อผู้ใช้งาน :</strong> {selectedUser.name}</p>
                <p><strong>ชื่อและนามสกุล :</strong> {selectedUser.NS}</p>
                <p><strong>บทบาท :</strong> {selectedUser.role}</p>
                <p><strong>ที่อยู่ :</strong> {selectedUser.address ?? "-"}</p>
                <p><strong>เบอร์ติดต่อ :</strong> {selectedUser.phone ?? "-"}</p>
                <p><strong>Email :</strong> {selectedUser.email ?? "-"}</p>
                {selectedUser.role === "Seller" && (
                  <a
                    href={`http://localhost:3000/download/${selectedUser.document}`}
                    download
                  >
                    ดาวน์โหลดเอกสารยืนยันตัวตนคนขาย
                  </a>
                )}
              </div>

              <div className="d-flex justify-content-end mt-3">
                <Button variant="success" onClick={handleApproveUser}>
                  ยืนยันตัวตน
                </Button>
                &nbsp;
                <Button variant="danger" onClick={handleRejectUser}>
                  ปฏิเสธ
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      {/* -----modalend--- */}

      <div className="d-flex justify-content-between w-75 m-auto mt-5">
        <div>
          <h1><strong>Verify list</strong></h1>
        </div>

        <div>
          <InputGroup
            className="rounded-pill border border-dark"
            style={{
              width: "600px",
              position: "relative",
            }}
          >
            <Form.Control
              placeholder="Username, UserId"
              className="border-0 rounded-pill"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                boxShadow: "none",
                paddingLeft: "20px",
                paddingRight: "40px",
              }}
            />
            <Button
              variant="light"
              className="border-0 position-absolute end-0 me-2 bg-transparent"
              style={{ zIndex: 10 }}
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </div>
      </div>

      <div className="w-75 m-auto">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th style={{ width: "3rem" }}>ID</th>
              <th>Username</th>
              <th style={{ width: "6rem" }}>Role</th>
              <th style={{ width: "8rem" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="text-center">{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setSelectedUser(user);
                        setLgShow(true);
                      }}
                    >
                      Inspect <i className="bi bi-search"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  ไม่พบผู้ใช้ที่ตรงกับคำค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center align-items-center gap-4 my-3">
        <Button
          variant="dark"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </Button>

        <span>{currentPage} / {totalPages === 0 ? 1 : totalPages}</span>

        <Button
          variant="dark"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default Verify;
