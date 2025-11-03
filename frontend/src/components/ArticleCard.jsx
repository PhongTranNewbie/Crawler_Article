export default function ArticleCard({ article }) {
    const thumnail = article.ArticleMedia?.[0]?.url;

    return (
        <div style= {{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff",
        }}>
            {thumnail && (
                <img src={thumnail} alt={article.title} style={{ width: "100%", height: "150px", objectFit: "cover"}}/>
            )}
            <div style={{ padding: "10px" }}>
                <h3 style={{ fontSize: "1rem"}}>{article.title}</h3>
                <p style={{ fontSize: "0,9rem", color: "#555"}}>{article.summary}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Đọc bài viết →
                </a>
            </div>
        </div>
    );
}