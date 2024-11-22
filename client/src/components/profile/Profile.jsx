// client/src/components/profile/Profile.jsx
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../../service/authService.js';
import { AUTHORITY } from '../../config/index.js';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: '',
    registrationDate: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    const token = authService.getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      const roles = decodedToken.realm_access.roles;
      const role = roles.includes('teacher')
        ? 'Викладач'
        : roles.includes('student')
        ? 'Студент'
        : 'Гість';

      setUserInfo({
        id: decodedToken.sub,
        firstName: decodedToken.given_name || '',
        lastName: decodedToken.family_name || '',
        email: decodedToken.email,
        username: decodedToken.preferred_username,
        role: role,
        registrationDate: new Date(decodedToken.iat * 1000).toLocaleString(
          'uk-UA'
        ),
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Get admin token for Keycloak API access
      const adminResponse = await fetch(
        `${AUTHORITY}/protocol/openid-connect/token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: 'admin-cli',
            client_secret: process.env.KEYCLOAK_ADMIN_SECRET,
          }),
        }
      );

      if (!adminResponse.ok) {
        throw new Error('Failed to get admin token');
      }

      const adminToken = await adminResponse.json();

      // Update user profile using admin token
      const response = await fetch(
        `${AUTHORITY}/admin/realms/public/users/${userInfo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken.access_token}`,
          },
          body: JSON.stringify({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            emailVerified: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsEditing(false);
      loadUserProfile();
    } catch (err) {
      setError('Помилка при оновленні профілю');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Мій профіль</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="border-b pb-4">
            <label className="text-gray-600 text-sm">Ім'я:</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            ) : (
              <p className="text-xl font-semibold">{userInfo.firstName}</p>
            )}
          </div>

          <div className="border-b pb-4">
            <label className="text-gray-600 text-sm">Прізвище:</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            ) : (
              <p className="text-xl font-semibold">{userInfo.lastName}</p>
            )}
          </div>

          <div className="border-b pb-4">
            <label className="text-gray-600 text-sm">Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
              />
            ) : (
              <p className="text-xl font-semibold">{userInfo.email}</p>
            )}
          </div>

          <div className="border-b pb-4">
            <label className="text-gray-600 text-sm">Ім'я користувача:</label>
            <p className="text-xl font-semibold">{userInfo.username}</p>
          </div>

          <div className="border-b pb-4">
            <label className="text-gray-600 text-sm">Роль:</label>
            <p className="text-xl font-semibold">{userInfo.role}</p>
          </div>

          <div>
            <label className="text-gray-600 text-sm">Дата реєстрації:</label>
            <p className="text-xl font-semibold">{userInfo.registrationDate}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-4 px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Скасувати
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Зберегти
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Редагувати
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
