import express from 'express';

import keycloak from '../auth/keycloak.js';
import Course from '../model/courses.js';
import Teacher from '../model/teacher.js';

const router = express.Router();
router.use(keycloak.protect());

router.post('/', async (req, res) => {
  // let course = new Course(req.body);
  // let result = await course.save();

  // res.send(result).status(204);
  console.log('Course creation');
  console.log(req.body);
  // console.log(req.headers.authorization);

  // combine request body with the user and lastUpdated time and other fields
  let keycloakId = req.kauth.grant.access_token.content.sub;
  console.log(keycloakId);
  // bf284f09-9c7d-4e80-9ff6-8607c8d0d717
  let teacher = await Teacher.findOne({ keycloakId: keycloakId });
  console.log(teacher);
  let course = new Course({
    ...req.body,
    createdBy: teacher._id,
  });

  let result = await course.save();

  res.send(result).status(204);
});

router.get('/', async (req, res) => {
  let results = await Course.find();

  res.send(results).status(200);
});

export default router;
