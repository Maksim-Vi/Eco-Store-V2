import NextCors from 'nextjs-cors';
let nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

export default async function setContactForm(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'POST': {
            const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: process.env.EMAIL_NODEMAILER,
                    pass: process.env.EMAIL_PASSWORD
                }
            }))

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

            transporter.sendMail(message, (err, info) => {
                console.log(`Data send gmail err`, err);
                console.log(`Data Gmail`, info);
                if (err) {
                    return res.status(401).json({ massage: 'Нету связи с Gmail, обратитесь к менеджеру да более детальной информацией!' })
                } else {
                    return res.status(200).json({ message: 'Данные успешно переданы!' })
                }
            });
        }
    }

}