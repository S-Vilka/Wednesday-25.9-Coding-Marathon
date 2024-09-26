import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLogin = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return {
    handleLogin,
    error,
  };
};

export default useLogin;
