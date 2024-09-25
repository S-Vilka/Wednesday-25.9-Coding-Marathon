import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLogin = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    console.log({ email, password });

    try {
      setError(null);
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const user = await response.json();

      if (response.ok) {
        sessionStorage.setItem("user", JSON.stringify(user));
        console.log("User logged in successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Error during login:", error);
    }
  };

  return {
    handleLogin,
    error,
  };
};

export default useLogin;
