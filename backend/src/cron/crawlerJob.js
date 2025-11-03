import cron from "node-cron";
import { crawlTuoiTre } from "../services/crawlerService.js";

cron.schedule("*/30 * * * *", async () => {
    console.log("Starting crawler job...");
    await crawlTuoiTre();
});