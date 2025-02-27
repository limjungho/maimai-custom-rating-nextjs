//import sqlite3 from "sqlite3";
import { neon } from "@neondatabase/serverless";

export default async (req, res) => {
  const { friendcode } = req.query;
  //console.log(friendcode);

  if (!friendcode) {
    res.status(400).json({ error: "Friendcode is required" });
    return;
  }
  try {
    // SQLite 데이터베이스 연결 생성
    // Neon DB 접근으로 수정 - 25.02.27.
    // const db = new sqlite3.Database("./musiclevel.db", (err) => {
    //   if (err) {
    //     console.error(err.message);
    //     res.status(500).json({ error: "Database connection error" });
    //     return;
    //   }
    // });

    // Connect to the Neon database
    const sqlneon = neon(`${process.env.DATABASE_URL}`);

    const sqlselect = "SELECT * FROM userinfo WHERE friendcode = $1";
    const row = await sqlneon(sqlselect, [friendcode]);
    if (row) {
      res.status(200).json({ isValid: true, data: row });
    } else {
      res.status(200).json({ isValid: false, data: null });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};
