"use client";

import ProtectedRoute from "../ProtectedRoute";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FIREBASE_DB } from "../../firebaseConfig";

export default function Dashboard() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const docReference = doc(FIREBASE_DB, "admin", user.uid);
          const docSnapshot = await getDoc(docReference);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUsername(data.username);
          } else {
            console.error("No such document!");
          }
        } else {
          console.error("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.dashboardBox}>
          <div className={styles.imageWrapper}>
            <img src="/pfp.png" alt="Welcome graphic" className={styles.image} />
          </div>
            <h2>dashboard</h2>
            <div className={styles.columns}>
              {/* First Column */}
              <div className={styles.columnOne}>
                <p>Welcome back, {username}</p>
              </div>
              {/* Second Column */}
              <div className={styles.column}>
                <div className={styles.buttonRow}>
                  <button className={styles.iconButton}>
                    <img src="/bar-chart.png" className={styles.icon}/>
                    <div>view player stats</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/group.png" className={styles.icon}/>
                    <div>view teams</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/user.png" className={styles.icon}/>
                    <div>view players</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/calendar.png" className={styles.icon}/>
                    <div>view schedule</div>
                  </button>
                </div>
              </div>
              {/* Third Column */}
              <div className={styles.column}>
                <div className={styles.buttonRow}>
                  <button className={styles.iconButton}>
                    <img src="/bar-chart.png" className={styles.icon}/>
                    <div>update player stats</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/group.png" className={styles.icon}/>
                    <div>update teams</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/user.png" className={styles.icon}/>
                    <div>update players</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/calendar.png" className={styles.icon}/>
                    <div>update schedule</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
