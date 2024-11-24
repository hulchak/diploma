import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';
import keycloak from '../auth/keycloak.js';
import Course from '../model/courses.js';
import Teacher from '../model/teacher.js';
// import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();
router.use(keycloak.protect());

// const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
const __dirname = import.meta.dirname;
console.log('dirname:', __dirname);

// Налаштування multer для збереження файлів
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/videos/raw/';
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
    console.log('Video uploaded:', inputPath);
    const outputPath = path.join(
      'uploads/videos/compressed/',
      `${req.file.filename}`
    );
    console.log('Output path:', outputPath);

    exec(
      `ffmpeg -i ${inputPath} -c:v libx264 -preset slow -crf 23 ${outputPath}`,
      (error, stdout) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
        console.log('Compression complete!', stdout);
      }
    );
    return res.status(200).json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
    });
    // .run();
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
  console.log('materials:', JSON.stringify(req.body.modules));
  let course = new Course({
    ...req.body,
    createdBy: teacher._id,
    content: req.body.modules,
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
