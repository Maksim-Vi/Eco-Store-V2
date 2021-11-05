import NextCors from 'nextjs-cors';
let nodemailer = require('nodemailer')

export default async function setContactFormOrder(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'POST': {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_NODEMAILER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            let item = req.body.items.map(item => {
                return `
                   <p>
                       <p>id: ${item.id};</p> 
                       <p>Название товара: ${item.name};</p> 
                       <p>цена товара: ${item.cost} = ${item.cost * item.count};</p> 
                       <p>типо товара: ${item.type};</p>
                       <p>количество: ${item.count};</p>
                   </p>`
            })

            let message = {
                from: req.body.Email,
                to: `Mailer <${process.env.EMAIL_NODEMAILER}>`,
                subject: 'From Eco Store',

                html: `
                   <h2>Номер заказа: ${req.body.namLid}</h2>
                   <h3>Вам пришел заказ от:</h3>
                       <p><b>Имя:</b> ${req.body.firstName},</p>
                       <p><b>телефон:</b> ${req.body.phone},</p>
                       <p><b>Email:</b> ${req.body.Email},</p>
                   
                   <b>Товар:</b>
                   <p>${item}</p>
                   <b>Общая цена заказа:</b><p>${req.body.items.reduce((count, item) => { return count + item.cost * item.count }, 0)}</p>
                   <p><b>Промокод: </b>${req.body.promocode}</p>
                   <p>------------------------------------------------------------------------------------------</p>
                   <b>Способ оплаты и доставки: </b>
                   <br />
                   <p><b>Способ оплаты:</b>${req.body.pay}</p>
                   <p><b>Способ доставки:</b>${req.body.post}</p>
                   <br />
                   <p>
                       <p><b>Имя Отправляемого:</b> ${req.body.postInfo.post_FirstName}, ${req.body.postInfo.post_LastName}</p> 
                       <p><b>Телефон Отправляемого:</b> ${req.body.postInfo.post_Phone};</p> 
                       <p><b>Отделение почты:</b> ${req.body.postInfo.post_NumberPost};</p>
                   </p>
                   <br />
                   <h3>Данное письмо требует ответ =>  ${req.body.Email}</h3>
                   `,
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