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
        <div className="login-container">
            <ToastContainer />
            <div className="login-box">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Login</label>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        {...register("email", { 
                            required: "Email is required", 
                            pattern: { 
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                                message: "Enter a valid email address" 
                            }
                        })} 
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    {/* Password Input with Eye Icon */}
                    <div className="password-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
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
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}

                    <button type="submit">Login</button>
                    <p 
                        style={{
                            marginTop: "15px",
                            color: "#5A6E58",
                            cursor: "pointer",
                            textDecoration: "underline"
                        }}
                        onClick={() => navigate("/forgotpassword")}
                    >
                        Forgot Password?
                    </p>
                </form>
            </div>
        </div>
    //     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    //     <ToastContainer />
        
    //     <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
    //       <div className="bg-indigo-600 py-4">
    //         <h2 className="text-center text-2xl font-bold text-white">Welcome Back</h2>
    //       </div>
          
    //       <div className="p-8">
    //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    //           {/* Email Input */}
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
    //               <FaEnvelope />
    //             </div>
    //             <input
    //               type="email"
    //               className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
    //                 errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
    //               } focus:border-transparent outline-none focus:outline-none focus:ring-2 transition-all text-gray-600`}
    //               placeholder="Email Address"
    //               {...register("email", {
    //                 required: "Email is required",
    //                 pattern: {
    //                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    //                   message: "Enter a valid email address"
    //                 }
    //               })}
    //             />
    //             {errors.email && (
    //               <p className="mt-1 text-sm text-red-500">
    //                 {errors.email.message}
    //               </p>
    //             )}
    //           </div>
  
    //           {/* Password Input */}
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
    //               <FaLock />
    //             </div>
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
    //                 errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'
    //               } focus:border-transparent outline-none focus:outline-none focus:ring-2 transition-all text-gray-600`}
    //               placeholder="Password"
    //               {...register("password", {
    //                 required: "Password is required",
    //                 minLength: { value: 8, message: "Password must be at least 8 characters long" },
    //                 pattern: {
    //                   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
    //                   message: "Password must contain at least one letter and one number"
    //                 }
    //               })}
    //             />
    //             <button
    //               type="button"
    //               onClick={togglePasswordVisibility}
    //               className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
    //             >
    //               {showPassword ? <FaEyeSlash /> : <FaEye />}
    //             </button>
    //             {errors.password && (
    //               <p className="mt-1 text-sm text-red-500">
    //                 {errors.password.message}
    //               </p>
    //             )}
    //           </div>
  
    //           {/* Remember Me & Forgot Password */}
    //           <div className="flex items-center justify-between text-sm">
    //             <div className="flex items-center">
    //               <input
    //                 id="remember-me"
    //                 type="checkbox"
    //                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    //               />
    //               <label htmlFor="remember-me" className="ml-2 block text-gray-600">
    //                 Remember me
    //               </label>
    //             </div>
    //             <div
    //               className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium transition-colors"
    //               onClick={() => navigate("/forgotpassword")}
    //             >
    //               Forgot Password?
    //             </div>
    //           </div>
  
    //           {/* Login Button */}
    //           <button
    //             type="submit"
    //             className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 focus:outline-none text-white font-medium rounded-lg text-center transition-all shadow-md hover:shadow-lg"
    //           >
    //             Sign In
    //           </button>
  
    //           {/* Sign Up Link */}
    //           <div className="text-center mt-4">
    //             <span className="text-gray-600">Don't have an account?</span>{" "}
    //             <span
    //               className="text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium transition-colors"
    //               onClick={() => navigate("/signup")}
    //             >
    //               Sign up
    //             </span>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
        
    //     <div className="hidden lg:block absolute bottom-4 left-4 text-gray-500 text-sm">
    //       © {new Date().getFullYear()} Your Company. All rights reserved.
    //     </div>
    //   </div>
    );
};
