import mongoose, { Schema, ObjectId } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const RatingSchema = new Schema({
  student: { type: ObjectId, ref: 'Student', required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
});

const CourseSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  duration: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
  previewImageUrl: { type: String },
  subject: { type: String, required: true },
  students: [{ type: ObjectId, ref: 'Student' }],
  content: [
    {
      moduleTitle: { type: String, required: true },
      lessons: [
        {
          lessonTitle: { type: String, required: true },
          lessonType: {
            type: String,
            enum: ['video', 'quiz', 'audio', 'text'],
            required: true,
          },
          duration: { type: Number, required: true },
          attachmentUrl: { type: String },
          materials: [{ type: String }],
        },
      ],
    },
  ],
  ratings: [RatingSchema],
  lastUpdated: { type: Date, default: Date.now },
  rating: { type: Number, min: 0, max: 5 },
  isPublished: { type: Boolean, default: false },
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
