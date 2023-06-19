import express from 'express'

import { deleteAnswer, postAnswer } from '../Controllers/answers.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.patch('/post/:id', auth, postAnswer)
router.patch('/delete/:id', auth, deleteAnswer)

export default router