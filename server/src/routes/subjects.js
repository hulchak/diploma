import express from 'express';

import keycloak from '../auth/keycloak.js';
import Subject from '../model/subject.js';

const router = express.Router();
router.use(keycloak.protect());

router.post('/', async (req, res) => {
  let subject = new Subject(req.body);
  let result = await subject.save();

  res.send(result).status(204);
});

router.get('/', async (req, res) => {
  let results = await Subject.find();

  res.send(results).status(200);
});

export default router;
