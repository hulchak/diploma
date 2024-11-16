import express from 'express';

import keycloak from '../auth/keycloak.js';
import Teacher from '../model/teacher.js';

const router = express.Router();
router.use(keycloak.protect());

router.post('/', async (req, res) => {
  let teacher = new Teacher(req.body);
  let result = await teacher.save();

  res.send(result).status(204);
});

router.get('/', async (req, res) => {
  let results = await Teacher.find();

  res.send(results).status(200);
});

export default router;
