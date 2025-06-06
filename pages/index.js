import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [friendcode, setfriendcode] = useState("");
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: "/rating",
      query: { friendcode },
    });
  };

  const handleLinkClick = () => {
    window.open(
      "https://maimaidx-eng.com/maimai-mobile/friend/userFriendCode/",
      "_blank"
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>maimaiDX Custom Rating</title>
        <meta name="description" content="Main Page" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="maimaiDX Custom Rating" />
        <meta
          property="og:description"
          content="maimaiDX 커스텀 레이팅 웹서비스"
        />
        <meta
          property="og:image"
          content="https://www.maimaicustomrating.site/ogImage.png"
        />
        <meta
          property="og:url"
          content="https://www.maimaicustomrating.site/"
        />
        <meta property="og:type" content="website" />
      </Head>

      <main className={styles.main}>
        <img src="/maimaidxprism.jpg" className={styles.main_image}></img>
        <h1 className={styles.title}>maimaiDX Custom Rating</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={friendcode}
            onChange={(e) => setfriendcode(e.target.value)}
            placeholder="maimaiDX friend code를 입력하세요(숫자만 입력 가능)"
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
        <p className={styles.linkText} onClick={handleLinkClick}>
          maimaiDX NET 사이트에서 friend code를 확인하려면 클릭하세요.
        </p>
      </main>
    </div>
  );
}
