export default function CourseBasicInfoForm({ register, errors }) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-xl mb-4">Основна інформація</h3>

      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="Назва курсу"
        {...register('name', { required: "Назва курсу обов'язкова" })}
      />
      {errors.name && (
        <span className="text-red-500">{errors.name.message}</span>
      )}

      {/* Додаємо поле для вибору предмету */}
      <select
        className="w-full px-4 py-2 mb-4 border rounded"
        {...register('subject', { required: "Предмет обов'язковий" })}
      >
        <option value="">Оберіть предмет</option>
        <option value="mathematics">Математика</option>
        <option value="physics">Фізика</option>
        <option value="programming">Програмування</option>
        <option value="databases">Бази даних</option>
        <option value="networks">Мережі</option>
      </select>
      {errors.subject && (
        <span className="text-red-500">{errors.subject.message}</span>
      )}

      <input
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="Опис курсу"
        {...register('description', { required: "Опис курсу обов'язковий" })}
      />
      {errors.description && (
        <span className="text-red-500">{errors.description.message}</span>
      )}

      <input
        type="number"
        className="w-full px-4 py-2 mb-4 border rounded"
        placeholder="Тривалість (днів)"
        {...register('duration', { required: "Тривалість обов'язкова" })}
      />
      {errors.duration && (
        <span className="text-red-500">{errors.duration.message}</span>
      )}

      <input
        type="date"
        className="w-full px-4 py-2 mb-4 border rounded"
        {...register('startDate', { required: "Дата початку обов'язкова" })}
      />
      {errors.startDate && (
        <span className="text-red-500">{errors.startDate.message}</span>
      )}

      <input
        type="date"
        className="w-full px-4 py-2 mb-4 border rounded"
        {...register('endDate', { required: "Дата закінчення обов'язкова" })}
      />
      {errors.endDate && (
        <span className="text-red-500">{errors.endDate.message}</span>
      )}
    </div>
  );
}
