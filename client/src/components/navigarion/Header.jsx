import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService.js';
// import { useSelector } from 'react-redux';
// import { selectCurrentCat } from '../../store/cats/catSlice.js';

export default function Header({ name, role }) {
  const navigate = useNavigate();
  // const cat = useSelector(selectCurrentCat);
  const logout = () => {
    authService.logout();
    navigate('/');
  };

  const getProfileLink = () => {
    if (role === 'teacher') {
      return '/profile/teacher';
    } else if (role === 'student') {
      return '/profile/student';
    }
  };

  return (
    <header className="w-full bg-header fixed top-0 left-0">
      <nav className="px-4 py-5 flex justify-between">
        <NavLink to="/courses">Курси</NavLink>
        <div>Привіт {name}</div>
        <div className="flex space-x-4">
          <NavLink to={getProfileLink()}>Мій кабінет</NavLink>
          <div className="cursor-pointer" onClick={logout}>
            Вийти
          </div>
        </div>
      </nav>
    </header>
  );
}
