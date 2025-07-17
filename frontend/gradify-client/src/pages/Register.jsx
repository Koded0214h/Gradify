import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../api";
import "../styles/Register.css";

const RegisterPage = () => {
  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    
    if (role === "student" && !matricNumber) {
      setError("Matric number is required for students.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Split full name into first and last name
      const [first_name, ...rest] = fullName.trim().split(' ');
      const last_name = rest.length > 0 ? rest.join(' ') : '-'; // Ensure last_name is never blank
      const payload = {
        email,
        username: email, // Add this line to ensure username is set
        first_name: first_name || '-', // Ensure first_name is never blank
        last_name,
        password,
        password2: confirmPassword,
        role,
        ...(role === 'student' ? { matric_number: matricNumber } : {}),
      };
      const res = await apiFetch('/api/register/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      // On success, log in the user
      const loginResult = await login(role === "student" ? matricNumber : email, password, role);
      if (loginResult.success) {
        if (role === "student") {
          navigate("/student/assignments");
        } else if (role === "lecturer") {
          navigate("/lecturer");
        }
      } else {
        setError("Registration succeeded but login failed.");
      }
    } catch (err) {
      // Try to parse and display backend errors
      let msg = "Registration failed. Please check your details.";
      try {
        const data = JSON.parse(err.message);
        if (typeof data === 'object') {
          msg = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ');
        }
      } catch {}
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2 className="register-title">Register for Gradify</h2>

        <div className="register-role-selector">
          <div
            className={`register-role-option${role === "student" ? " active" : ""}`}
            onClick={() => setRole("student")}
          >
            Student
          </div>
          <div
            className={`register-role-option${role === "lecturer" ? " active" : ""}`}
            onClick={() => setRole("lecturer")}
          >
            Lecturer
          </div>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {role === "student" && (
            <input
              className="register-input"
              type="text"
              placeholder="Matric Number"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
            />
          )}
          <input
            className="register-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="register-error-text">{error}</p>}
          <button className="register-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-footer-text">
          Already have an account? <Link className="register-link" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
  