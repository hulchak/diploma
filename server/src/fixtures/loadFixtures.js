import mongoose from 'mongoose';
import Course from '../model/courses.js';
import Student from '../model/student.js';
import courseFixtures from './courseFixtures.json';
import studentFixtures from './studentFixtures.json';

const loadFixtures = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Course.deleteMany({});
    await Student.deleteMany({});

    await Course.insertMany(JSON.stringify(courseFixtures));
    await Student.insertMany(JSON.stringify(studentFixtures));

    console.log('Fixtures loaded successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error loading fixtures:', error);
    mongoose.connection.close();
  }
};

loadFixtures();
