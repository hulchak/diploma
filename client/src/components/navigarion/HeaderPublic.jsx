import { NavLink } from 'react-router-dom';
import { authService } from '../../service/authService.js';
// import { useEffect, useState } from 'react';

// import Label from './Input';

export default function Header({ name, learningRole }) {
  const isLoggedIn = authService.isLoggedIn();
  const logout = () => {
    authService.logout();
  };

  const login = () => {
    authService.login();
  };
  return (
    <header className="w-full bg-header fixed top-0 left-0">
      <nav className="px-4 py-5 flex justify-between">
        {isLoggedIn && name && (
          <div className="w-[154px] h-[27px]">
            <div className=" text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
              Привіт {learningRole} {name}
            </div>
          </div>
        )}
        <NavLink to="/">
          <div className="w-[154px] h-[27px]">
            <div className=" text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
              Домашня
            </div>
          </div>
        </NavLink>
        <NavLink to="/courses" className="mr-auto">
          <div className="w-[154px] h-[27px]">
            <div className=" text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
              Курси
            </div>
          </div>
        </NavLink>
        {isLoggedIn ? (
          <div onClick={logout}>logout</div>
        ) : (
          <div onClick={login}>
            <div className="w-[154px] h-[27px] flex items-center gap-[10px]">
              <div className="text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
                Зайти / Реєстрація
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
