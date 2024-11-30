"use client";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { signInWithEmailAndPassword, getAdditionalUserInfo } from "firebase/auth";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (param) => {
    param.preventDefault();
    setError("");

    try {
      const auth = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = auth.user;
      
      const docReference = doc(FIREBASE_DB, "admin", user.uid);
      const docSnapshot = await getDoc(docReference);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        if (userData.firstLogin) {
          console.log("New user signed in: ", user);
          await updateDoc(docReference, { firstLogin: false });
          router.push("/welcome");
        } else {
          console.log("Existing user signed in: ", user);
          router.push("/dashboard");
        }
      } else {
        console.error("No Firestore document found for the user.");
        setError("User profile not found. Please contact league staff on discord.");
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
          <div className={styles.imageWrapper}>
            <img src="/PFP.png" alt="Welcome graphic" className={styles.image} />
          </div>
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
