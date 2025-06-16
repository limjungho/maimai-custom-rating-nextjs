// pages/_app.js

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import { Toaster } from "@/components/ui/sonner";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="content">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
