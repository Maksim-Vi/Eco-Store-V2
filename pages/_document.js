import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="index,follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="google-site-verification" content="RKFrWYA7NH4zvhXCwvCDZ-mbaJN33-qcPDBIuz2IEqU" />
          
          <meta name='application-name' content='Eco Choice' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Eco Choice' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />
		  <meta name="yandex-verification" content="370fec720861e80e" />

          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          
          {process.env.NODE_ENV === 'production' && <script data-ad-client="ca-pub-6421975370931679" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>}
          {process.env.NODE_ENV === 'production' && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />}
          {process.env.NODE_ENV === 'production' && <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                });
            `,
            }}
          />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// MyDocument.getInitialProps = async (ctx) => {

//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => (<App {...props} />)
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,

//   };
// };

MyDocument.getInitialProps = async (ctx) => {

  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

export default MyDocument

