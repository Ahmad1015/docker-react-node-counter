import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getDbConnection } from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET current count

app.get("/api/counter", async (req, res) => {
  const db = await getDbConnection();
  const result = await db.query("SELECT value FROM counter WHERE id = 1");
  res.json({ value: result.rows[0]?.value ?? 0 });
});

// POST update count

app.post("/api/counter", async (req, res) => {
  const { value } = req.body;
  const db = await getDbConnection();
  await db.query("UPDATE counter SET value = $1 WHERE id = 1", [value]);
  res.json({ success: true, value });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
