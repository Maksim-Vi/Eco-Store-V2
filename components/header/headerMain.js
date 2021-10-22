import React from 'react';
import Head from "next/head";
import { useRouter } from 'next/router'
import Header from './header';
import Nav from './nav/nav';
import Footer from '../footer/footer';
import HeaderSlider from './headerSlider';

const HeaderMain = ({children, title='', descTitle='', desc=''}) =>{
    const router = useRouter()

    let titleHome= title !== '' ? `Eco Choice - интернет магазин ${title}` : 'Eco Choice - интернет магазин натуральных эко подарков и товаров для дома Киев.'
    let descriptionTitle = descTitle !== '' ? descTitle :  'интернет магазин эко товаров киев.'
    let description = desc !== '' ? desc : 'Eco Choice – это небольшой семейный интернет-магазин. Мы предлагаем широкий ассортимент натуральных и экологически чистых товаров.Вести здоровый образ жизни – это не мода и не роскошь. Это философия, это стиль, это необходимость.'

    return(
    <React.Fragment>
        <Head>
            <title>{titleHome}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content="Eco,EcoChoice,ecochioce,eco choice,эко,экотовары,эковыбор,эко-товары, эко выбор, эко боксы, эко бокс. эко подарки, эко подарок, эко подарок, эко подарок киев, подарки киев." />
            <meta name="keywords" content={descriptionTitle} />
            <meta name="description" content={description}/>            
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&family=Open+Sans:wght@300;600&family=Recursive:wght@300;500&family=Work+Sans:wght@300;400&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" />
        </Head>
        <Header />
        <nav><Nav /></nav>
        {router.pathname === '/' ? <HeaderSlider /> : null}
        
        <main>
            {children}
            <Footer />
        </main>
        <style jsx global>{`
            *{
                margin:0;
                padding:0;
                box-sizing: border-box;
                font-family: 'Work Sans', sans-serif;
            },
            *, *:before, *:after {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            },
            input { 
                outline: none;
            }
            table {
                 border-collapse: collapse; 
                 border-spacing: 0; 
            },
            img { 
                border: 0; 
                max-width: 100%; 
            },
            a { 
                text-decoration: none; 
            }
            nav{
                display: flex;
                
            }
        `}</style>
    </React.Fragment>)
}

export default HeaderMain