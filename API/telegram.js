
const TOKEN = process.env.TELEGRAM_TOKEN || '2065373657:AAFYPKjhGaKppVj4HpEPvqRby40Mpmuh0iQ';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || '776918618';

export const sendTelegramMsg = async (dataLid) => {
    let url = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage';
    let data = JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'Markdown',
        //text: '*Новый лид*\n' + '#261524' + '\n\n*Имя:* ' + dataLid.firstName + '\n*Телефон:* ' + dataLid.phone + '\n*Емейл:* ' + dataLid.Email + '\n*Промокол:* ' + dataLid.promocode + '\n\n*Оплата:* ' + dataLid.pay + '\n*Доставка:* ' + dataLid.post + '\n*Iнформация по доставкe:* \n' + dataLid.postInfo +  '\n\n*Товары:* \n' + dataLid.items +''
        text: formatText(dataLid)
    });

    try {
        let response = await fetch(`${url}`, {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    
        return response
    } catch (error) {
        return {
            status: 401,
            message: 'Telegran Token or URL invalid'
        }
    }
  
}

const formatText = (dataLid) => {
    let firstString = `*Новый заказ:* ${dataLid.namLid}\n\n*Имя:* ${dataLid.firstName}\n*Телефон:* ${dataLid.phone}\n*Емейл:* ${dataLid.Email}\n*Промокод:* ${dataLid.promocode}`
    let secondSting = `\n\n*Оплата:* ${dataLid.pay}\n*Доставка:* ${dataLid.post}\n\n*Iнформация по доставкe:*\n\n*Имя Получателя:* ${dataLid.postInfo.post_FirstName}, ${dataLid.postInfo.post_LastName};\n*Телефон Получателя:* ${dataLid.postInfo.post_Phone};\n*Отделение почты:* ${dataLid.postInfo.post_NumberPost};\n\n*Товары:*\n`
    let items = dataLid.items.map(item => {
        return `\n*id:* ${item.id};\n*Название товара:* ${item.name};\n*тип товара:* ${item.type};\n*количество:* ${item.count};\n*цена товара:* ${item.cost} = ${item.cost * item.count};\n`
    })
    let countCostItems = `\n--------------------------------\n*Общая цена:* ${dataLid.items.reduce((count, item) => {return count + item.cost * item.count}, 0)}`

    return firstString + secondSting + items + countCostItems
}
