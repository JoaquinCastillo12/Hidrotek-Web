import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      navigate("/products");
    }
  }, [navigate]);

  const toggleVisibility = () => setIsVisible((v) => !v);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await loginUser(username, password);
    setIsLoading(false);
    if (success) {
      navigate("/");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-dots">
      <div className="login-animation w-full max-w-md">
        <div className="login-card bg-white rounded-xl border-none shadow-lg">
          <div className="px-8 py-10 flex flex-col gap-6">
            {/* Login Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Icon icon="lucide:lock" className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Iniciar sesión
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Ingresa tus credenciales para continuar
                </p>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-center mb-2">{error}</p>
            )}

            {/* Login Form */}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon="lucide:user" className="text-gray-400 text-lg" />
                  </span>
                  <input
                    type="text"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon="lucide:key" className="text-gray-400 text-lg" />
                  </span>
                  <input
                    type={isVisible ? "text" : "password"}
                    className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                    onClick={toggleVisibility}
                    tabIndex={-1}
                  >
                    {isVisible ? (
                      <Icon icon="lucide:eye" className="text-gray-400 text-lg" />
                    ) : (
                      <Icon icon="lucide:eye-off" className="text-gray-400 text-lg" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  tabIndex={-1}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <button
                type="submit"
                className="mt-2 font-medium w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>

            {/* Register Link */}
            <div className="flex justify-center mt-4">
              <p className="text-gray-500 text-sm">
                ¿No tienes una cuenta?{" "}
                <span
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Regístrate
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

