// pages/about.js

import Head from "next/head";
import React, { useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Help() {
  return (
    <div className={styles.helpContainer}>
      <Head>
        <title>Help Page</title>
        <meta name="description" content="Help Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.helpTitle}>북마크 등록</h1>

        <p className={styles.helpDescription}>1. 하단의 링크를 복사합니다.</p>
        <textarea
          className={styles.textareaWrapper}
          type="text"
          value="javascript:(function(){var script = document.createElement('script'); script.src = 'https://maimai-custom-rating.vercel.app/bookmark.js'; document.body.appendChild(script);})();"
          readonly
        ></textarea>
        <p className={styles.helpDescription}>
          2. 브라우저의 북마크 관리자를 엽니다.
          <br />
          (크롬 브라우저의 경우 단축키 : Ctrl+Shift+O 또는 더보기 → 북마크 및
          목록 → 북마크 관리자 → 새 북마크 추가)
        </p>
        <p className={styles.helpDescription}>
          3. Rating Update와 같은 이름으로 설정 후 1번의 링크를 붙여넣기 하여
          추가합니다.
        </p>
        <h1 className={styles.helpTitle}>북마크 실행</h1>
        <p className={styles.helpDescription}>
          1. maimai DX NET 홈페이지에 로그인합니다.
          <a
            className={styles.aWrapper}
            href="https://maimaidx-eng.com/maimai-mobile/home/"
            target="_blank"
            rel="noopener noreferrer"
          >
            (링크)
          </a>
        </p>

        <p className={styles.helpDescription}>
          2. maimai DX NET 홈페이지에서 추가한 북마크를 클릭하고 알림 창이 뜨면
          갱신이 완료됩니다.
        </p>
      </main>
    </div>
  );
}
