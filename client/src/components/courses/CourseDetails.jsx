import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useFetchCourseByIdQuery } from '../../store/courses/coursesApiSlice.js';

export default function CourseDetails() {
  const { courseId } = useParams();
  const { data: course, isLoading } = useFetchCourseByIdQuery(courseId);
  const [expandedModules, setExpandedModules] = useState({});

  const getVideoUrl = (filename) => {
    return `http://localhost:8090/videos/compressed/${filename}`;
  };

  const toggleModule = (moduleIndex) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex],
    }));
  };

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
              <button
                onClick={() => toggleModule(moduleIndex)}
                className="w-full flex items-center justify-between text-xl font-semibold p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span>
                  Модуль {moduleIndex + 1}: {module.moduleTitle}
                </span>
                <svg
                  className={`w-6 h-6 transition-transform ${
                    expandedModules[moduleIndex] ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {expandedModules[moduleIndex] && (
                <div className="mt-4 ml-4 space-y-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="p-4 bg-gray-50 rounded">
                      <div className="flex items-center gap-4 mb-3">
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
                      {lesson.lessonType === 'video' &&
                        lesson.attachmentUrl && (
                          <div className="mt-4">
                            <video
                              controls
                              className="w-full rounded"
                              src={getVideoUrl(lesson.attachmentUrl)}
                            >
                              Your browser does not support video playback.
                            </video>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
