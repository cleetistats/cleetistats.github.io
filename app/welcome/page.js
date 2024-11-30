"use client";

import ProtectedRoute from "../ProtectedRoute";
import styles from "../page.module.css";
import { useRouter } from "next/navigation";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth, updatePassword } from "firebase/auth";
import { FIREBASE_DB } from "../../firebaseConfig";
import { useState } from "react";

export default function Welcome() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (param) => {
    param.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found.");
      }

      updatePassword(user, password);
      console.log("Password successfully updated.");
      

      const docReference = doc(FIREBASE_DB, "admin", user.uid);
      const docSnapshot = await getDoc(docReference);

      if (docSnapshot.exists()) {
        await updateDoc(docReference, {firstLogin: false, username:username, });
        console.log("Database updated.");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("An error ocurred: ", error);
    }
  }

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.loginBox}>
            <div className={styles.imageWrapper}>
              <img src="/pfp.png" alt="Welcome graphic" className={styles.image} />
            </div>
            <h2>welcome in!</h2>
            <p className={styles.desc}>We just gotta do some administrative tasks, then we'll take you to the dashboard.</p>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">username</label>
                <input type="text" id="username" placeholder="Enter discord or epic ID" value={username} onChange={(uname) => setUsername(uname.target.value)} required/>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="password">new password</label>
                <input type="password" id="password" placeholder="Anything, just not the one we gave you. :D" value={password} onChange={(pswd) => setPassword(pswd.target.value)} required/>
              </div>
              <button type="submit" className={styles.loginButton}>Proceed</button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
