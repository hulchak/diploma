import { Outlet } from 'react-router-dom';
import { authService } from './service/authService.js';
import Header from './components/navigation/Header.jsx';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {
  const isLoggedIn = authService.isLoggedIn();
  const [role, setRole] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const token = authService.getToken();
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.realm_access.roles;
      const isTeacher = roles.includes('teacher');
      const isStudent = roles.includes('student');

      if (isTeacher) {
        setRole('teacher');
      } else if (isStudent) {
        setRole('student');
      } else {
        setRole('guest');
      }
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  const name = authService.getUserInfo('name');

  return (
    <>
      <Header name={name} role={role} />
      <div className="pt-[75px]">
        <Outlet />
      </div>
    </>
  );
}
