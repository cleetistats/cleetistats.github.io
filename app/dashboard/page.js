"use client";

import ProtectedRoute from "../ProtectedRoute";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_DB } from "../../firebaseConfig";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // To show loading state
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docReference = doc(FIREBASE_DB, "admin", user.uid);
          const docSnapshot = await getDoc(docReference);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUsername(data.username);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      } else {
        console.error("No user is signed in.");
        router.push("/login"); // Redirect to login if no user
      }
      setLoading(false); // Stop loading once done
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [router]);

  if (loading) {
    return (
      <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.dashboardBox}>
        <div className={styles.imageWrapper}>
          <img src="/pfp.png" alt="Welcome graphic" className={styles.image} />
        </div>
          <h2>loading...</h2>
        </div>
      </main>
    </div>
  ); // Optional loading spinner or UI
  }

  return (
    <ProtectedRoute>
      <div className={styles.page}>
        <main className={styles.main}>
          <div className={styles.dashboardBox}>
          <div className={styles.imageWrapper}>
            <img src="/pfp.png" alt="Welcome graphic" className={styles.image} />
          </div>
            <h2>Dashboard</h2>
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
                    <div>View Player Stats</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/group.png" className={styles.icon}/>
                    <div>View Teams</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/user.png" className={styles.icon}/>
                    <div>View Players</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/calendar.png" className={styles.icon}/>
                    <div>View Schedule</div>
                  </button>
                </div>
              </div>
              {/* Third Column */}
              <div className={styles.column}>
                <div className={styles.buttonRow}>
                  <button className={styles.iconButton}>
                    <img src="/bar-chart.png" className={styles.icon}/>
                    <div>Manage Player Stats</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/group.png" className={styles.icon}/>
                    <div>Manage Teams</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/user.png" className={styles.icon}/>
                    <div>Manage Players</div>
                  </button>
                  <button className={styles.iconButton}>
                    <img src="/calendar.png" className={styles.icon}/>
                    <div>Manage Schedule</div>
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
