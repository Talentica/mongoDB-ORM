import * as express from 'express'
import { fetch, create } from '../controllers/employee.controller'

const router = express.Router()

router.get('/', fetch);
router.post('/', create);

export default router