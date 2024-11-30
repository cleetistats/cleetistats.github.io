"use client";

import ProtectedRoute from "../ProtectedRoute";

export default function Welcome() {
  return (
    <ProtectedRoute>
    <div>
      <h1>Welcome to Our Platform!</h1>
      <p>We’re glad to have you here. Let’s get started! :D</p>
    </div>
    </ProtectedRoute>
  );
}