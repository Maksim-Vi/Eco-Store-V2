import React from 'react';
import HeaderMain from '../components/header/headerMain';

const AboutUs = () =>{
    return (
        <HeaderMain title="Eco Choice About us">
             <div className='containerAboutUs'>
                    <div className='About'><h2>О нас</h2></div>
                    <p>
                        <strong>Eco Choice</strong> – это небольшой семейный 
                        интернет-магазин. Мы предлагаем широкий ассортимент натуральных и экологически 
                        чистых товаров. 
                        Вести здоровый образ жизни – это не мода и не роскошь. Это философия, это стиль, это необходимость.
                    </p>
                    <p><br/></p>
                    <p>
                    <strong>Быть ответственным потребителем</strong> – это не только покупать товары с маркировкой «эко», но ещё и дарить 
                        натуральные подарки. Если друг или родственник бережно относится к природе, то им стоит преподнести 
                        эко-подарки,  и следует помнить, что они должны быть полезными и практичными. А в нашем интернет 
                        магазине Вы можете найти именно такие подарки. 
                    </p>
                    <p><br/></p>
                    <p><strong>Наша цель:</strong></p>
                    <p>
                        С ростом выбросов углекислого газа, повышением температуры и повсеместными погодными 
                        катаклизмами может показаться, что экзистенциальную угрозу глобального изменения 
                        климата невозможно остановить. 
                        В мире много пластика. Слишком много! Ученые пытаются найти решения в виде 
                        крупномасштабных операций по очистке океана с помощью, но 9.1 миллиарда тонн
                        пластмассы, которые создало человечество, не существовало бы в природе, если 
                        бы мы не использовали и не выбрасывали так много этого материала.
                        Есть масса советов по сокращению пластиковых отходов, но самые важные советы просты:
                        просто замените пластиковые предметы многоразовыми или более легко биоразлагаемыми 
                        вариантами.
                    </p>
                    <p><strong><br/></strong></p>
                </div>
                <style jsx>{`
                .containerAboutUs{
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    font-family: 'Work Sans', sans-serif;
                    margin-top: 2%;
                    margin-bottom: 5%;
                    font-size: 20px;
                }
                
                .containerAboutUs strong {
                    font-size: 20px;
                }
                
                .About h2 {
                    font-family: 'Work Sans', sans-serif;
                    margin-bottom: 3%;
                    font-size: 35px;
                    font-weight: 900;
                    color: rgb(53, 53, 53);
                }
                @media (max-width:610px) {   
                    .containerAboutUs {
                       font-family: 'Work Sans', sans-serif;
                       padding: 15px;
                       font-size: 22px;
                    }
                }
                `}</style>
        </HeaderMain>
    )
}

export default AboutUs