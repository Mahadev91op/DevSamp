import mongoose from "mongoose";
import dns from "node:dns";
import * as fs from "node:fs";
import * as path from "node:path";

try { dns.setServers(["8.8.8.8", "8.8.4.4"]); } catch (e) {}

const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) process.env[match[1]] = (match[2] || "").trim().replace(/^['"]|['"]$/g, "");
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

async function update() {
  await mongoose.connect(MONGODB_URI);
  const AboutPage = mongoose.models.AboutPage || mongoose.model("AboutPage", new mongoose.Schema({}, { strict: false }));
  
  await AboutPage.updateOne(
    { key: "main" },
    {
      $set: {
        "founders.0.image": "https://lh3.googleusercontent.com/d/1CElg2x75dACo8yxN7fL1Ss3nand2W64V",
      }
    }
  );

  const about = await AboutPage.findOne({ key: "main" }).lean();
  console.log("UPDATED FOUNDER IMAGE:", about.founders[0].image);

  await mongoose.disconnect();
}

update();
