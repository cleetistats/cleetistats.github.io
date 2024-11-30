"use client";

import Head from "next/head";
import Image from "next/image";
import styles from "./page.module.css";
import { signInWithEmailAndPassword, getAdditionalUserInfo } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (param) => {
    param.preventDefault();
    setError("");

    try {
      const auth = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = auth.user;
      const addlInfo = getAdditionalUserInfo(auth);

      if (addlInfo.isNewUser) {
        console.log("New user signed in: ", user);

      }
      else
      {
        console.log("Existing user signed in: ", user);

      }
    } catch (error) {
      console.error("Error signing you in: ", error);
      setError("Failed to log in. Are you sure you're using the correct credentials?");
    }
  };

  return (
    <div className={styles.page}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div className={styles.loginBox}>
          <h2>login</h2>
          <form onSubmit={handleSignIn}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">email</label>
              <input type="text" id="email" placeholder="Email" value={email} onChange={(email) => setEmail(email.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">password</label>
              <input type="password" id="password" placeholder="Password" value={password} onChange={(pswd) => setPassword(pswd.target.value)}/>
            </div>
            <button type="submit" className={styles.loginButton}>Login</button>
          </form>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <p>don't have a login, but need one? contact league staff on discord!</p>
        </div>

      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
