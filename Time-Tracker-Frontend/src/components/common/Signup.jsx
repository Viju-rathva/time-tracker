import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/Signup.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

export const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Password visibility state

    // Extract role from URL
    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get("role");

    // Role to roleId mapping
    const roleMapping = {
        "Admin": "67ef90c963183b906d218519",
        "Developer": "67ef90e663183b906d21851b",
        "Project Manager": "67ef90ff63183b906d21851d"
    };

    const onSubmit = async (data) => {
        if (loading) return;
        setLoading(true);

        try {
            const userData = { ...data, roleId: roleMapping[role] };

            const res = await axios.post("/users/signup", userData);
            console.log("Signup Response:", res);

            if (res.status === 201) {
                toast.success("🎉 User added successfully!", {
                    position: "top-center",
                    autoClose: 1500,
                    theme: "light",
                    transition: Bounce,
                });

                // Store user in localStorage
                localStorage.setItem("user", JSON.stringify(res.data.data));

                // Delay navigation for better user experience
                setTimeout(() => {
                    redirectToRolePage(roleMapping[role]);
                }, 1700);
            }
        } catch (error) {
            console.error("Signup Error:", error);

            if (error.response) {
                const { status, data } = error.response;

                if (status === 400 || status === 401) {
                    toast.error(`⚠️ ${data.message || "Signup failed. Try again."}`, {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                        transition: Bounce,
                    });
                } else if (data.code === 11000) {
                    toast.error("⚠️ Email already exists. Try logging in.", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {
                    toast.error("🚨 Select Role First , by selecting Switch Account!", {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } else {
                toast.error("🚨 Server error! Please try again later.", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const redirectToRolePage = (roleId) => {
        if (roleId === "67ef90c963183b906d218519") {
            navigate("/admin");
        } else if (roleId === "67ef90e663183b906d21851b") {
            navigate("/developer");
        } else if (roleId === "67ef90ff63183b906d21851d") {
            navigate("/manager");
        } else {
            navigate("/login"); // Default redirection
        }
    };

    return (
        <div className="signup-container">
            <ToastContainer position="top-center" autoClose={2000} theme="light" transition={Bounce} />
            <div className="signup-box">
                <h2 style={{ background: "#5A6E58", color:"white",padding: "10px", borderRadius: "10px" }}>{role} Registration</h2>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <input type="text" placeholder="First Name" {...register("firstName", { required: "First name is required" })} />
                    {errors.firstName && <p className="error">{errors.firstName.message}</p>}

                    <input type="text" placeholder="Last Name" {...register("lastName", { required: "Last name is required" })} />
                    {errors.lastName && <p className="error">{errors.lastName.message}</p>}

                    <input type="email" placeholder="Email" {...register("email", { 
                        required: "Email is required", 
                        pattern: { 
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
                            message: "Enter a valid email address" 
                        }
                    })} />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    {/* Password Input with Eye Toggle */}
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
                        <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing up..." : "Sign up"}
                    </button>

                    <button type="button" onClick={() => navigate("/login")} className="already-registered-btn">
                        Already Registered?
                    </button>

                    <button type="button" onClick={() => navigate("/register")} className="switch-account-btn">
                        Switch Account
                    </button>
                </form>
            </div>
            <div className="footer-note">
            © {new Date().getFullYear()} Time Tracker. All rights reserved.
        </div>
        </div>
    //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
    //     <ToastContainer position="top-center" autoClose={2000} theme="light" transition={Bounce} />
        
    //     <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
    //       <div className="px-8 pt-8 pb-6">
    //         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 py-2 px-4 bg-green-100 rounded-lg inline-block w-full">
    //           {role} Registration
    //         </h2>
            
    //         <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-4">
    //           <div>
    //             <input 
    //               type="text" 
    //               placeholder="First Name" 
    //               className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
    //               {...register("firstName", { required: "First name is required" })} 
    //             />
    //             {errors.firstName && <p className="mt-1 text-red-500 text-sm">{errors.firstName.message}</p>}
    //           </div>
              
    //           <div>
    //             <input 
    //               type="text" 
    //               placeholder="Last Name" 
    //               className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
    //               {...register("lastName", { required: "Last name is required" })} 
    //             />
    //             {errors.lastName && <p className="mt-1 text-red-500 text-sm">{errors.lastName.message}</p>}
    //           </div>
              
    //           <div>
    //             <input 
    //               type="email" 
    //               placeholder="Email" 
    //               className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
    //               {...register("email", { 
    //                 required: "Email is required", 
    //                 pattern: { 
    //                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 
    //                   message: "Enter a valid email address" 
    //                 }
    //               })} 
    //             />
    //             {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
    //           </div>
              
    //           <div className="relative">
    //             <input 
    //               type={showPassword ? "text" : "password"} 
    //               placeholder="Password" 
    //               className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-12`}
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
    //               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
    //               onClick={() => setShowPassword(!showPassword)}
    //             >
    //               {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
    //             </button>
    //             {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
    //           </div>
              
    //           <div className="pt-2">
    //             <button 
    //               type="submit" 
    //               disabled={loading}
    //               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
    //             >
    //               {loading ? "Signing up..." : "Sign up"}
    //             </button>
    //           </div>
              
    //           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
    //             <button 
    //               type="button" 
    //               onClick={() => navigate("/login")}
    //               className="flex-1 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    //             >
    //               Already Registered?
    //             </button>
    //             <button 
    //               type="button" 
    //               onClick={() => navigate("/register")}
    //               className="flex-1 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
    //             >
    //               Switch Account
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    );
};
