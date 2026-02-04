import React, { useState } from "react";
import { LogIn } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl px-8 py-10">

        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="./src/assets/PictureGanit.jpg"
            alt="Company Logo"
            className="h-14 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 text-center">
          Sign in to Lakehouse Monitor
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enterprise Data Observability Platform
        </p>

        {/* Email */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="Email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="Password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => {
            if (email === "admin@ganit.com" && password === "SKR1106") {
              onLogin();
            } else {
              alert("Invalid username or password");
            }
          }}
          className="mt-6 w-56 mx-auto bg-blue-600 text-white py-2 rounded-md
           text-sm font-medium hover:bg-blue-700 transition
           flex items-center justify-center gap-2"

        >
          <LogIn size={16} />
          <span>Sign In</span>
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © 2026 Ganit. All rights reserved.
        </p>
      </div>
    </div>
  );
}