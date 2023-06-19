import express from 'express'

import { sendOTPController, verifyOTPController, forgotPasswordController } from '../Controllers/otp.js'

const router = express.Router()

router.post('/sendOTP', sendOTPController)
router.post('/verifyOTP', verifyOTPController)
router.post('/forgotPassword', forgotPasswordController);


export default router;