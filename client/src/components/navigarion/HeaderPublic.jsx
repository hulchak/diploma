import { NavLink } from 'react-router-dom';
// import Label from './Input';

export default function Header() {
  return (
    <header className="w-full bg-header fixed top-0 left-0">
      <nav className="px-4 py-5 flex justify-between">
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
        <NavLink to="/profile">
          <div className="w-[154px] h-[27px] flex items-center gap-[10px]">
            <div className="text-black font-jost text-[18px] font-medium leading-[27px] capitalize">
              Зайти / Реєстрація
            </div>
            <div>
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="46"
                  height="46"
                  rx="23"
                  stroke="#FF782D"
                  stroke-width="2"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.1666 17.3333C19.945 17.3333 17.3333 19.945 17.3333 23.1667C17.3333 26.3883 19.945 29 23.1666 29C26.3883 29 29 26.3883 29 23.1667C29 19.945 26.3883 17.3333 23.1666 17.3333ZM15.6666 23.1667C15.6666 19.0245 19.0245 15.6667 23.1666 15.6667C27.3088 15.6667 30.6666 19.0245 30.6666 23.1667C30.6666 27.3088 27.3088 30.6667 23.1666 30.6667C19.0245 30.6667 15.6666 27.3088 15.6666 23.1667Z"
                  fill="#FF782D"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M27.2858 27.2858C27.6113 26.9603 28.1389 26.9603 28.4643 27.2858L32.0893 30.9108C32.4148 31.2362 32.4148 31.7638 32.0893 32.0893C31.7639 32.4147 31.2363 32.4147 30.9108 32.0893L27.2858 28.4643C26.9604 28.1388 26.9604 27.6112 27.2858 27.2858Z"
                  fill="#FF782D"
                />
              </svg>
            </div>
          </div>
        </NavLink>
      </nav>
    </header>
  );
}
