import {useState, useCallback, useEffect} from 'react';

const storageName = 'UserData'

export const useAuch = () =>{
    const [token, setToken] = useState(null)
    const [userID, setUserID] = useState(null)

    const login = useCallback((jwtToken, id) =>{
        setToken(jwtToken)
        setUserID(id)
        sessionStorage.setItem(storageName, JSON.stringify({
            userID: id,token: jwtToken
        }))
    }, []) 

    const logout = useCallback(() =>{ 
        setToken(null)
        setUserID(null)
        sessionStorage.removeItem(storageName)
    }, []) 


    // проверка есть ли данные о пользователи в локальном сторе
    useEffect(()=>{
        const data = JSON.parse(sessionStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userID)
        }
    }, [login])

    return {login, logout, token, userID}
}