// components/Navbar.js

import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/whatiscustomrating" className={styles.navLink}>
            Custom Rating이란?
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/help" className={styles.navLink}>
            Update & Help
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
