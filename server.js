import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.get("/api/data", (req, res) => {
  fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/contributer", (req, res) => {
  fs.readFile(path.join(__dirname, "contributer.json"), "utf-8", (err, contributer) => {
    if (err) {
      console.error("Error reading contributer file:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.json(JSON.parse(contributer));
  });
});

export default app; // Required for Vercel
