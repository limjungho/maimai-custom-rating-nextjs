//import sqlite3 from "sqlite3";
import Cors from "cors";
import { neon } from "@neondatabase/serverless";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// CORS 미들웨어 초기화
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "https://maimaidx-eng.com", // 허용할 도메인
});

// 미들웨어 사용 헬퍼 함수
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // CORS 미들웨어 실행
  await runMiddleware(req, res, cors);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const {
    musicnamedata,
    dxstddata,
    difficultydata,
    musicscoredata,
    fcapdata,
    friendcode,
    playername,
    originalrating,
  } = req.body;
  //console.log(musicnamedata);
  //console.log(dxstddata);
  //console.log(difficultydata);

  // SQLite 데이터베이스 연결 생성
  // const db = new sqlite3.Database("./musiclevel.db", (err) => {
  //   if (err) {
  //     console.error(err.message);
  //     res.status(500).json({ error: "Database connection error" });
  //     return;
  //   }
  // });
  // Neon DB 접근으로 수정 - 25.02.27.

  const RatingList = [];

  // Connect to the Neon database
  const sqlneon = neon(`${process.env.DATABASE_URL}`);

  const sqlselect = "SELECT * FROM musiclevel";
  const row = await sqlneon(sqlselect);
  if (row) {
    const jsonArray = JSON.parse(JSON.stringify(row));
    //console.log(jsonArray);
    var musicrating = 0;
    var musicdata = [];
    for (let i = 0; i < musicnamedata.length; i++) {
      //console.log(musicnamedata[i], dxstddata[i], difficultydata[i]);
      try {
        musicdata = jsonArray.filter(
          (item) =>
            item.musicname === musicnamedata[i] &&
            item.dxstd === dxstddata[i] &&
            item.difficulty === difficultydata[i]
        );
        //console.log(musicnamedata[i]);
      } catch (error) {
        console.log("Music Data Not Found : ", error);
      }

      var achiv = parseFloat(musicscoredata[i].slice(0, -1)) / 100.0;
      var achivnum = 0;
      if (achiv >= 1.005) {
        achivnum = 22.4;
      } else if (achiv >= 1.0) {
        achivnum = 21.6;
      } else if (achiv >= 0.995) {
        achivnum = 21.1;
      } else if (achiv >= 0.99) {
        achivnum = 20.8;
      } else if (achiv >= 0.98) {
        achivnum = 20.3;
      } else if (achiv >= 0.97) {
        achivnum = 20.0;
      }
      try {
        if (achiv >= 1.005) {
          musicrating = parseInt(musicdata[0].level * 1.005 * achivnum);
        } else {
          musicrating = parseInt(musicdata[0].level * achiv * achivnum);
        }
        if (achiv >= 1.008) {
          musicrating += 3;
        }
        if (fcapdata[i] === "AP" || fcapdata[i] === "AP+") {
          musicrating += 3;
        } else if (fcapdata[i] === "FC+") {
          musicrating += 1;
        }
      } catch (error) {
        console.log("music rating Error : ", error);
      }

      //RatingList에 rating 추가
      RatingList.push({
        musicrating: musicrating,
        musicname: musicnamedata[i],
        dxstd: dxstddata[i],
        difficulty: difficultydata[i],
        level: musicdata[0].level,
        musicscore: musicscoredata[i],
        fcap: fcapdata[i],
      });
    }

    RatingList.sort(
      (a, b) =>
        b.musicrating - a.musicrating || a.musicname.localeCompare(b.musicname)
    );
    //console.log(RatingList);

    const CustomRatingCount = Math.min(RatingList.length, 50);
    const newRatingList = RatingList.slice(0, CustomRatingCount);
    //console.log(newRatingList);
    var CustomRating = 0;
    newRatingList.forEach((musicdata) => {
      CustomRating += musicdata.musicrating;
    });
    //console.log(CustomRating);
    //console.log(newRatingList);

    const sqldel = "DELETE FROM userinfo WHERE friendcode = $1";
    await sqlneon(sqldel, [friendcode]);
    for (let j = 0; j < CustomRatingCount; j++) {
      const sqlinsert =
        "INSERT INTO userinfo (friendcode, id, playername, originalrating, customrating, musicrating, musicname, dxstd, difficulty, level, musicscore, fcap) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";
      await sqlneon(sqlinsert, [
        friendcode,
        "tmp",
        playername,
        originalrating,
        CustomRating,
        RatingList[j].musicrating,
        RatingList[j].musicname,
        RatingList[j].dxstd,
        RatingList[j].difficulty,
        RatingList[j].level,
        RatingList[j].musicscore,
        RatingList[j].fcap,
      ]);
    }
  } else {
    console.log("No data found.");
  }

  //musiclevel db의 정보 select 하여 rating 계산

  // db.all(sql, (err, row) => {
  //   if (err) {
  //     console.error(err.message);
  //     return;
  //   }

  //   //----------------------------------------------25.02.25.
  //   db.run(
  //     "DELETE FROM userinfo WHERE friendcode = ?",
  //     [friendcode],
  //     function (err) {
  //       if (err) {
  //         return console.error(err.message);
  //       }
  //       // 새로운 레코드 삽입
  //       for (let j = 0; j < CustomRatingCount; j++) {
  //         const sql2 =
  //           "INSERT INTO userinfo (friendcode, id, playername, originalrating, customrating, musicrating, musicname, dxstd, difficulty, level,musicscore,fcap) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //         db.run(
  //           sql2,
  //           [
  //             friendcode,
  //             "tmp",
  //             playername,
  //             originalrating,
  //             CustomRating,
  //             RatingList[j].musicrating,
  //             RatingList[j].musicname,
  //             RatingList[j].dxstd,
  //             RatingList[j].difficulty,
  //             RatingList[j].level,
  //             RatingList[j].musicscore,
  //             RatingList[j].fcap,
  //           ],
  //           function (err) {
  //             if (err) {
  //               return console.error(err.message);
  //             }
  //           }
  //         );
  //       }
  //     }
  //   );

  //   // 데이터베이스 연결 종료
  //   db.close((err) => {
  //     if (err) {
  //       console.error(err.message);
  //     }
  //   });
  // });
}
