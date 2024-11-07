import express from 'express';

import keycloak from '../auth/keycloak.js';
import Course from '../model/courses.js';

const router = express.Router();
router.use(keycloak.protect());

router.post('/', async (req, res) => {
  let course = new Course(req.body);
  let result = await course.save();

  res.send(result).status(204);
});

router.get('/', async (req, res) => {
  let results = await Course.find();

  res.send(results).status(200);
});

export default router;
