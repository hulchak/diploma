import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService.js';
// import { useSelector } from 'react-redux';
// import { selectCurrentCat } from '../../store/cats/catSlice.js';

export default function Header({ name, role }) {
  // const navigate = useNavigate();
  // const cat = useSelector(selectCurrentCat);
  const logout = () => {
    authService.logout('http://localhost:3000/');
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
      <nav className="px-4 py-5 flex justify-between items-center">
        <div className="text-2xl font-bold">CourseLab</div>
        <div className="flex gap-6">
          <NavLink to="/" className="text-gray-600 hover:text-gray-900">
            Домашня
          </NavLink>
          <NavLink
            to="/profile/courses"
            className="text-gray-600 hover:text-gray-900"
          >
            Курси
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Пошук"
            className="border px-2 py-1 rounded-md"
          />
          {name && (
            <div className="text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
              Привіт {name}
            </div>
          )}
          <NavLink
            to={getProfileLink()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Профіль
          </NavLink>
          <div
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={logout}
          >
            Вийти
          </div>
        </div>
      </nav>
    </header>
  );
}
