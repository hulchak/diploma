import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  keycloakId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: {
    type: Map,
    of: Number,
    default: {},
  },
});

const Student = mongoose.model('Student', StudentSchema);
export default Student;
