import mongoose, { Schema, ObjectId } from 'mongoose';

const CourseSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  students: [{ type: ObjectId, ref: 'Student' }],
  availableForGroups: [{ type: ObjectId, ref: 'Group' }],
  content: [
    {
      moduleTitle: { type: String, required: true },
      lessons: [
        {
          lessonTitle: { type: String, required: true },
          lessonType: {
            type: String,
            enum: ['video', 'quiz', 'assignment'],
            required: true,
          },
          duration: { type: Number, required: true },
          videoUrl: { type: String },
          materials: [{ type: String }],
        },
      ],
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
  rating: { type: Number, min: 0, max: 5 },
  isPublished: { type: Boolean, default: false },
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
