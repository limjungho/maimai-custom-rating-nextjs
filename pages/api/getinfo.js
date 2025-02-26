import sqlite3 from "sqlite3";

export default async (req, res) => {
  const { friendcode } = req.query;
  console.log(friendcode);

  if (!friendcode) {
    res.status(400).json({ error: "Friendcode is required" });
    return;
  }

  try {
    // SQLite 데이터베이스 연결 생성
    const db = new sqlite3.Database("./musiclevel.db", (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Database connection error" });
        return;
      }
    });
    const sql = "SELECT * FROM userinfo WHERE friendcode = ?";
    const params = [friendcode];
    db.all(sql, params, (err, row) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      if (row) {
        res.status(200).json({ isValid: true, data: row });
      } else {
        res.status(200).json({ isValid: false, data: null });
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};
