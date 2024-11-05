import { Outlet } from 'react-router-dom';
import { authService } from './service/authService.js';
import Header from './components/navigarion/Header.jsx';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function App() {
  const isLoggedIn = authService.isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const token = authService.getToken();
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.realm_access.roles;
      const isTeacher = roles.includes('teacher');
      const isStudent = roles.includes('student');

      if (isTeacher) {
        navigate('/profile/teacher');
      } else if (isStudent) {
        navigate('/profile/student');
      } else {
        navigate('/');
      }
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return <div>Loading...</div>;
  }

  const name = authService.getUserInfo('name');

  return (
    <>
      <Header name={name} />
      <div className="pt-[75px]">
        <Outlet />
      </div>
    </>
  );
}
