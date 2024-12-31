import { useUploadFileMutation } from '../../../store/courses/coursesApiSlice.js';
import { useState } from 'react';

export default function CourseLessonForm({
  register,
  lessonIndex,
  moduleIndex,
  setValue,
}) {
  const [uploadFile] = useUploadFileMutation();
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    error: null,
  });

  const handleFileUpload = async (e) => {
    console.log('event', e.target.files);
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (1GB limit)
    if (file.size > 1024 * 1024 * 1024) {
      setUploadStatus({
        loading: false,
        error: 'Файл занадто великий. Максимальний розмір - 1 ГБ',
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus({
        loading: false,
        error: 'Недопустимий формат файлу. Дозволені формати: MP4, WebM, OGG',
      });
      return;
    }

    setUploadStatus({ loading: true, error: null });

    // const formData = new FormData();
    console.log(file);
    // formData.append('video', file);
    // console.log(formData);

    try {
      const response = await uploadFile(file).unwrap();
      setValue(
        `modules.${moduleIndex}.lessons.${lessonIndex}.attachmentUrl`,
        response.filename
      );
      console.log(
        `modules.${moduleIndex}.lessons.${lessonIndex}.attachmentUrl`,
        response.filename
      );
      setUploadStatus({ loading: false, error: null });
    } catch (err) {
      setUploadStatus({
        loading: false,
        error: 'Помилка завантаження файлу',
      });
    }
  };

  return (
    <div className="ml-4 mb-4 p-4 border rounded">
      <input
        className="w-full px-4 py-2 mb-2 border rounded"
        placeholder="Назва уроку"
        {...register(
          `modules.${moduleIndex}.lessons.${lessonIndex}.lessonTitle`,
          { required: "Назва уроку обов'язкова" }
        )}
      />

      <select
        className="w-full px-4 py-2 mb-2 border rounded"
        {...register(
          `modules.${moduleIndex}.lessons.${lessonIndex}.lessonType`
        )}
      >
        <option value="video">Відео</option>
        <option value="quiz">Тест</option>
        <option value="text">Текст</option>
        <option value="audio">Аудіо</option>
      </select>

      <div className="relative">
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          className="w-full px-4 py-2 mb-2 border rounded"
          onChange={handleFileUpload}
          disabled={uploadStatus.loading}
        />

        {uploadStatus.loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
            <div className="text-blue-500">Завантаження...</div>
          </div>
        )}
      </div>

      {uploadStatus.error && (
        <div className="text-red-500 text-sm mt-1">{uploadStatus.error}</div>
      )}
    </div>
  );
}
