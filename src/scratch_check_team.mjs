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

async function check() {
  await mongoose.connect(MONGODB_URI);
  const Team = mongoose.models.Team || mongoose.model("Team", new mongoose.Schema({}, { strict: false }));
  const AboutPage = mongoose.models.AboutPage || mongoose.model("AboutPage", new mongoose.Schema({}, { strict: false }));
  
  const team = await Team.find().lean();
  console.log("TEAM MEMBERS IN DB:", JSON.stringify(team, null, 2));

  const about = await AboutPage.findOne({ key: "main" }).lean();
  console.log("ABOUT FOUNDERS IN DB:", JSON.stringify(about?.founders, null, 2));

  await mongoose.disconnect();
}

check();
