import React, { useCallback } from 'react';
import { Router, useRouter } from 'next/router'
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import AppAnimate from '../components/common/Animate/Amination'
import { useAuch } from '../components/common/Context/auth.hook';
import { AuchContext, AuchContextItem } from '../components/common/Context/context.hook';
import { useItemstoDescPopular } from '../components/common/Context/items.hook';
import { useStore } from '../redux/redux-store';
import { persistStore } from 'redux-persist'
import * as gtag from '../lib/gtag'
import CssBaseline from '@material-ui/core/CssBaseline';

function MyApp({ Component, pageProps }) {
  
  const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), []);
  const store = useStore(pageProps.initialReduxState);
  
  const { itemsProduct, itemsProductPatchId, id, itemPopular, itemsStore } = useItemstoDescPopular()
  const { login, logout, token, userID } = useAuch()
  const isAuthorization = !!token

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    Router.events.on("routeChangeComplete", resetWindowScrollPosition);

    return () => {
      Router.events.off("routeChangeComplete", resetWindowScrollPosition);
    };
  }, []);

  const router = useRouter()
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      process.env.NODE_ENV === 'production' && gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AppAnimate>
      <AuchContext.Provider value={{ token, userID, login, logout, isAuthorization }}>
        <AuchContextItem.Provider value={{ itemsProduct, itemsProductPatchId, id, itemPopular, itemsStore }}>
          <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-right">
            <Provider store={store}>
              <CssBaseline />
              <Component {...pageProps} /> 
            </Provider>
          </ToastProvider>
        </AuchContextItem.Provider>
      </AuchContext.Provider>
    </AppAnimate>
  )
  
}

export default MyApp
