import axios from 'axios'


export const InstenceAPI2 = axios.create({
    withCredentials: true,
    // baseURL:'https://maksim-vi.github.io/Eco-Store/', // обязательно такая запись иначе не работает baseURL
    // baseURL:'http://localhost:5000',
    headers:{
       'Content-Type': 'application/json',
    }
})

//-----------------------------------------------

export const getStoreApi = (token) => {
    try {
        return InstenceAPI2({
            url: `/products` ,
            method: 'GET',
            headers: {
				'Access-Control-Allow-Headers':'application/json',
				'Content-Type': 'text/javascript' 
            }
        })
        .then (response => {
            console.log(response.data);
            return (
                response.data
            )
        }) 
        .catch(err =>{
            console.log(`data not found`);
        })
    } catch (error) {
        console.log(`data not found`);
        return data = []
    }
    
    }

export const postFormStoreBasketApi = (token,firstName,Email,phone,promocode,pay,post,postInfo,items) => { 
    try {
        return InstenceAPI2({
            url: `/StoreBasket/form` ,
            method: 'POST',
            headers: {
                'Authorization': token,
                //'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {firstName,phone,Email,promocode,pay,post,postInfo,items}
        })
        .then (response => {
            return response.data;
        }) 
        .catch(err =>{
            console.log(`data not found`);
            return data = []
        })
    } catch (error) {
        console.log(`data not found`);
    }
 
}

export const getPopularApi = () => { 
    try {
        return InstenceAPI2({
            url: `/top` ,
            method: 'GET',
            headers: {
                'Access-Control-Allow-Headers':'application/json',
                'Content-Type': 'text/javascript' 
            }
        })
        .then (response => {
            return response.data;
        }) 
        .catch(err =>{
            console.log(`data not found`);
        })
    } catch (error) {
        console.log(`data not found`);
        return data = []
    }
 
}
