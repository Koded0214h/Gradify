import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";

const LoginPage = () => {
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [nonFieldError, setNonFieldError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setNonFieldError("");
    if (!matricNumber || !password) {
      setFieldErrors({
        ...(matricNumber ? {} : { matric_number: "Matric number is required." }),
        ...(password ? {} : { password: "Password is required." })
      });
      return;
    }
    setIsLoading(true);
    try {
      const result = await login(matricNumber, password, role);
      if (result.success) {
        if (role === "student") {
          navigate("/student/assignments");
        } else if (role === "lecturer") {
          navigate("/lecturer");
        }
      } else {
        setNonFieldError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      let fieldErrs = {};
      let nonField = "An error occurred. Please try again.";
      try {
        const data = JSON.parse(err.message);
        if (typeof data === 'object') {
          for (const [k, v] of Object.entries(data)) {
            if (k === 'matric_number' || k === 'password') {
              fieldErrs[k] = Array.isArray(v) ? v.join(', ') : v;
            } else {
              nonField = (Array.isArray(v) ? v.join(', ') : v) || nonField;
            }
          }
        }
      } catch {}
      setFieldErrors(fieldErrs);
      setNonFieldError(nonField);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login to Gradify</h2>

        <div className="login-role-selector">
          <div
            className={`login-role-option${role === "student" ? " active" : ""}`}
            onClick={() => setRole("student")}
          >
            Student
          </div>
          <div
            className={`login-role-option${role === "lecturer" ? " active" : ""}`}
            onClick={() => setRole("lecturer")}
          >
            Lecturer
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Matric Number"
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
          />
          {fieldErrors.matric_number && <p className="login-error-text">{fieldErrors.matric_number}</p>}
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldErrors.password && <p className="login-error-text">{fieldErrors.password}</p>}
          {nonFieldError && <p className="login-error-text">{nonFieldError}</p>}
          <button className="login-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-footer-text">
          Don't have an account? <Link className="login-link" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
  