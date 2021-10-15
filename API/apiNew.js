import axios from "axios";

let URL = process.env.SERVER_URL

export const postSignInApi = async (email, password) => {
    
    let data = { email: email, password: password }
    let res = await axios({
        method: 'POST',
        url: `${URL}/signin`,
        data: data
    }).catch((err) => {
        console.log(`login ERROR`, err);
    })

    if(!res && res.status === 500 || res.status === 401){
        return await res.status(500).json({message: 'Login failed, check please connection db or your login and password', data: []})
    }

    return await res
}


export const postFormStoreApi = async (token, firstName, Email, subject, phone) => {
    try {
        // let response= await fetch(`${URL}/MainLink/form`, {
        //     method: "POST",
        //     body: JSON.stringify({firstName,Email,subject,phone}),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        // return await response.json()

        let response = await fetch(`${URL}/contactForm`, {
            method: "POST",
            body: JSON.stringify({ firstName, Email, subject, phone }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()

    } catch (error) {
        console.log(`data not found`);
        return data = []
    }

}

export const postFormStoreBasketApi = async (firstName, Email, phone, promocode, pay, post, postInfo, items) => {
    try {
        // let response= await fetch(`${URL}/StoreBasket/form`, {
        //     method: "POST",
        //     body: JSON.stringify({firstName,phone,Email,promocode,pay,post,postInfo,items}),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        // return await response

        let response = await fetch(`${URL}/contactFormOrder`, {
            method: "POST",
            body: JSON.stringify({ firstName, phone, Email, promocode, pay, post, postInfo, items }),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })

        return await response

    } catch (error) {
        console.log(`data not found`);
        return data = []
    }
}