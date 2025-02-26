// pages/about.js

import Head from "next/head";
import React, { useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function whatiscustomrating() {
  return (
    <div className={styles.helpContainer}>
      <Head>
        <title>Custom Rating Explain Page</title>
        <meta name="description" content="Custom Rating Explain Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.helpTitle}>Custom Rating 이란?</h1>
        <p className={styles.helpDescription}>
          ○ 기존의 Rating에서 상위권 유저들을 위한 세분화된 Custom Rating
          입니다.
        </p>
        <p className={styles.helpDescription}>
          ○ Custom Rating 에서는 신곡과 구곡을 구분하지 않고 Rating 상위 50곡에
          대해 계산합니다.
        </p>
        <p className={styles.helpDescription}>
          ○ 기존의 Rating에서는 100.5000%(SSS+) 달성으로 그 곡의 점수를 최대로
          얻을 수 있지만, Custom Rating에서는 그보다 더 높은 성과에 대해 다음과
          같이 추가 Rating 점수를 부여합니다.
        </p>
        <p className={styles.helpDescription}>
          - Achievement 100.8000% 이상 : +3점 추가
          <br />
          - FULL COMBO+ 달성 : +1점 추가
          <br />
          - ALL PERFECT 달성 : +3점 추가
          <br />
          (FC+ 달성 이후 AP 달성 시 +2점)
        </p>
        <p className={styles.helpDescription}>
          ○ 기존의 Rating과 비교하여 한 곡에서 얻을 수 있는 Rating 점수는 최대
          6점을 더 획득 할 수 있습니다.
        </p>
        <p className={styles.helpDescription}>
          ○ 명시되지 않은 부분은 기존의 Rating과 동일합니다.
        </p>
        <p className={styles.helpDescription}>
          ○ 현재 Beta Test 중으로 Rating 계산에 오차가 발생할 수 있습니다.
        </p>
      </main>
    </div>
  );
}
