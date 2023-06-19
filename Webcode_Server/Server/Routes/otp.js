import express from 'express'

import { sendOTPController, verifyOTPController } from '../Controllers/otp.js'
import { forgotPasswordController } from '../Controllers/forgotPasswordController.js'

const router = express.Router()

router.post('/sendOTP', sendOTPController)
router.post('/verifyOTP', verifyOTPController)
router.post('/forgotPassword', forgotPasswordController);


export default router;