import { useParams } from 'react-router-dom';
import { useFetchCourseByIdQuery } from '../../store/courses/coursesApiSlice.js';

export default function CourseDetails() {
  const { courseId } = useParams();
  const { data: course, isLoading } = useFetchCourseByIdQuery(courseId);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!course) {
    return <div className="text-center py-8">Course not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Тривалість: {course.duration} днів</span>
            <span>Рейтинг: {course.rating}/5</span>
            <span>Предмет: {course.subject}</span>
          </div>
        </div>

        {/* Course Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Зміст курсу</h2>
          {course.content.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mb-6">
              <h3 className="text-xl font-semibold mb-4">
                Модуль {moduleIndex + 1}: {module.moduleTitle}
              </h3>
              <div className="ml-4 space-y-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded"
                  >
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                      {lessonIndex + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{lesson.lessonTitle}</h4>
                      <p className="text-sm text-gray-500">
                        {lesson.lessonType} • {lesson.duration} хв
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
