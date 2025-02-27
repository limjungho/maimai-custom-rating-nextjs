import Head from "next/head";
//import styles from "../styles/rating.css";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DataTable = ({ data }) => {
  return (
    <div className={styles.tableWrapper}>
      <h1 className={styles.tableTitle}>In Rating Music List</h1>
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Musicname</th>
              <th>DX STD</th>
              <th>Difficulty</th>
              <th>Level</th>
              <th>Score</th>
              <th>FC AP</th>
              <th>Music Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className={styles.leftAlign}>{item.musicname}</td>
                <td>{item.dxstd}</td>
                <td>{item.difficulty}</td>
                <td>{item.level}</td>
                <td>{item.musicscore}</td>
                <td>{item.fcap}</td>
                <td>{item.musicrating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.ratingTitle}>No data available</p>
      )}
    </div>
  );
};

export default function Rating() {
  const router = useRouter();
  const { friendcode } = router.query; // URL 쿼리 파라미터에서 'friendcode' 변수를 가져옵니다.
  const [fc, setfc] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [csr, setcsr] = useState(null);
  const [pn, setpn] = useState(null);
  const [userdata, setuserdata] = useState(null);
  const [orgr, setorgr] = useState(null);

  useEffect(() => {
    if (friendcode) {
      const regex = /^\d+$/;
      if (!regex.test(friendcode)) {
        setIsValid(false);
        alert("Friendcode는 숫자로만 이루어져야 합니다.");
      } else {
        setIsValid(true);
        setfc(friendcode);

        fetch(`/api/getinfo?friendcode=${friendcode}`)
          .then((response) => response.json())
          .then((resp) => {
            //console.log(resp);
            if (!resp.error) {
              if (Object.keys(resp.data).length > 0) {
                setIsRegistered(true);
                setuserdata(resp.data);
                setcsr(resp.data[0].customrating);
                setpn(resp.data[0].playername);
                setorgr(resp.data[0].originalrating);
              } else {
                setIsRegistered(false);
              }
            }
          })
          .catch((error) => {
            console.error("Error checking friendcode:", error);
          });
      }
    }
  }, [friendcode]);

  return (
    <div className={styles.ratingContainer}>
      <Head>
        <title>Rating Page</title>
        <meta name="description" content="Calculating Custom Rating" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isValid ? (
          <div>
            <h1 className={styles.ratingTitle}>Your Friend Code : {fc}</h1>
          </div>
        ) : (
          <div>
            <h1 className={styles.ratingTitle}>Invalid Friend Code</h1>
          </div>
        )}
        {isRegistered ? (
          <div>
            <h1 className={styles.ratingTitle}>Player Name : {pn}</h1>
            <h1 className={styles.ratingTitle}>
              Your Original Rating : {orgr}
            </h1>
            <h1 className={styles.ratingTitle}>Your Custom Rating : {csr}</h1>
            <DataTable data={userdata} />
          </div>
        ) : (
          <div>
            <h1 className={styles.ratingTitle}>
              아직 등록되지 않은 유저입니다.
              <br />
              Update & Help 탭을 확인해주세요.
            </h1>
          </div>
        )}
      </main>
    </div>
  );
}
