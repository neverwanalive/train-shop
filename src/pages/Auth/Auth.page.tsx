import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/sdk.gen";
import { Header } from "../../components/Header";
import { useAuth } from "../../store/authStore";
import { LogOut } from "lucide-react";

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    setAuth,
    isAuthenticated,
    clearAuth,
    username: currentUsername,
  } = useAuth();

  // Pre-fill username from URL parameter if coming from registration
  useEffect(() => {
    const usernameParam = searchParams.get("username");
    if (usernameParam) {
      setUsername(decodeURIComponent(usernameParam));
    }
  }, [searchParams]);

  const loginMutation = useMutation({
    mutationFn: () =>
      loginUser({
        body: {
          username,
          password,
        },
      }),
    onSuccess: (response) => {
      const token = response.data?.token;
      if (token) {
        // Store user info in auth store (this will also set currentUserId)
        setAuth(token, username, username);

        console.log("Login successful:", {
          username,
          token,
          response: response.data,
        });
        navigate("/");
      } else {
        console.log("Login response received but no token:", response);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      console.error("Login attempt failed for username:", username);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      console.log("Attempting to login:", { username });
      loginMutation.mutate();
    }
  };

  const handleLogout = () => {
    clearAuth();
    // Clear any user-specific data if needed
    console.log("User logged out");
    navigate("/");
  };

  // Show logout/exit page if already authenticated
  if (isAuthenticated()) {
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
              <img
                src="/pictures/auth.png"
                alt="Auth"
                className="max-w-full max-h-full object-contain opacity-0"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Right Side - Logout Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              {/* Title */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-black">
                  ВЫХОД ИЗ ЛИЧНОГО КАБИНЕТА
                </h1>
              </div>

              {/* User Info */}
              <div className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Вы вошли как:</p>
                <p className="text-xl font-semibold text-gray-900">
                  {currentUsername || "Пользователь"}
                </p>
              </div>

              {/* Logout Button */}
              <div className="space-y-4">
                <Button
                  disableRipple
                  onClick={handleLogout}
                  className="
                    w-full
                    px-8 py-3
                    text-base
                    font-semibold
                    bg-black
                    text-white
                    border-2 border-black
                    rounded-none
                    hover:bg-white
                    hover:text-black
                    transition-all duration-300
                    flex items-center justify-center gap-2
                  "
                >
                  <LogOut className="w-5 h-5" />
                  ВЫЙТИ
                </Button>

                <Button
                  disableRipple
                  onClick={() => navigate("/")}
                  className="
                    w-full
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
                  "
                >
                  НА ГЛАВНУЮ
                </Button>
              </div>

              {/* Info Text */}
              <div className="mt-8 text-sm text-gray-600 leading-relaxed">
                <p>
                  Вы можете выйти из аккаунта в любое время. После выхода вам
                  потребуется снова войти для доступа к личному кабинету.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
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
              alt="Auth"
              className="max-w-full max-h-full object-contain opacity-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                ВХОД В ЛИЧНЫЙ КАБИНЕТ
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
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
                  disabled={loginMutation.isPending}
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
                  disabled={loginMutation.isPending}
                />
              </div>

              {/* Error Message */}
              {loginMutation.isError && (
                <div className="text-red-600 text-sm">
                  Неверное имя пользователя или пароль
                </div>
              )}

              {/* Login Button and Password Recovery */}
              <div className="flex items-center gap-4 flex-wrap">
                <Button
                  type="submit"
                  disableRipple
                  disabled={loginMutation.isPending}
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
                  {loginMutation.isPending ? "ВХОД..." : "ВОЙТИ"}
                </Button>
                <a
                  href="#"
                  className="text-sm text-black underline hover:no-underline transition-all whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add password recovery logic
                  }}
                >
                  ВОССТАНОВИТЬ ПАРОЛЬ
                </a>
              </div>
            </form>

            {/* Registration Link */}
            <div className="mt-8 text-sm text-gray-600">
              <p>
                Нет аккаунта?{" "}
                <Link
                  to="/register"
                  className="text-black underline hover:no-underline font-medium"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>

            {/* Info Text */}
            <div className="mt-8 text-sm text-gray-600 leading-relaxed">
              <p>
                Регистрация происходит автоматически после оформления первой
                покупки, пароль с доступом придут на почту, указанную в заказе.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
