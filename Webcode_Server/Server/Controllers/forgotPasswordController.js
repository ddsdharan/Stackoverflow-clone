import OTP from '../Models/otp.js';
import generateOTP from '../Utility/generateOTP.js';
import sendEmail from '../Utility/sendEmail.js';
import User from '../Models/auth.js';

const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error('Email not found');
        }

        const otp = await generateOTP();
        const subject = 'Forgot Password - OTP';
        const message = `Your OTP for password reset is: ${otp}. Please use this OTP to reset your password.`;
        await sendEmail({ email, subject, message });

        const hashedOTP = await hashData(otp);
        await OTP.updateOne({ email }, { otp: hashedOTP }, { upsert: true });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export { forgotPasswordController };
