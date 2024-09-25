import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSignup = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (signupData) => {
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred during signup");
    }
  };
  return {
    error,
    handleSignup,
  };
};

export default useSignup;
