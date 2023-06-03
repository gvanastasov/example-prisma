const fs = require("fs");
const path = require("path");

/**
 * @description simple file copy paste since we are using sqlite.
 */
function backup() {
    const dbName = "dev";
    const sourcePath = path.resolve(__dirname, `../${dbName}.db`);
    const backupDirectory = path.resolve(__dirname, "../backup/");
    const backupFileName = `${dbName}_backup_${getCurrentDateTime()}.db`;
    const backupPath = path.join(backupDirectory, backupFileName);

    console.log("Starting backup...");
    console.log(`source: ${sourcePath}`);
    console.log(`destination: ${backupPath}`);

    fs.copyFile(sourcePath, backupPath, (err) => {
        if (err) {
            console.error("Error creating backup:", err);
        } else {
            console.log("Backup created successfully.");
        }
    });
}

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

backup();