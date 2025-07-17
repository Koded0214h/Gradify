import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled, { useTheme } from 'styled-components';

function Navbar() {
  const { token, role, logout } = useAuth ? useAuth() : {};
  const theme = useTheme ? useTheme() : {};

  return (
    <NavBar>
      <Logo to="/">Gradify</Logo>
      <NavLinks>
        {!token && <NavItem><StyledLink to="/login">Login</StyledLink></NavItem>}
        {!token && <NavItem><RegisterLink to="/register">Register</RegisterLink></NavItem>}
        {token && role === 'student' && <NavItem><StyledLink to="/student">Student</StyledLink></NavItem>}
        {token && role === 'lecturer' && <NavItem><StyledLink to="/lecturer">Lecturer</StyledLink></NavItem>}
        {token && (
          <>
            <NavItem><RoleText>{typeof role === 'string' && role.length > 0 ? role.charAt(0).toUpperCase() + role.slice(1) : ""}</RoleText></NavItem>
            <NavItem>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </NavItem>
          </>
        )}
      </NavLinks>
    </NavBar>
  );
}

export default Navbar;

const NavBar = styled.nav`
  width: 100%;
  max-width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  box-shadow: 0 2px 8px rgba(123, 44, 191, 0.07);
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;

  @media (min-width: 600px) {
    padding: 1.2rem 2.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.7rem;
  font-weight: 900;
  color: #fff;
  text-decoration: none;
  letter-spacing: 1px;
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  font-size: 1.08rem;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${({ theme }) => theme.primaryLight};
    color: #fff;
  }
`;

const RegisterLink = styled(Link)`
  background: ${({ theme }) => theme.secondary};
  color: #222;
  font-weight: 600;
  text-decoration: none;
  padding: 0.3rem 1.1rem;
  border-radius: 6px;
  font-size: 1.08rem;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${({ theme }) => theme.primaryLight};
    color: #fff;
  }
`;

const RoleText = styled.span`
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  margin-right: 0.5rem;
`;

const LogoutButton = styled.button`
  color: #fff;
  background: none;
  border: 1.5px solid #fff;
  border-radius: 6px;
  padding: 0.3rem 0.9rem;
  font-size: 1.08rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border 0.15s;
  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: #222;
    border: 1.5px solid ${({ theme }) => theme.secondary};
  }
`;
