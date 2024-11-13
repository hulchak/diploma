import express from 'express';

import keycloak from '../auth/keycloak.js';
import Course from '../model/courses.js';
import Student from '../model/student.js';
import Teacher from '../model/teacher.js';
import Subject from '../model/subject.js';

const router = express.Router();
router.use(keycloak.protect());

router.post('/', async (req, res) => {
  let course = new Course(req.body);
  let result = await course.save();
  let student = new Student({ course: result._id });
  await student.save();
  let teacher = new Teacher({ course: result._id });
  await teacher.save();
  let subject = new Subject({ course: result._id });
  await subject.save();

  res.send(result).status(204);
});

router.get('/', async (req, res) => {
  let results = await Course.find();

  res.send(results).status(200);
});

export default router;
