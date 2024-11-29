import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <div className={styles.loginBox}>
          <h2>login</h2>
          <form>
            <div className={styles.inputGroup}>
              <label htmlFor="email">email</label>
              <input type="text" id="email" placeholder="Email" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">password</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <button type="submit" className={styles.loginButton}>Login</button>
          </form>
          <p>don't have a login, but need one? contact league staff on discord!</p>
        </div>

      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
