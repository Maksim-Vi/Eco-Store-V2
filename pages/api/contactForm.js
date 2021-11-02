import NextCors from 'nextjs-cors';
let nodemailer = require('nodemailer')

export default async function setContactForm(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'POST': {
            try {
                const transporter = await nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_NODEMAILER,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                let message = {
                    from: req.body.Email,
                    to: `Mailer <${process.env.EMAIL_NODEMAILER}>`,
                    subject: 'From Eco Store',
                    text: `Вам пришело письмо от:
                        Имя: ${req.body.firstName},
                        Email: ${req.body.Email},
        
                        Коментаций:
                        ${req.body.subject}
                        
                        Данное письмо требует ответ =>  ${req.body.Email}`,
                }

                await transporter.sendMail(message);

                return res.status(200).json({ message: 'Данные успешно переданы!' })
            } catch (error) {
                return res.status(401).json({ massage: 'Нету связи с Gmail, обратитесь к менеджеру да более детальной информацией!' })
            }
        }
    }

}