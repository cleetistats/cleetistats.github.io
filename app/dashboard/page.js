"use client";

import ProtectedRoute from "../ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
    <div>
      <h1>Your Dashboard</h1>
      <p>Welcome back!</p>
    </div>
    </ProtectedRoute>
  );
}