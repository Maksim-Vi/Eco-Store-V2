
const TOKEN = '2065373657:AAFYPKjhGaKppVj4HpEPvqRby40Mpmuh0iQ';
const CHAT_ID = '768197028'; 

// var form = document.querySelector('.form'); // находим в DOM нашу лид-форму
// form.addEventListener("submit", function (e) { // прослушиваем форму
//     e.preventDefault(); // перехватываем стандартный ответ
//     data = new FormData(this); // вместо serialize на jQuery
//     sendMsg(data); // передаём данные из формы на отправку
// })

export const sendTelegramMsg = async () => {
    let url = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage';
    let data = JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'Markdown',
        // text: '*Новый лид*\n' + data.get("title") + '\n\n*Имя:* ' + data.get("name") + '\n*Телефон:* ' + data.get("phone") + '\n*Откуда:* [' + window.location.href + '](' + window.location.href + ')'
        text: '*Новый лид*'
    });

    let response = await fetch(`${url}/contactFormOrder`, {
        method: "POST",
        body: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })

    return response
}