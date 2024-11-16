import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import history from 'connect-history-api-fallback';

import keycloak from './auth/keycloak.js';
import courses from './routes/courses.js';
import students from './routes/students.js';
import teachers from './routes/teachers.js';
import subjects from './routes/subjects.js';
import cats from './routes/cats.js';

mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(cors());
app.use(express.json());
app.use(history());
app.use(express.static(process.cwd() + '/client'));
app.use(keycloak.middleware());

app.use('/cats', cats);
app.use('/courses', courses);
app.use('/students', students);
app.use('/teachers', teachers);
app.use('/subjects', subjects);

app.listen(8090, () => {
  console.log('Server is running');
});
