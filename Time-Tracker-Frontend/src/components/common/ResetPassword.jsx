import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const obj = {
      token: token,
      password: data.password
    };

    try {
      await axios.post("/users/resetpassword", obj);
      toast.success("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <FaTimes className="close-icon" onClick={() => navigate("/login")} />
        <label>Reset Password</label>
        <p className="subtext">Enter and confirm your new password below.</p>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Enter new password"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="error">Password is required</p>}
          </div>

          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm new password"
            />
            <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && <p className="error">Please confirm your password</p>}
          </div>

          <button type="submit">Reset Password</button>
        </form>
      </div>

      <ToastContainer position="top-center" />

      {/* Internal CSS placed at the end */}
      <style>{`
             .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: linear-gradient(to bottom, #AAB99A);
          position: absolute;
          top: 0;
          left: 0;
          padding: 20px;
        }

        .login-box {
          width: 400px;
          max-width: 90%;
          padding: 30px;
          background-color: #D0DDD0;
          border-radius: 1rem;
          box-shadow: 5px 20px 50px rgba(0, 0, 0, 0.3);
          text-align: center;
          position: relative;
        }

        .login-box label {
          font-size: 1.8em;
          font-weight: bold;
          color: #5A6E58;
          margin-bottom: 10px;
          display: block;
        }

        .subtext {
          font-size: 0.95em;
          margin-bottom: 15px;
          color: #444;
        }

        .login-box input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 30px;
          font-size: 1em;
          margin: 10px 0;
        }

        .password-container {
          position: relative;
          width: 100%;
        }

        .eye-icon {
          position: absolute;
          right: 15px;
          top: 45%;
          transform: translateY(-50%);
          cursor: pointer;
          color: #333;
          font-size: 1.2em;
        }

        .login-box button {
          width: 100%;
          padding: 12px;
          background: #5A6E58;
          color: #fff;
          border: solid 1px #AAB99A;
          border-radius: 30px;
          font-size: 1em;
          cursor: pointer;
          margin-top: 10px;
        }

        .login-box button:hover {
          background: #5A6E58;
        }

        .login-box button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }

        .error {
          color: red;
          font-size: 12px;
          margin-top: 5px;
        }

        .close-icon {
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 20px;
          color: #5A6E58;
          cursor: pointer;
        }

        @media screen and (max-width: 480px) {
          .login-box {
            padding: 20px;
            border-radius: 30px;
          }

          .login-box label {
            font-size: 1.5em;
          }

          .login-box input {
            padding: 10px;
            font-size: 0.9em;
          }

          .login-box button {
            font-size: 0.9em;
            padding: 10px;
          }
        }

      `}</style>
    </div>
  );
};
