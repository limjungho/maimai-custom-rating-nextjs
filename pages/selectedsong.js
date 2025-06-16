import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function ToggleImage({ src }) {
  const [isGray, setIsGray] = useState(false);

  return (
    <Image
      src={src}
      alt="Toggle Image"
      width={200}
      height={200}
      style={{
        filter: isGray ? "grayscale(100%) brightness(50%)" : "none",
        transition: "filter 0.5s ease-in-out",
        cursor: "pointer",
        border: "10px solid #C27FF4",
      }}
      onClick={() => setIsGray(!isGray)}
    />
  );
}

export default function Home() {
  const [friendcode, setfriendcode] = useState("");
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(false);

  const images = [
    "e5a64880bc872e8b",
    "60d2b1b662ae5823",
    "be3cf43e80e9462e",
    "5c4531323f4aadcf",
    "a259af51e0b9d863",
    "92fed24b2755bbb4",
    "2c80b1a894f03420",
    "cb40822c0f5a3ec1",
  ];

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
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            backgroundColor: "#00FF00",
            padding: "300px",
          }}
        >
          {images.map((image, index) => (
            <ToggleImage
              key={index}
              src={`https://maimaidx-eng.com/maimai-mobile/img/Music/${image}.png`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
