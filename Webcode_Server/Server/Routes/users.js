import express from 'express'
import { logInController, signUpController } from '../Controllers/auth.js';
import { getAllUsers, updateProfile } from '../Controllers/users.js'
import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/signup', signUpController)
router.post('/login', logInController)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router