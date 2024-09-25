import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [date_of_birth, setDateofBirth] = useState("");
  const [membership_status, setMembership] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const signupData = {
      name,
      email,
      password,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      toast.success(result.message || "User added Successfully");

      navigate("/jobs");
    } catch (error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Signup</h2>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                className="border rounded w-full py-2 px-3"
                placeholder="Enter your phone number"
                required
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="border rounded w-full py-2 px-3"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="date_of_birth"
                className="block text-gray-700 font-bold mb-2"
              >
                Date of Birth
              </label>
              <input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                className="border rounded w-full py-2 px-3"
                required
                value={date_of_birth}
                onChange={(e) => setDateofBirth(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="membership_status"
                className="block text-gray-700 font-bold mb-2"
              >
                Membership Status
              </label>
              <select
                id="membership_status"
                name="membership_status"
                className="border rounded w-full py-2 px-3"
                required
                value={membership_status}
                onChange={(e) => setMembership(e.target.value)}
              >
                <option value="">Select your membership status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
