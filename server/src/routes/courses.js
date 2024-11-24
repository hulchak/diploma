import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import keycloak from '../auth/keycloak.js';
import Course from '../model/courses.js';
import Teacher from '../model/teacher.js';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
router.use(keycloak.protect());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Налаштування multer для збереження файлів
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/videos/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'));
    }
  },
});

// Роут для завантаження відео
router.post('/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(
      __dirname,
      `../../uploads/videos/compressed-${req.file.filename}`
    );

    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libx265') // Використовуємо libx265 для кращого стискання
      .outputOptions('-crf 23') // Налаштування CRF для високої якості
      .size('640x?')
      .on('end', () => {
        console.log('Video compression complete');
        res.json({
          url: `http://localhost:8090/videos/compressed-${req.file.filename}`,
        });
      })
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
        res.status(500).json({ error: err.message });
      })
      .run();
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Існуючі роути...
router.post('/', async (req, res) => {
  console.log('Course creation');
  console.log(req.body);
  let keycloakId = req.kauth.grant.access_token.content.sub;
  console.log(keycloakId);
  let teacher = await Teacher.findOne({ keycloakId: keycloakId });
  console.log(teacher);
  let course = new Course({
    ...req.body,
    createdBy: teacher._id,
  });
  try {
    let result = await course.save();
    res.status(201).json(result);
  } catch (err) {
    console.error('Error saving course:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  let results = await Course.find();

  res.send(results).status(200);
});

export default router;
