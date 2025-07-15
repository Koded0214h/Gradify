import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
      // For registration, we'll use the same login function since we're in mock mode
      // In a real app, you'd call a separate register API
      const result = await login(email, password, role);
      
      if (result.success) {
        // Navigate based on role
        if (role === "student") {
          navigate("/student");
        } else if (role === "lecturer") {
          navigate("/lecturer");
        }
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Register for Gradify</Title>

        <RoleSelector>
          <RoleOption
            active={role === "student"}
            onClick={() => setRole("student")}
          >
            Student
          </RoleOption>
          <RoleOption
            active={role === "lecturer"}
            onClick={() => setRole("lecturer")}
          >
            Lecturer
          </RoleOption>
        </RoleSelector>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          
          {role === "student" && (
            <Input
              type="text"
              placeholder="Matric Number"
              value={matricNumber}
              onChange={(e) => setMatricNumber(e.target.value)}
            />
          )}
          
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          {error && <ErrorText>{error}</ErrorText>}
          <Submit type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Submit>
        </Form>

        <FooterText>
          Already have an account? <StyledLink to="/login">Login</StyledLink>
        </FooterText>
      </Card>
    </Wrapper>
  );
};

export default RegisterPage;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primary};
  font-weight: 700;
  margin-bottom: 2rem;
`;

const RoleSelector = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const RoleOption = styled.div`
  flex: 1;
  text-align: center;
  padding: 0.6rem;
  margin: 0 0.25rem;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ active, theme }) =>
    active ? theme.primary : theme.bg};
  color: ${({ active, theme }) =>
    active ? "#fff" : theme.text};
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.primaryLight};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.primaryLight};
  border-radius: 8px;
  font-size: 1rem;
  background: transparent;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.muted || "#999"};
  }
`;

const Submit = styled.button`
  background: ${({ theme, disabled }) => 
    disabled ? theme.muted || "#ccc" : theme.secondary};
  color: ${({ disabled }) => disabled ? "#666" : "black"};
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
  margin-top: 0.5rem;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 0.9rem;
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
  