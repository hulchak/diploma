// import { useState } from 'react';
import { useFetchCatsQuery } from '../../store/cats/catApiSlice.js';
// import {useDispatch} from "react-redux";
// import { catSelected } from '../../store/cats/catSlice.js';

export default function Student() {
  // const [name, setName] = useState('');
  // const [colour, setColour] = useState('');

  // const dispatch = useDispatch();

  const { data } = useFetchCatsQuery();
  console.log(data);
  // const [addCat] = useAddCatMutation();

  // const cats = data?.map(cat =>
  //   <div key={cat._id} className="mx-3">
  //     {cat.name} {cat.colour}
  //     <button className="px-3 text-center font-semibold uppercase rounded-xl py-3"
  //             onClick={() => dispatch(catSelected(cat))}
  //     >
  //       Обрати студента
  //     </button>
  //   </div>
  // )

  return (
    <>
      <h2 className="font-bold text-xl mb-5">Курси</h2>
    </>
  );
}
