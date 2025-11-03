import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";

export default function HomePage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/articles")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setArticles(data.data || []);
            })
            .catch((error) => console.error("Error fetching articles:", error));
    }, [])

    return (
        <div style={{ padding: "20px" }}>
            <h1>Tin mới từ Tuổi trẻ</h1>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"}}>
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}