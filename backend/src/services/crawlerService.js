import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/article.js";
import Category from "../models/category.js";
import ArticleMedia from "../models/articleMedia.js";
import { logError } from "../utils/logger.js";

/**
 * Crawl dữ liệu từ trang chủ báo Tuổi Trẻ.
 * Bao gồm: title, summary, thumbnail, category, và lưu DB.
 */
export const crawlTuoiTre = async () => {
  try {
    const { data } = await axios.get("https://tuoitre.vn/");
    const $ = cheerio.load(data);
    const articles = [];

    // ✅ Lấy bài viết từ trang chủ
    $(".item-first, .box-category-item").each((_, element) => {
      const aTag = $(element).find("a.box-category-link-title");
      const title = aTag.attr("title")?.trim() || aTag.text().trim();
      const urlPath = aTag.attr("href");

      if (!urlPath || !title) return;

      const url = urlPath.startsWith("http")
        ? urlPath
        : `https://tuoitre.vn${urlPath}`;

      const summary = $(element).find("p.box-category-sapo").text().trim() || "";
      const thumbnail =
        $(element).find("img").attr("src") ||
        $(element).find("img").attr("data-src") ||
        null;

      articles.push({ title, url, summary, thumbnail });
    });

    console.log(`✅ Found ${articles.length} articles to process`);

    // ✅ Lưu vào DB (và lấy category từ trang chi tiết)
    for (const item of articles) {
      try {
        // Gọi tới trang chi tiết để lấy category
        const { data: detailHtml } = await axios.get(item.url);
        const $$ = cheerio.load(detailHtml);

        const categoryTag = $$(".detail-cate a").first();
        const categoryName = categoryTag.text().trim() || "Khác";
        let categorySlug =
          categoryTag.attr("href")?.replace(".htm", "").replace("/", "") ||
          "khac";

        // Nếu không có slug hợp lệ
        if (!categorySlug) categorySlug = "khac";

        // ✅ Lưu Category
        const [category] = await Category.findOrCreate({
          where: { slug: categorySlug },
          defaults: { name: categoryName },
        });

        // ✅ Lưu Article
        const [article, created] = await Article.findOrCreate({
          where: { url: item.url },
          defaults: {
            title: item.title,
            summary: item.summary,
            categoryId: category.id,
            crawled_at: new Date(),
          },
        });

        // ✅ Lưu Media
        if (created && item.thumbnail) {
          await ArticleMedia.create({
            url: item.thumbnail,
            type: "image",
            articleId: article.id,
          });
        }

        console.log(`📰 Saved article: ${item.title} [${categoryName}]`);
      } catch (err) {
        console.error(`⚠️ Error processing article: ${item.title}`);
        logError(`Article save error: ${err.message}`);
      }
    }

    console.log("✅ Crawl completed successfully!");
  } catch (error) {
    console.error("❌ Error crawling Tuoi Tre:", error.message);
    logError(`Crawler error: ${error.message}`);
  }
};

// ✅ Tự chạy khi gọi trực tiếp file
if (process.argv[1].includes("crawlerService.js")) {
  console.log("🚀 Starting crawler for Tuoi Tre...");
  crawlTuoiTre()
    .then(() => {
      console.log("✅ Crawl finished successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("❌ Crawler failed:", err);
      process.exit(1);
    });
}
