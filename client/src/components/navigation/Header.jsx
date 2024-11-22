import { NavLink, useNavigate } from 'react-router-dom';
import { authService } from '../../service/authService.js';

export default function Header({ name, role }) {
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();

  const logout = () => {
    authService.logout('http://localhost:3000/');
  };

  const login = () => {
    authService.login();
  };

  const getProfileLink = () => {
    console.log('Current role:', role); // Додамо для дебагу
    if (role === 'teacher') {
      return '/profile/teacher';
    } else if (role === 'student') {
      return '/profile/student';
    }
    return '/';
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
          <NavLink
            to="/profile/settings"
            className="text-gray-600 hover:text-gray-900"
          >
            Профіль
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Пошук"
            className="border px-2 py-1 rounded-md"
          />
          {isLoggedIn && name && (
            <div className="text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
              Привіт {role} {name}
            </div>
          )}
          {isLoggedIn ? (
            <>
              <NavLink
                to={getProfileLink()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Кабінет
              </NavLink>
              <div
                className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={logout}
              >
                Вийти
              </div>
            </>
          ) : (
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={login}
            >
              Зайти / Реєстрація
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
