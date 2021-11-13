import React, { useState, useEffect, useContext } from 'react';
import { CardHeader, Container } from '@material-ui/core';
import SettingsAdvertisingSlider from '../settings/SettingsAdvertisingSlider';
import SettingsNotifications from '../settings/SettingsNotifications';
import DashboardAddButton from '../utilits/DashboardAddButton';
import axios from 'axios';
import { getCookie } from '../../components/common/session';
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import { setSettings } from '../../redux/reducers/SRM/settings/action';
import { AuchContext } from '../../components/common/Context/context.hook';
import { useRouter } from 'next/router';

const Settings = ({ settings }) => {
 
  let router = useRouter()
  const auch = useContext(AuchContext)
  const dispatch = useDispatch()

  let [settings_data, setSettings_data] = useState({
    isShowNavSlider: settings.isShowNavSlider ? settings.isShowNavSlider : false,
    isShowTopSlider: settings.isShowTopSlider ? settings.isShowTopSlider : false,
    isShowTopGrid: settings.isShowTopGrid ? settings.isShowTopGrid : false,
    isShowReviews: settings.isShowReviews ? settings.isShowReviews : false,
    isShowContactUs: settings.isShowContactUs ? settings.isShowContactUs : false,
    isShowAdvertisingSlider: settings.isShowAdvertisingSlider ? settings.isShowAdvertisingSlider : false,
  })
  const { addToast, removeAllToasts } = useToasts()

  let message = (mes) => {
    removeAllToasts()
    addToast(mes, { appearance: 'success', autoDismiss: true })
  }

  let error = (mes) => {
    removeAllToasts()
    addToast(mes, { appearance: 'error', autoDismiss: true })
  }

  let ChangeStateSettings = (event) => {
    setSettings_data({ ...settings_data, [event.target.name]: event.target.checked })
  }

  let UpdateData = async () => {
    let res = await axios.put(`${process.env.SERVER_URL}/settings`, settings_data, {
      headers: {
        'authorization': getCookie('auth'),
      }
    }).catch((err) => {
      console.log(`update settings ERROR Settings`, err);
      error('Crit Error, Settings При обновлении настроек что то пошло не так!')
      return
    })

    if (res && res.status === 200) {
      if(res.data && res.data.isAuch === false){
        error('Ошибка авторизации, истекла сессия токена')
        dispatch(setSettings([]))
        return auch.logout(router)
    }
      message('Редактирование настроек прошло успешно! =)')
      dispatch(setSettings(res.data.settings))
      pushDataLocal(res.data.settings)
    } else {
      error('Ошибка pедактирования настроек! =(')
    }
  }

  let pushDataLocal = (settings) =>{
    setSettings_data({
      isShowNavSlider: settings.isShowNavSlider ? settings.isShowNavSlider : false,
      isShowTopSlider: settings.isShowTopSlider ? settings.isShowTopSlider : false,
      isShowTopGrid: settings.isShowTopGrid ? settings.isShowTopGrid : false,
      isShowReviews: settings.isShowReviews ? settings.isShowReviews : false,
      isShowContactUs: settings.isShowContactUs ? settings.isShowContactUs : false,
      isShowAdvertisingSlider: settings.isShowAdvertisingSlider ? settings.isShowAdvertisingSlider : false,
    })
  }

  useEffect(() => {
    pushDataLocal(settings)
  }, [settings])

  return (
    <Container maxWidth="lg">
      <CardHeader subheader="На этой вкладке можно применять разные настройки для CRM" title="Настройки" />
      <DashboardAddButton open={() => { UpdateData() }} text={'сохранить'} />
      <SettingsNotifications ChangeStateSettings={ChangeStateSettings} settings={settings_data} />
      <SettingsAdvertisingSlider ChangeStateSettings={ChangeStateSettings} settings={settings_data} />
    </Container>
  )
};

export default Settings;
