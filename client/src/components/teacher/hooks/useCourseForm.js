import { useForm } from 'react-hook-form';
import { useAddCoursesMutation } from '../../../store/courses/coursesApiSlice.js';

export const useCourseForm = () => {
  const [addCourse] = useAddCoursesMutation();

  const methods = useForm({
    defaultValues: {
      name: '',
      subject: '',
      description: '',
      duration: '',
      startDate: '',
      endDate: '',
      previewImageUrl: '',
      modules: [
        {
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
        },
      ],
    },
  });

  const onSubmit = async (data) => {
    await addCourse(data);
  };

  return {
    methods,
    onSubmit,
  };
};
