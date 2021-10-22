
export default async function setContactForm(req, res) {
   switch(req.method){
       case 'POST': {
           let nodemailer = require('nodemailer')

           const transporter = nodemailer.createTransport({
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
                to: `Mailer <${process.env.EMAIL_NODEMAILER}>` ,
                subject: 'From Eco Store',
                text: `Вам пришело письмо от:
                    Имя: ${req.body.firstName},
                    Email: ${req.body.Email},
    
                    Коментаций:
                    ${req.body.subject}
                    
                    Данное письмо требует ответ =>  ${req.body.Email}`,
            }

            transporter.sendMail(message , (err,info) => {
                if (err){
                    return res.status(500).json({massage:'Что то пошло не так, попробуйте снова',err})
                } 
                console.log('Email send info:', info)
            });

            res.status(200).json({message: 'Данные успешно переданы!'})  
       } 
   }
    
}