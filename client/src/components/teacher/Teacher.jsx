import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentCourse,
  courseSelected,
} from '../../store/courses/coursesSlice.js';
import {
  useFetchCoursesQuery,
  useAddCoursesMutation,
} from '../../store/courses/coursesApiSlice.js';

export default function Teacher() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [subject, setSubject] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const dispatch = useDispatch();
  const currentCourse = useSelector(selectCurrentCourse);

  useEffect(() => {
    if (currentCourse) {
      setName(currentCourse.name);
      setDescription(currentCourse.description);
      setDuration(currentCourse.duration);
      setStartDate(currentCourse.startDate);
      setEndDate(currentCourse.endDate);
      setSubject(currentCourse.subject);
      setPreviewImageUrl(currentCourse.previewImageUrl);
    }
  }, [currentCourse]);

  const { data } = useFetchCoursesQuery();
  const [addCourse] = useAddCoursesMutation();

  function submit(e) {
    e.preventDefault();

    addCourse({
      name,
      description,
      duration,
      startDate,
      endDate,
      subject,
      previewImageUrl,
    });
  }

  function selectCourse(course) {
    dispatch(courseSelected(course));
  }

  const courses = data?.map((course) => (
    <div key={course._id} className="mx-3">
      {course.name} {course.description}
      <button
        className="px-3 text-center font-semibold uppercase rounded-xl py-3"
        onClick={() => selectCourse(course)}
      >
        Обрати курс
      </button>
    </div>
  ));

  return (
    <>
      <form className="w-full" onSubmit={(e) => submit(e)}>
        <h2 className="font-bold text-xl mb-5">Курси</h2>
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setName(event.target.value)}
          value={name}
          type="text"
          placeholder="Імʼя"
          required
        />
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          type="text"
          placeholder="Опис"
          required
        />
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setDuration(event.target.value)}
          value={duration}
          type="number"
          placeholder="Тривалість (дні)"
          required
        />
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setStartDate(event.target.value)}
          value={startDate}
          type="date"
          placeholder="Дата початку"
          required
        />
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setEndDate(event.target.value)}
          value={endDate}
          type="date"
          placeholder="Дата закінчення"
          required
        />
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setSubject(event.target.value)}
          value={subject}
          type="text"
          placeholder="Предмет"
          required
        />
        <input
          className="w-full block px-5 py-2.5 mb-7 appearance-none border rounded-3xl"
          onChange={(event) => setPreviewImageUrl(event.target.value)}
          value={previewImageUrl}
          type="text"
          placeholder="URL зображення"
          required
        />
        <button
          type="submit"
          className="w-full text-center font-semibold uppercase rounded-xl py-3"
        >
          Створити
        </button>
      </form>
      {courses}
    </>
  );
}
