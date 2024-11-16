import express from 'express';

import keycloak from '../auth/keycloak.js';
import Student from '../model/student.js';

const router = express.Router();
router.use(keycloak.protect());

router.post('/', async (req, res) => {
  let student = new Student(req.body);
  let result = await student.save();

  res.send(result).status(204);
});

router.get('/', async (req, res) => {
  let results = await Student.find();

  res.send(results).status(200);
});

export default router;
