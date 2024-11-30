// components/ProtectedRoute.js
"use client";

import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push("/"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or skeleton while checking auth
  }

  return <>{children}</>;
}
