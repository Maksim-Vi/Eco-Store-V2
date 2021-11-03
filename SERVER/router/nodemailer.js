const nodemailer = require("nodemailer");

let isProd = false

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: !isProd ? 'maksdev01panel@gmail.com' : 'info.ecoChoice@gmail.com',
        pass: !isProd ? 'Vfrcbv1996!' : 'katyaeco1910'
    }
});


const mailer = message => {
    transporter.sendMail(message);
}

const form = (req, res) => {
    try {
        let message = {
            from: req.body.Email,
            to: `Mailer <${!isProd ? 'maksdev01panel@gmail.com' : 'info.ecoChoice@gmail.com'}>`,
            subject: 'From Eco Store',
            text: `Вам пришело письмо от:
                    Имя: ${req.body.firstName},
                    Email: ${req.body.Email},
    
                    Коментаций:
                    ${req.body.subject}
                    
                    Данное письмо требует ответ =>  ${req.body.Email}`,
        }
        mailer(message)
        return res.status(200).json({ message: 'Данные успешно переданы!' })
    } catch (err) {
        return res.status(401).json({ massage: 'Нету связи с Gmail, обратитесь к менеджеру да более детальной информацией!' })
    }
};

const formStore = (req, res) => {
    try {
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
            to: `Mailer <${!isProd ? 'maksdev01panel@gmail.com' : 'info.ecoChoice@gmail.com'}>`,
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
        mailer(message)
        return res.status(200).json({ message: 'Данные успешно переданы!' })
    } catch (error) {
        return res.status(401).json({ massage: 'Нету связи с Gmail, обратитесь к менеджеру да более детальной информацией!' })
    }
};


module.exports = { form, formStore }