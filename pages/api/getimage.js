//import sqlite3 from "sqlite3";
import { neon } from "@neondatabase/serverless";

export default async (req, res) => {
  //const { musicname } = req.query;
  //console.log(friendcode);

  try {
    // Connect to the Neon database
    const sqlneon = neon(`${process.env.DATABASE_URL}`);

    const sqlselect =
      "SELECT musicname, imglink, dxstd, difficulty, level, subname FROM musiclevel WHERE level > 13.5";
    const row = await sqlneon(sqlselect);
    if (row) {
      res.status(200).json({ data: row });
    } else {
      res.status(200).json({ data: null });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
};
