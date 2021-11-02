import axios from "axios";
import { sendTelegramMsg } from "./telegram";

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

    if (!res && (res.status === 500 || res.status === 401)) {
        return await res.status(500).json({ message: 'Login failed, check please connection db or your login and password', data: [] })
    }

    return await res
}

export const postRegisterApi = async (FirstName, LastName, email, password) => {
    let data = { FirstName: FirstName, LastName: LastName, email: email, password: password }
    let res = await axios({
        method: 'POST',
        url: `${URL}/signup`,
        data: data
    }).catch((err) => {
        console.log(`login ERROR`, err);
    })

    if (!res && res.status === 500 || res.status === 401) {
        return await res.status(500).json({ message: 'Login failed, check please connection db or your login and password', data: [] })
    }

    return await res
}

export const postFormStoreApi = async (firstName, Email, subject) => {

    let response = await fetch(`${URL}/contactForm`, {
        method: "POST",
        body: JSON.stringify({ firstName, Email, subject }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    if (response && (response.status === 200 || response.status === 201)) {
        return {
            status: response.status,
            data: await response.json()
        }
    } else {
        return {
            status: response.status,
            data: await response.json()
        }
    }

}

export const postFormStoreBasketApi = async (namLid, firstName, Email, phone, promocode, pay, post, postInfo, items) => {
    let response = await fetch(`${URL}/contactFormOrder`, {
        method: "POST",
        body: JSON.stringify({ namLid, firstName, phone, Email, promocode, pay, post, postInfo, items }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    let dataTelegram = await sendTelegramMsg({ namLid, firstName, phone, Email, promocode, pay, post, postInfo, items })

    if (response && (response.status === 200 || response.status === 201)) {
        return {
            status: response.status,
            data: await response.json()
        }
    } else {
        if (dataTelegram && (dataTelegram.status === 200 || dataTelegram.status === 201)) {
            return {
                status: dataTelegram.status,
                data: await dataTelegram
            }
        }
        return {
            status: response.status,
            data: await response.json()
        }
    }
}