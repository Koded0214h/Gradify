import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Wrapper>
      <Nav>
        <Logo>Gradify</Logo>
        <Actions>
          <StyledLink to="/login">Login</StyledLink>
          <RegisterButton to="/register">Register</RegisterButton>
        </Actions>
      </Nav>

      <Hero>
        <Title>Welcome to Gradify</Title>
        <Subtitle>
          Streamline submissions. Empower academics. One platform, built for campus excellence.
        </Subtitle>
        <CTA to="/register">Get Started</CTA>
      </Hero>

      <Section>
        <SectionTitle>How It Works</SectionTitle>
        <Features>
          <Feature>
            <h3>🔐 Secure Login</h3>
            <p>Role-based access for students and lecturers.</p>
          </Feature>
          <Feature>
            <h3>📤 Easy Upload</h3>
            <p>Submit assignments in seconds — track your submissions easily.</p>
          </Feature>
          <Feature>
            <h3>📈 Lecturer Tools</h3>
            <p>Upload marking schemes, set deadlines, and assign scores effortlessly.</p>
          </Feature>
        </Features>
      </Section>

      <Section>
        <SectionTitle>Built for Every Academic Role</SectionTitle>
        <DualColumn>
          <Column>
            <h3>🎓 Students</h3>
            <ul>
              <li>Upload files with ease</li>
              <li>Track deadlines</li>
              <li>Get instant feedback</li>
            </ul>
          </Column>
          <Column>
            <h3>👨‍🏫 Lecturers</h3>
            <ul>
              <li>Centralized student submissions</li>
              <li>Manage deadlines by course</li>
              <li>Assign scores in one click</li>
            </ul>
          </Column>
        </DualColumn>
      </Section>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const Nav = styled.nav`
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.primaryLight};
  }
`;

const RegisterButton = styled(Link)`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.primaryLight};
  }
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 1rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 1.5rem auto;
`;

const CTA = styled(Link)`
  background: ${({ theme }) => theme.secondary};
  color: black;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    transform: scale(1.05);
    transition: 0.2s ease-in-out;
  }
`;

const Section = styled.section`
  padding: 3rem 0;
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.primary};
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
`;

const Feature = styled.div`
  flex: 1 1 250px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const DualColumn = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1 1 300px;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  ul {
    padding-left: 1.2rem;
    margin-top: 1rem;
  }

  li {
    margin-bottom: 0.75rem;
  }
`; 