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
                       <p><b>id:</b> ${item.id};</p> 
                       <p><b>Название товара:</b> ${item.name};</p> 
                       <p><b>Цена товара (грн):</b> ${item.cost} = ${item.cost * item.count};</p> 
                       <p><b>Тип товара (един.):</b> ${item.type};</p>
                       <p><b>Количество (грн):</b> ${item.count};</p>
                   </p>`
            })

            let itemToClient = req.body.items.map((item, index) => {
                return `
                   <p>
                       <p><b>${index + 1}) Название товара:</b> ${item.name};</p> 
                       <p><b>Тип товара:</b> ${item.type};</p>
                       <p><b>Цена товара (грн):</b> ${item.cost};</p> 
                       <p><b>Количество (един.):</b> ${item.count};</p>
                       <p><b>Общая сумма (грн):</b> ${item.cost * item.count};</p>
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
                       <p><b>Телефон:</b> ${req.body.phone},</p>
                       <p><b>Email:</b> ${req.body.Email},</p>
                   
                   <b>Товар:</b>
                   <p>${item}</p>
                   <h2>Общая цена заказа (грн): ${req.body.items.reduce((count, item) => { return count + item.cost * item.count }, 0)}</h2>
                   <p><b>Промокод: </b>${req.body.promocode}</p>
                   <p>------------------------------------------------------------------------------------------</p>
                   <b>Способ оплаты и доставки: </b>
                   <p><b>Способ оплаты:</b> ${req.body.pay};</p>
                   <p><b>Способ доставки:</b> ${req.body.post};</p>
                   <br />
                   <p>
                       <p><b>Имя Получателя:</b> ${req.body.postInfo.post_FirstName}, ${req.body.postInfo.post_LastName};</p> 
                       <p><b>Телефон Получателя:</b> ${req.body.postInfo.post_Phone};</p> 
                       <p><b>Отделение почты:</b> ${req.body.postInfo.post_NumberPost};</p>
                   </p>
                   <br />
                   <h3>Данное письмо требует ответ =>  ${req.body.Email}</h3>
                `,
            }

            let messageToClient = {
                from: process.env.EMAIL_NODEMAILER,
                to: `${req.body.Email}`,
                subject: 'EcoСhoice благодарит Вас за заказ!',
                html: `
                    <h2>Интернет магазин ecochoice.com.ua</h2>
                    <h2>Номер заказа: ${req.body.namLid}</h2>
                    <br />
                    <b>Ваш заказ:</b>
                    <p>${itemToClient}</p>
                    <h2>Общая сумма заказа (грн): ${req.body.items.reduce((count, item) => { return count + item.cost * item.count }, 0)}</h2>
                    
                    <div>
                        <p><b>Способ оплаты:</b> ${req.body.pay} (Если Вы выбрали оплату на карту, менеджер свяжется с Вами для передачи реквизитов);</p>
                        <p><b>Способ доставки:</b> ${req.body.post};</p>
                        <br />
                        <h3>Ваш заказ будет отправлен:</h3>
                        <p>
                            <p><b>Отделение почты:</b> ${req.body.postInfo.post_NumberPost};</p>
                            <p><b>Имя получателя:</b> ${req.body.postInfo.post_FirstName}, ${req.body.postInfo.post_LastName};</p> 
                            <p><b>Телефон получателя:</b> ${req.body.postInfo.post_Phone};</p> 
                        </p>
                    </div>
                    <br />
                    <div>
                        <p>Ваш заказ был принят нашим менеджером, и начал обрабатываться!</p>
                        <p>Если у Вас есть дополнительные вопросы, можете написать нам (viber, telegram): 0674550801 (Екатерина)</p>
                        <p>
                            Для более детальной информации наш менеджер с Вами свяжится через viber, telegram,
                            или наберет Вас на мобильный.
                        </p>
                    </div>
                    <br />
                    <h2>Это письмо не требует ответа!</h2>
                `
            }

            if (req.body.Email) {
                transporter.sendMail(messageToClient);
            }

            transporter.sendMail(message, (err, info) => {
                console.log(`Data send gmail err`, err);
                console.log(`Data Gmail`, info);
                if (err) {
                    return res.status(400).json({ massage: 'Нету связи с Gmail, обратитесь к менеджеру да более детальной информацией!' })
                } else {
                    return res.status(200).json({ message: 'Данные успешно переданы!' })
                }
            });


        }
    }

}