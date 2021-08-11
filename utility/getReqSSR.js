import Router from 'next/router';

export async function myGet(url, req, res) {

    // let URL = process.env.SERVER_URL

    if (req) {
        // server
        return {}
    } else {
        // client
        const data = JSON.parse(localStorage.getItem('UserData'))
        console.log(data);
        const resp = await fetch(url, {
            headers: { authorization: data.token },
            body:{id: data.userID}
        });
    
        if (resp.status === 401 && req) {
            res.writeHead(302, {
                Location: `${URL}/AdminPanel/SignIn`
            });
            res.end();
            return;
        }

        const json = await resp.json();
        return json;
    }



}