// pages/_app.js

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className="content">
        <Component {...pageProps} />
      </div>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} HowlingSoul All rights reserved.
      </footer>
    </>
  );
}

export default MyApp;
