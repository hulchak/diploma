import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentCat} from "../../store/cats/catSlice.js";

export default function Header() {

  const cat = useSelector(selectCurrentCat)

  return (
    <header className="w-full bg-header fixed top-0 left-0">
      <nav className="px-4 py-5 flex justify-between">
        <NavLink to="/cats">
          Коти
        </NavLink>
        {cat &&
          <div>
            Обрано кота: {cat.name} {cat.colour}
          </div>
        }
      </nav>
    </header>
  );
}