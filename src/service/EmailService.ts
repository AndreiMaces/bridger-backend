import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { IEmailService } from './IService/IEmailService';

class EmailSerivce implements IEmailService {
    sendEmail(email: string, subject: string, message: string): Promise<any> 
    {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)
        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject,
            html: message,
        } as MailDataRequired;
        return sgMail.send(msg);
    }
}

export default new EmailSerivce();