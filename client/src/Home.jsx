import Header from './components/navigation/Header.jsx';
import { authService } from './service/authService.js';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useFetchCoursesQuery } from './store/courses/coursesApiSlice.js';
import { Link } from 'react-router-dom';

export default function Home() {
  const isLoggedIn = authService.isLoggedIn();
  const [learningRole, setLearningRole] = useState('');
  const { data: courses, isLoading, error } = useFetchCoursesQuery();

  useEffect(() => {
    if (isLoggedIn) {
      const token = authService.getToken();
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.realm_access.roles;
      const isTeacher = roles.includes('teacher');
      const isStudent = roles.includes('student');
      if (isTeacher) {
        setLearningRole('teacher');
      } else if (isStudent) {
        setLearningRole('student');
      } else {
        setLearningRole('guest');
      }
    }
  }, [isLoggedIn]);

  const name = isLoggedIn && authService.getUserInfo('name');
  const featuredCourses = courses?.slice(0, 3);

  return (
    <>
      <Header name={name} role={learningRole} />
      <main className="pt-20">
        {/* Головний банер */}
        <section
          className={`text-center py-20 ${
            isLoggedIn ? 'bg-gray-100' : 'h-screen bg-gray-200'
          }`}
        >
          <h1 className="text-4xl font-bold mb-6">
            Ласкаво просимо до CourseLab
          </h1>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded">
              Зайти
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded">
              Реєстрація
            </button>
          </div>
        </section>

        {isLoggedIn && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold">Популярні Курси</h2>
                  <p className="text-gray-600">Подивіться популярні курси</p>
                </div>
                <Link
                  to="/courses"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Всі Курси
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error loading courses</p>}
                {featuredCourses &&
                  featuredCourses.map((course) => (
                    <div
                      key={course.uuid}
                      className="border p-6 rounded-lg shadow-lg"
                    >
                      <img
                        src={course.previewImageUrl}
                        alt={course.name}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                      <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
                      <p className="text-gray-600 mb-4">{course.description}</p>
                      <Link
                        to={`/courses/${course.uuid}`}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded inline-block"
                      >
                        Перейти
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
