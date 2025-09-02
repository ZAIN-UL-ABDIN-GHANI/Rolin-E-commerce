import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { storeVerifyCode } from "../Redux/UserSlice";
import axios from "axios";
import signinimg from "../assets/images/sign.png";

const SignupForm = () => {
  const initialData = { username: "", email: "", password: "" };
  const [inputdata, setInputdata] = useState(initialData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

    if (!inputdata.username) newErrors.username = "Username is required";
    if (!inputdata.email) newErrors.email = "Email is required";
    else if (!emailPattern.test(inputdata.email))
      newErrors.email = "Email is invalid";

    if (!inputdata.password) newErrors.password = "Password is required";
    else if (!passwordPattern.test(inputdata.password))
      newErrors.password =
        "Password must be strong with uppercase, lowercase, number & special char";

    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (inputdata.password !== confirmPassword)
      newErrors.confirmPassword = "Passwords must match";

    if (!isChecked) newErrors.terms = "You must agree to the terms";

    return newErrors;
  };

  const handleValidation = () => {
    const newErrors = validate();
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const response = await axios.post(
          "https://management-system-backend-0wae.onrender.com/signup/mongo/",
          inputdata
        );
        const verifycode = response.data.verifyCode;
        if (verifycode) {
          dispatch(storeVerifyCode(verifycode));
        }
        alert("Sign up successful!");
      } catch (error) {
        console.error("Error during sign up:", error);
        alert("Sign up failed. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputdata({
      ...inputdata,
      [name]: value,
    });
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-evenly items-center space-y-10 md:space-y-0 md:space-x-16">
      <div className="md:w-1/3 mb-16 max-w-sm">
        <img src={signinimg} alt="Sample" className="w-full h-auto" />
      </div>
      <form className="md:w-1/3 max-w-xs" onSubmit={handleSubmit}>
        <h2 className="text-gray-950 font-bold text-xl">Welcome</h2>
        <p className="text-gray-900 mb-4 mt-2">
          Welcome! Please enter your details.
        </p>

        <div className="mb-2">
          <input
            className={`text-sm w-full px-4 py-2 border-b ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Username"
            name="username"
            value={inputdata.username}
            onChange={handleInputChange}
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
        </div>

        <div className="mb-2">
          <input
            className={`text-sm w-full px-4 py-2 border-b ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Email Address"
            name="email"
            value={inputdata.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="mb-2 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={inputdata.password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}

        <div className="mb-2 relative">
          <input
            className={`text-sm w-full px-4 py-2 border-b ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
        )}

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          <span>I agree to the terms & conditions</span>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-xs">{errors.terms}</p>
        )}

        <button
          type="submit"
          className="mt-4 bg-black hover:bg-gray-700 w-full h-10 text-white uppercase rounded text-xs"
        >
          Sign up
        </button>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </section>
  );
};

export default SignupForm;
