import fs from "node:fs";
import { parse } from "csv-parse";

async function getRecords() {
    const records = [];
    const parser = fs.createReadStream(`./data/items.csv`).pipe(
        parse({
            columns: true,
        })
    );
    for await (const record of parser) {
        records.push(record);
    }
    return records;
}

async function downloadImage(record) {
    let res;

    try {
        res = await fetch(record["imageLink"], {
            method: "GET",
        });
    } catch (err) {
        console.log("❗ Failed to download Image ID", record["id"]);
        return;
    }

    if (!res || !res.ok) {
        console.log("❗ Failed to download Image ID", record["id"]);
        return;
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    fs.writeFileSync("./public/" + record["id"] + ".png", buffer);

    console.log("✅ Downloaded Image ID", record["id"]);
}

// The images were also resized to reduce download size significantly, using imageresizer.com
// Could not find a good Node.js tool to do the job.

(async () => {
    const records = await getRecords();
    records.forEach(async (record) => {
        if (!fs.existsSync("./public/" + record["id"] + ".png")) {
            await downloadImage(record);
        }
    });
})();

