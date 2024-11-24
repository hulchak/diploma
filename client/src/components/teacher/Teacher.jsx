import { useFieldArray } from 'react-hook-form';
import CourseBasicInfoForm from './forms/CourseBasicInfoForm';
import CourseModuleForm from './forms/CourseModuleForm';
import { useCourseForm } from './hooks/useCourseForm';

export default function Teacher() {
  const { methods, onSubmit } = useCourseForm();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const { fields: moduleFields, append: appendModule } = useFieldArray({
    control,
    name: 'modules',
  });

  return (
    <form
      className="w-full max-w-4xl mx-auto p-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-2xl mb-6">Створення нового курсу</h2>

      <CourseBasicInfoForm register={register} errors={errors} />

      <div className="mb-8">
        <h3 className="font-semibold text-xl mb-4">Модулі та уроки</h3>

        {moduleFields.map((module, index) => (
          <CourseModuleForm
            key={module.id}
            control={control}
            register={register}
            setValue={setValue}
            moduleIndex={index}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            appendModule({
              moduleTitle: '',
              lessons: [
                {
                  lessonTitle: '',
                  lessonType: 'video',
                  duration: 0,
                  attachmentUrl: '',
                  materials: [],
                },
              ],
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Додати модуль
        </button>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded font-semibold"
      >
        Створити курс
      </button>
    </form>
  );
}
