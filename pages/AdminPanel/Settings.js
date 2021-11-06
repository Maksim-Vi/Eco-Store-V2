

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCookie } from '../../components/common/session'
import DashboardMain from '../../dashboard/DashboardMain'
import SettingsContent from '../../dashboard/pages/Settings'
import { setSettings } from '../../redux/reducers/SRM/settings/action'
import { checkisVerifyToken } from '../../utility/middlware'

const Settings = ({settings}) => {

    const dispatch = useDispatch()
   
    useEffect(() => {
        if(settings){
            dispatch(setSettings(settings))
        }
    }, [])

    if(!settings) return <DashboardMain title="Dashboard Settings"></DashboardMain>
    
    return (
        <DashboardMain title="Dashboard Settings">
            <SettingsContent settings={settings}/>
        </DashboardMain>
    )
}

Settings.getInitialProps = async (ctx) => {

    let cookie = getCookie('auth', ctx.req)
    let settings = []

    if(!cookie){
        ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
        ctx.res.end();
        return;
    } else {
        let isVerivy = checkisVerifyToken(cookie)

        if(!isVerivy){
            ctx.res.writeHead(302, {Location: '/AdminPanel/SignIn'});
            ctx.res.end();
            return; 
        }

        let URL = process.env.SERVER_URL
        const resData = await fetch(`${URL}/settings`,{
            headers: {
                'authorization': cookie,
                'isCrm': true
            },
        })

        if(resData.status === 200){
            settings = await resData.json()
        }
    }
        
    return {
        settings: settings.settings,
    }
}

export default Settings