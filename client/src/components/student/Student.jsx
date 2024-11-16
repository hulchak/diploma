// import { useState } from 'react';
import { useFetchCoursesQuery } from '../../store/courses/coursesApiSlice.js';
// import {useDispatch} from "react-redux";
// import { catSelected } from '../../store/cats/catSlice.js';

export default function Student() {
  // const [name, setName] = useState('');
  // const [colour, setColour] = useState('');

  // const dispatch = useDispatch();

  const { data } = useFetchCoursesQuery();
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
      <div className="grid grid-cols-2 gap-4">
        {data &&
          data.map((course) => (
            <div key={course._id} className="border p-4 rounded">
              <h3 className="text-lg font-bold">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
              <img src={course.previewImageUrl} alt={course.title} />
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Перейти
              </button>
            </div>
          ))}
      </div>
    </>
  );
}
