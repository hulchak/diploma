import { useFieldArray } from 'react-hook-form';
import CourseLessonForm from './CourseLessonForm';

export default function CourseModuleForm({
  control,
  register,
  setValue,
  moduleIndex,
}) {
  const { fields: lessonFields, append: appendLesson } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons`,
  });

  return (
    <div className="border p-4 mb-4 rounded">
      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="Назва модуля"
        {...register(`modules.${moduleIndex}.moduleTitle`, {
          required: "Назва модуля обов'язкова",
        })}
      />

      {lessonFields.map((lesson, lessonIndex) => (
        <CourseLessonForm
          key={lesson.id}
          register={register}
          setValue={setValue}
          lessonIndex={lessonIndex}
          moduleIndex={moduleIndex}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          appendLesson({
            lessonTitle: '',
            lessonType: 'video',
            duration: 0,
            attachmentUrl: '',
            materials: [],
          })
        }
        className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Додати урок
      </button>
    </div>
  );
}
