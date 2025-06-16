import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function ToggleImage({ src }) {
  const [isGray, setIsGray] = useState(false);
  const [borderColor, setBorderColor] = useState("#C27FF4"); // 초기 색상
  const colors = ["#FA6C75", "#C27FF4", "#E5DDEA"];

  // border 클릭 시 색상 변경
  const handleBorderClick = () => {
    const currentIndex = colors.indexOf(borderColor);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    setBorderColor(nextColor);
  };

  return (
    <div
      style={{
        display: "inline-block",
        border: `10px solid ${borderColor}`,
        cursor: "pointer",
        width: "200px",
        height: "200px",
        boxSizing: "border-box",
        filter: isGray ? "grayscale(100%) brightness(50%)" : "none",
        transition: "filter 0.5s ease-in-out",
        cursor: "pointer",
      }}
      onClick={handleBorderClick}
    >
      <Image
        src={src}
        alt="Toggle Image"
        width={200}
        height={200}
        onClick={(e) => {
          e.stopPropagation(); // 상위 div 클릭 방지
          setIsGray((prev) => !prev);
        }}
        style={{
          filter: isGray ? "grayscale(100%) brightness(50%)" : "none",
          transition: "filter 0.5s ease-in-out",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default function Home() {
  const [friendcode, setfriendcode] = useState("");
  const router = useRouter();
  const [showFooter, setShowFooter] = useState(false);

  const [images, setImages] = useState([
    {
      link: "e5a64880bc872e8b",
      isGray: false,
    },
    {
      link: "60d2b1b662ae5823",
      isGray: false,
    },
    {
      link: "be3cf43e80e9462e",
      isGray: false,
    },
    {
      link: "5c4531323f4aadcf",
      isGray: false,
    },
    {
      link: "a259af51e0b9d863",
      isGray: false,
    },
    {
      link: "92fed24b2755bbb4",
      isGray: false,
    },
    {
      link: "cb40822c0f5a3ec1",
      isGray: false,
    },
    {
      link: "8043243d47cacaee",
      isGray: false,
    },
  ]);

  useEffect(() => {
    setShowFooter(true);
  }, []);

  if (!showFooter) {
    return null;
  }

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
          {images.map(({ link, isGray }) => (
            <ToggleImage
              key={link}
              src={`https://maimaidx-eng.com/maimai-mobile/img/Music/${link}.png`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
