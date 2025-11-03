import fs from "fs";
import path from "path";

export const logError = (message) => {
    const logDir = "logs";
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    const fileName = `log_${new Date().toISOString().slice(0,10).replace(/-/g, '')}.log`;
    const logPath = path.join(logDir, fileName);

    const time = new Date().toLocaleString();
    fs.appendFileSync(logPath, `[${time}] ${message}\n`);
};