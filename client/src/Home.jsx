import HeaderPublic from './components/navigarion/HeaderPublic.jsx';
import { authService } from './service/authService.js';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {
  const isLoggedIn = authService.isLoggedIn();
  // const navigate = useNavigate();
  const [learningRole, setLearningRole] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const token = authService.getToken();
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.realm_access.roles;
      const isTeacher = roles.includes('teacher');
      const isStudent = roles.includes('student');
      if (isTeacher) {
        setLearningRole('teacher');
      } else if (isStudent) {
        setLearningRole('student');
      } else {
        setLearningRole('guest');
      }

      // if (isTeacher) {
      //   navigate('/profile/teacher');
      // } else if (isStudent) {
      //   navigate('/profile/student');
      // } else {
      //   navigate('/');
      // }
    }
  }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   return <div>Loading...</div>;
  // }

  const name = isLoggedIn && authService.getUserInfo('name');

  return (
    <>
      <HeaderPublic name={name} learningRole={learningRole} />
      <div className="pt-[75px]">
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to the School
          </h1>
        </div>
      </div>
    </>
  );
}
