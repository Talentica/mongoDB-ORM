import * as express from 'express';
import { Teacher } from '../models/teacher.model';
// import { fetch, create } from '../controllers/teacher.controller';

const router = express.Router();

const test = new Teacher();

// router.get('/', fetch);
// router.post('/', create);

export default router;
