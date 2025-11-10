import React, { useState } from "react";
import { Button } from "@heroui/button";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addUser, getAllUsers } from "../../api/sdk.gen";
import { Header } from "../../components/Header";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: () =>
      addUser({
        body: {
          email,
          username,
          password,
        },
      }),
    onSuccess: async (response) => {
      console.log("Registration successful:", {
        email,
        username,
        fullResponse: response,
        userData: response.data,
        userId: response.data?.id,
      });

      // Fetch and log all users
      try {
        const allUsersResponse = await getAllUsers();
        console.log("All users:", allUsersResponse.data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }

      // Navigate to login page with username as query parameter
      navigate(`/auth?username=${encodeURIComponent(username)}`);
    },
    onError: (error) => {
      console.error("Registration error:", error);
      console.error("Error details:", {
        message: (error as Error).message,
        error,
      });
      alert("Ошибка регистрации. Попробуйте снова.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    // Validate all fields
    if (!email || !username || !password) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    console.log("Attempting to register user:", { email, username });
    registerMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex">
        {/* Left Side - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-white">
          <div
            className="w-full h-full flex items-center justify-center p-8"
            style={{
              backgroundImage: "url('/pictures/auth.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Fallback if image doesn't load */}
            <img
              src="/pictures/auth.png"
              alt="Register"
              className="max-w-full max-h-full object-contain opacity-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                РЕГИСТРАЦИЯ
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-black focus:border-black focus:ring-0 outline-none pb-2 text-lg"
                  placeholder=""
                  required
                  disabled={registerMutation.isPending}
                />
              </div>

              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Имя пользователя
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-black focus:border-black focus:ring-0 outline-none pb-2 text-lg"
                  placeholder=""
                  required
                  disabled={registerMutation.isPending}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-black focus:border-black focus:ring-0 outline-none pb-2 text-lg"
                  placeholder=""
                  required
                  disabled={registerMutation.isPending}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Подтвердите пароль
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-black focus:border-black focus:ring-0 outline-none pb-2 text-lg"
                  placeholder=""
                  required
                  disabled={registerMutation.isPending}
                />
              </div>

              {/* Error Message */}
              {registerMutation.isError && (
                <div className="text-red-600 text-sm">
                  Ошибка регистрации. Попробуйте снова.
                </div>
              )}

              {/* Register Button */}
              <div className="flex items-center gap-4 flex-wrap pt-4">
                <Button
                  type="submit"
                  disableRipple
                  disabled={registerMutation.isPending}
                  className="
                    px-8 py-3
                    text-base
                    font-semibold
                    bg-white
                    text-black
                    border-2 border-black
                    rounded-none
                    hover:bg-black
                    hover:text-white
                    transition-all duration-300
                    flex-1
                    min-w-[120px]
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {registerMutation.isPending
                    ? "РЕГИСТРАЦИЯ..."
                    : "ЗАРЕГИСТРИРОВАТЬСЯ"}
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-sm text-gray-600">
              <p>
                Уже есть аккаунт?{" "}
                <Link
                  to="/auth"
                  className="text-black underline hover:no-underline font-medium"
                >
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
