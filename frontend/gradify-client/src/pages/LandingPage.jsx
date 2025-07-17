import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <Wrapper>
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
            <Icon>🔐</Icon>
            <h3>Secure Login</h3>
            <p>Role-based access for students and lecturers.</p>
          </Feature>
          <Feature>
            <Icon>📤</Icon>
            <h3>Easy Upload</h3>
            <p>Submit assignments in seconds — track your submissions easily.</p>
          </Feature>
          <Feature>
            <Icon>📈</Icon>
            <h3>Lecturer Tools</h3>
            <p>Upload marking schemes, set deadlines, and assign scores effortlessly.</p>
          </Feature>
        </Features>
      </Section>

      <Section>
        <SectionTitle>Built for Every Academic Role</SectionTitle>
        <DualColumn>
          <Column>
            <RoleIcon>🎓</RoleIcon>
            <h3>Students</h3>
            <ul>
              <li>Upload files with ease</li>
              <li>Track deadlines</li>
              <li>Get instant feedback</li>
            </ul>
          </Column>
          <Column>
            <RoleIcon>👨‍🏫</RoleIcon>
            <h3>Lecturers</h3>
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
  align-items: center;
  padding: 0 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 6rem 1rem 4rem 1rem;
  max-width: 700px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: 600px;
  margin: 1.5rem auto 2.5rem auto;
  color: ${({ theme }) => theme.text};
`;

const CTA = styled(Link)`
  background: ${({ theme }) => theme.secondary};
  color: black;
  padding: 1rem 2.5rem;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.2rem;
  text-decoration: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: 0.2s;
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px) scale(1.04);
  }
`;

const Section = styled.section`
  padding: 3rem 0;
  max-width: 1100px;
  margin: 0 auto;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.primary};
`;

const Features = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
`;

const Feature = styled.div`
  flex: 1 1 260px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  text-align: center;
  min-width: 220px;
`;

const Icon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const DualColumn = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Column = styled.div`
  flex: 1 1 320px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  min-width: 260px;
  text-align: center;
  ul {
    padding-left: 1.2rem;
    margin-top: 1.2rem;
    text-align: left;
  }
  li {
    margin-bottom: 0.85rem;
    font-size: 1.08rem;
  }
`;

const RoleIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 0.7rem;
`; 