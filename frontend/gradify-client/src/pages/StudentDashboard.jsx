import styled from "styled-components";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    course: "",
    title: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", form);
    // Clear form after submission
    setForm({ course: "", title: "", file: null });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Wrapper>
      <Title>Welcome, {user?.name || "Student"}</Title>
      <UserInfo>You're logged in as: {user?.role}</UserInfo>
      
      <DebugInfo>Debug: This should show all 3 sections below</DebugInfo>

      <Card>
        <SectionTitle>📤 Submit Assignment</SectionTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            name="course"
            placeholder="Course Code"
            value={form.course}
            onChange={handleChange}
          />
          <Input
            name="title"
            placeholder="Assignment Title"
            value={form.title}
            onChange={handleChange}
          />
          <Input
            name="file"
            type="file"
            onChange={handleChange}
          />
          <Submit>Upload</Submit>
        </Form>
      </Card>

      <Card>
        <SectionTitle>🗃️ Submission History</SectionTitle>
        <SubmissionList>
          <SubmissionItem>
            <strong>Data Structures</strong> — Uploaded ✔️
            <span>July 10, 2025</span>
          </SubmissionItem>
          <SubmissionItem>
            <strong>Cybersecurity</strong> — Pending ❌
            <span>July 12, 2025</span>
          </SubmissionItem>
        </SubmissionList>
      </Card>

      <Card>
        <SectionTitle>📊 Dashboard Stats</SectionTitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>5</StatNumber>
            <StatLabel>Total Submissions</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>3</StatNumber>
            <StatLabel>Pending Reviews</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>2</StatNumber>
            <StatLabel>Completed</StatLabel>
          </StatItem>
        </StatsGrid>
      </Card>

      <LogoutButton onClick={handleLogout}>
        Logout
      </LogoutButton>
    </Wrapper>
  );
};

export default StudentDashboard;

const Wrapper = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

const UserInfo = styled.p`
  color: ${({ theme }) => theme.muted || "#666"};
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const DebugInfo = styled.div`
  background: ${({ theme }) => theme.secondary};
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
  border: 2px solid ${({ theme }) => theme.primaryLight};
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.25rem;
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
`;

const Submit = styled.button`
  background: ${({ theme }) => theme.secondary};
  color: black;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const SubmissionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SubmissionItem = styled.div`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.primaryLight};
  border-radius: 8px;
  background: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.muted || "#888"};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.bg};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.primaryLight};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.muted || "#666"};
`;

const LogoutButton = styled.button`
  background: ${({ theme }) => theme.error || "#dc2626"};
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.errorLight || "#b91c1c"};
  }
`;
  