import OTP from '../Models/otp.js';
import generateOTP from '../Utility/generateOTP.js';
import sendEmail from '../Utility/sendEmail.js';
import { hashData, verifyHashedData } from '../Utility/hashData.js';

const sendOTPController = async (req, res) => {
    try {
        const { email, subject, message, duration } = req.body;
        const createdOTP = await sendOTP({ email, subject, message, duration });
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const verifyOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const validOTP = await verifyOTP({ email, otp });
        res.status(200).json({ valid: validOTP });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const verifyOTP = async ({ email, otp }) => {
    try {
        if (!(email && otp)) {
            throw Error('Provide values for email and otp');
        }

        const matchedOTPRecord = await OTP.findOne({ email });
        if (!matchedOTPRecord) {
            throw Error('No OTP record found');
        }

        const { expiresAt } = matchedOTPRecord;

        if (expiresAt < Date.now()) {
            await OTP.deleteOne({ email });
            throw Error('Code has expired. Request a new one');
        }

        const hashedOTP = matchedOTPRecord.otp;
        const validOTP = await verifyHashedData(otp, hashedOTP);
        return validOTP;
    } catch (error) {
        throw error;
    }
};

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw Error('Provide values for email, subject, and message');
        }

        await OTP.deleteOne({ email });

        const generatedOTP = await generateOTP();

        const mailOptions = {
            from: 'ddsdharan@outlook.com',
            to: email,
            subject,
            html: `<p>${message}</p>
          <p style="color:tomato; font-size:25px; letter-spacing:2px;">
            <b>${generatedOTP}</b>
          </p>
          <p>This code 
            <b>expires in ${duration} hour(s)</b>.
          </p>`,
        };
        await sendEmail(mailOptions);

        const hashedOTP = await hashData(generatedOTP);
        const newOTP = new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        throw error;
    }
};

const deleteOTP = async (email) => {
    try {
        await OTP.deleteOne({ email });
    } catch (error) {
        throw error;
    }
};

export { sendOTPController, verifyOTPController, deleteOTP };
