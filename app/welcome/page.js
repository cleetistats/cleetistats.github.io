"use client";

import ProtectedRoute from "../ProtectedRoute";
import styles from "../page.module.css";

export default function Welcome() {
  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.loginBox}>
            <div className={styles.imageWrapper}>
              <img src="/PFP.png" alt="Welcome graphic" className={styles.image} />
            </div>
            <h2>Welcome in!</h2>
            <p className={styles.desc}>We just gotta do some administrative tasks, then we'll take you to the dashboard.</p>
            <form>
              <div className={styles.inputGroup}>
                <label htmlFor="username">username</label>
                <input type="text" id="username" placeholder="Enter discord or epic ID" required/>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">new password</label>
                <input type="text" id="password" placeholder="Anything, just not the one we gave you. :D" required/>
              </div>
              <button type="submit" className={styles.loginButton}>Proceed</button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
