import { useState } from "react";
import { useForm } from "react-hook-form";
import { themeColors } from "../constants/classes.js";
import {useAuth} from "../context/authContext.jsx";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const {login, signUp} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (isSignUp) {
      signUp(data);
    } else {
      login(data);
    }
  };

  return (
    <div
      className={`flex items-center justify-center flex-grow bg-${themeColors.bg} text-${themeColors.text}`}
    >
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-[rgb(var(--bg-secondary))]">
        <h2 className={`text-2xl font-bold mb-6 text-center text-${themeColors.primary}`}>
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-2 rounded-lg border bg-${themeColors.bg} text-${themeColors.text} focus:outline-none focus:ring-2 focus:ring-${themeColors.primary}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-4 py-2 rounded-lg border bg-${themeColors.bg} text-${themeColors.text} focus:outline-none focus:ring-2 focus:ring-${themeColors.primary}`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white bg-${themeColors.primary} hover:bg-${themeColors.secondary} transition`}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Mode */}
        <p className="mt-4 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className={`font-semibold text-${themeColors.primary} hover:underline`}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}