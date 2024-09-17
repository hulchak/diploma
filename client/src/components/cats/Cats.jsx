import {useState} from "react";
import {useAddCatMutation, useFetchCatsQuery} from "../../store/cats/catApiSlice.js";
import {useDispatch} from "react-redux";
import {catSelected} from "../../store/cats/catSlice.js";

export default function Cats() {

  const [name, setName] = useState("");
  const [colour, setColour] = useState("");

  const dispatch = useDispatch();

  const {data} = useFetchCatsQuery();
  const [addCat] = useAddCatMutation();

  function submit(e) {
    e.preventDefault();

    addCat({
      name,
      colour
    })
  }

  const cats = data?.map(cat =>
    <div key={cat._id} className="mx-3">
      {cat.name} {cat.colour}
      <button className="px-3 text-center font-semibold uppercase rounded-xl py-3"
              onClick={() => dispatch(catSelected(cat))}
      >
        Обрати кота
      </button>
    </div>
  )

  return (
    <>
      <form className="w-full" onSubmit={(e) => submit(e)}>
        <h2 className="font-bold text-xl mb-5">Кіт</h2>
        <input className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
               onChange={(event) => setName(event.target.value)}
               value={name}
               type="text"
               placeholder="Імʼя"
               required
        />
        <input className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
               onChange={(event) => setColour(event.target.value)}
               value={colour}
               type="text"
               placeholder="Колір"
               required
        />
        <button
          type="submit"
          className="w-full text-center font-semibold uppercase rounded-xl py-3"
        >
          Створити
        </button>
      </form>
      {cats}
    </>
  );
}