import Header from './components/navigation/Header.jsx';
import { authService } from './service/authService.js';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {
  const isLoggedIn = authService.isLoggedIn();
  // const navigate = useNavigate();
  const [learningRole, setLearningRole] = useState('');

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

      // if (isTeacher) {
      //   navigate('/profile/teacher');
      // } else if (isStudent) {
      //   navigate('/profile/student');
      // } else {
      //   navigate('/');
      // }
    }
  }, [isLoggedIn]);

  // if (!isLoggedIn) {
  //   return <div>Loading...</div>;
  // }

  const name = isLoggedIn && authService.getUserInfo('name');

  return (
    <>
      <Header name={name} role={learningRole} /> {}
      <main className="pt-20">
        {/* Головний банер */}
        <section className="text-center py-20 bg-gray-100">
          <h1 className="text-4xl font-bold mb-6">
            Несло великі страждання страждання те прикладом коли віддаватися
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

        {/* Популярні Курси */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Популярні Курси</h2>
                <p className="text-gray-600">Подивіться популярні курси</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Всі Курси
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Карточка курсу */}
              <div className="border p-6 rounded">
                <span className="text-sm text-gray-500">Розробка</span>
                <h3 className="text-xl font-bold mt-2 mb-4">
                  Розробка додатків
                </h3>
                <p className="text-gray-600 mb-4">2 Теми • 156 Студентів</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Подивитись більше
                </button>
              </div>
              {/* Інші карточки курсів */}
            </div>
          </div>
        </section>

        {/* Промо-секція */}
        <section className="text-center py-20 bg-gray-100">
          <h2 className="text-3xl font-bold mb-6">
            Давайте розпочнемо навчання
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded">
              Я Студент
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded">
              Я Викладач
            </button>
          </div>
        </section>

        {/* Останні Додані Курси */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Останні Додані Курси</h2>
                <p className="text-gray-600">Подивіться нові курси</p>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded">
                Всі Курси
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {/* Карточка курсу */}
              {/* Аналогічно до секції "Популярні Курси" */}
            </div>
          </div>
        </section>

        {/* Статистика */}
        <section className="py-20 bg-blue-500 text-white">
          <div className="container mx-auto px-4 grid grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-4xl font-bold">25K+</h3>
              <p>Активних Студентів</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">899</h3>
              <p>Курсів</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">158</h3>
              <p>Викладачів</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold">100%</h3>
              <p>Задоволення Студентів</p>
            </div>
          </div>
        </section>

        {/* Відгуки Студентів */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Що студенти говорять</h2>
            <div className="grid grid-cols-3 gap-6">
              {/* Карточка відгуку */}
              <div className="border p-6 rounded">
                <p className="mb-4">&quot;Несло великі страждання...&quot;</p>
                <h4 className="font-bold">Василь</h4>
                <span className="text-sm text-gray-500">Студент</span>
              </div>
              {/* Інші відгуки */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
