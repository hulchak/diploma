import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import history from 'connect-history-api-fallback';
import path from 'path';
import fs from 'fs';

import keycloak from './auth/keycloak.js';
import courses from './routes/courses.js';
import students from './routes/students.js';
import teachers from './routes/teachers.js';
import subjects from './routes/subjects.js';

mongoose.connect(process.env.MONGO_URL);

const app = express();

// Increase payload size limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors());
app.use(history());
app.use(express.static(process.cwd() + '/client'));
app.use(keycloak.middleware());

// Створюємо статичну папку для відео
const videoUploadPath = path.join(process.cwd(), 'uploads/videos');
if (!fs.existsSync(videoUploadPath)) {
  fs.mkdirSync(videoUploadPath, { recursive: true });
}
app.use('/videos', express.static(videoUploadPath));

app.use('/courses', courses);
app.use('/students', students);
app.use('/teachers', teachers);
app.use('/subjects', subjects);

app.listen(8090, () => {
  console.log('Server is running');
});
