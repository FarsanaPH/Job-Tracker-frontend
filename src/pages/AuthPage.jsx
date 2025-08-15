
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { registerAPI, loginAPI, findUserByEmailAPI } from "../service/allApi"; // <-- use service APIs
import { toast } from "react-toastify";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // signup
    if (isSignUp) {
      // Optional: prevent duplicate email
      const existing = await findUserByEmailAPI(formData.email);
      if (existing?.status === 200 && Array.isArray(existing.data) && existing.data.length > 0) {
        toast.warn("Email already registered. Please LOGIN.");
        setIsSignUp(false);
        return;
      }

      const res = await registerAPI(formData);
      if (res?.status >= 200 && res.status < 300) {
        toast.success("Sign up successful! Please LOGIN.");
        setIsSignUp(false);
      } else {
        toast.error("Sign up failed!");
      }
    } else {  //login
      const res = await loginAPI({ email: formData.email, password: formData.password });
      if (res?.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
        // console.log("Login success:", res.data[0]); // <---shows logged-in user details
        const user = res.data[0];
        dispatch(setUser(user));
        toast.success(`Login successful! Welcome ${user.name}.`);
        // optional persistence so refresh keeps you logged in
        localStorage.setItem("jt_user", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        // console.log("Login failed");
        toast.error("Invalid credentials!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex w-[710px] h-110 shadow-lg">
        {/* Left / Sign Up */}
        {isSignUp ? (
          <div className="w-1/2 bg-black text-white border border-white p-8 flex flex-col justify-center rounded-l-lg">
            <h2 className="text-xl font-bold mb-4">SIGN UP</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Name"
                className="w-full p-2 2 bg-white text-gray-600 rounded"
                onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email"
                className="w-full p-2 bg-white text-gray-600 border rounded"
                autoComplete="username"
                onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password"
                autoComplete="current-password"
                className="w-full p-2 2 bg-white text-gray-600 border  rounded"
                onChange={handleChange} required />
              <button type="submit"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                SIGN UP
              </button>
            </form>
          </div>
        ) : (
          <div className="w-1/2 bg-white text-black p-8 flex flex-col justify-center rounded-l-lg">
            <h2 className="text-xl font-bold mb-2">HELLO, FRIEND!</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter your personal details and start your journey with us.
            </p>
            <button onClick={() => setIsSignUp(true)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              SIGN UP
            </button>
          </div>
        )}

        {/* Right / Sign In */}
        {isSignUp ? (
          <div className="w-1/2 bg-white text-black p-8 flex flex-col justify-center rounded-r-lg">
            <h2 className="text-xl font-bold mb-2">WELCOME BACK!</h2>
            <p className="text-sm text-gray-600 mb-4">
              To keep connected with us, please login with your personal info.
            </p>
            <button onClick={() => setIsSignUp(false)}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              SIGN IN
            </button>
          </div>
        ) : (
          <div className="w-1/2 bg-black text-white p-8 flex flex-col justify-center border border-white rounded-r-lg">
            <h2 className="text-xl font-bold mb-4">SIGN IN</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="email" name="email" placeholder="Email"
                autoComplete="username"
                className="w-full p-2 bg-white text-gray-600 rounded"
                onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password"
                autoComplete="current-password"
                className="w-full p-2 bg-white text-gray-600 rounded"
                onChange={handleChange} required />
              <button type="submit"
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
                SIGN IN
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage
