import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("/users/login", data);
            console.log(res);

            if (res.status === 200) {
                const { _id, roleId } = res.data.data;

                toast.success("✅ Login successful!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });

                localStorage.setItem("id", _id);
                localStorage.setItem("role", roleId.name);

                setTimeout(() => {
                    if (roleId._id === "67ef90c963183b906d218519") {
                        navigate("/admin");
                    } else if (roleId._id === "67ef90e663183b906d21851b") {
                        navigate("/developer");
                    } else if (roleId._id === "67ef90ff63183b906d21851d") {
                        navigate("/manager");
                    } else {
                        toast.error("⚠️ Invalid role. Please contact admin.");
                    }
                }, 1000);
            } else {
                toast.error("⚠️ Login failed. Please check your credentials.", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("🚨 Login failed. Please try again!", {
                position: "top-center",
                autoClose: 2000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    return (
            <div className="login-wrapper">
        <ToastContainer />

        <div className="login-card">
            <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            </div>

            <div className="login-body">
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                {/* Email Input */}
                <div className="input-group">
                <div className="input-icon">
                    <FaEnvelope />
                </div>
                <input
                    type="email"
                    className={`input-field ${errors.email ? 'input-error' : ''}`}
                    placeholder="Email Address"
                    {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address"
                    }
                    })}
                />
                {errors.email && <p className="error-text">{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                <div className="input-group">
                <div className="input-icon">
                    <FaLock  />
                </div>

                <input
                    type={showPassword ? "text" : "password"}
                    className={`input-field ${errors.password ? 'input-error' : ''}`}
                    placeholder="Password"
                    {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Password must be at least 8 characters long" },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must contain at least one letter and one number"
                    }
                    })}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="toggle-password"
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="error-text">{errors.password.message}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="form-footer">
                <div className="remember-me">
                    <input id="remember-me" type="checkbox" className="checkbox" />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <div className="forgot-password" onClick={() => navigate("/forgotpassword")}>
                    Forgot Password?
                </div>
                </div>

                {/* Login Button */}
                <button type="submit" className="login-button">
                Sign In
                </button>

                {/* Sign Up Link */}
                <div className="signup-link">
                <span>Don't have an account?</span>
                <span onClick={() => navigate("/signup")}> Sign up</span>
                </div>
            </form>
            </div>
        </div>

        <div className="footer-note">
            © {new Date().getFullYear()} Time Tracker. All rights reserved.
        </div>
        </div>

    );
};
