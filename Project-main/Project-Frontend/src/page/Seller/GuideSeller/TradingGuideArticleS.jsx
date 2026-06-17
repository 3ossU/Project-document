import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TradingGuideArticleS = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/articles/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error('ไม่พบบทความ');
                return res.json();
            })
            .then((data) => setArticle(data))
            .catch((err) => setError(err.message || 'โหลดบทความไม่สำเร็จ'))
            .finally(() => setLoading(false));
    }, [id]);

    const sectionStyle = {
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        lineHeight: "1.6",
    };

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>กำลังโหลดบทความ...</div>;
    if (error) return <div style={{ padding: '2rem', color: 'red', textAlign: 'center' }}>{error}</div>;
    if (!article) return null;

    return (
        <div style={{ background: "#f6f7fb", minHeight: "100vh", paddingBottom: "50px" }}>

            <div style={{ padding: "20px", background: "#0c2a5b" }}>
                <Link
                    to="/seller/trading-guide"
                    style={{ textDecoration: "none", color: "#fff", fontWeight: "bold", fontSize: "16px" }}
                >
                    ← กลับ
                </Link>
            </div>

            <div style={{
                textAlign: "center",
                background: "#0c2a5b",
                padding: "40px 20px",
                color: "white",
                marginBottom: "40px"
            }}>
                <h2 style={{ marginBottom: "10px", fontSize: "28px", fontWeight: "bold", maxWidth: "800px", margin: "0 auto 12px" }}>
                    {article.title}
                </h2>
                {article.createdAt && (
                    <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "20px" }}>
                        {new Date(article.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                )}
                {article.image && (
                    <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: "100%", maxWidth: "600px", borderRadius: "12px", display: "block", margin: "0 auto" }}
                    />
                )}
            </div>

            <div style={{ width: "88%", margin: "auto" }}>
                <div style={sectionStyle}>
                    {article.content.split('\n').map((line, i) => (
                        line.trim() === '' ? <br key={i} /> : <p key={i} style={{ margin: '0 0 8px' }}>{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TradingGuideArticleS;
