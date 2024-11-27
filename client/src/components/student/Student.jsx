import { useFetchCoursesQuery } from '../../store/courses/coursesApiSlice.js';
import { Link } from 'react-router-dom';

export default function Student() {
  const { data } = useFetchCoursesQuery();
  console.log(data);

  return (
    <>
      <h2 className="font-bold text-3xl mb-8 text-center">Курси</h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data &&
            data.map((course) => (
              <div key={course._id} className="border p-6 rounded-lg shadow-lg">
                <img
                  src={course.previewImageUrl}
                  alt={course.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">
                    Тривалість: {course.duration} днів
                  </span>
                  <span className="text-gray-500">
                    Рейтинг: {course.rating} / 5
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">
                    Початок: {new Date(course.startDate).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500">
                    Кінець: {new Date(course.endDate).toLocaleDateString()}
                  </span>
                </div>
                <Link
                  to={`/profile/courses/${course._id}`}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded inline-block"
                >
                  Перейти
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
