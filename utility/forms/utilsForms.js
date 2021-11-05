import * as Yup from 'yup';

const phoneRegExp = /^[\+]?\d{2,}?[-\s\.]?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im

export const validationSchema = Yup.object().shape({
    post_FirstName: Yup.string()
        .required('Поле не заполнено')
        .min(3, 'Имя не должно быть меньше 3 символов')
        .max(20, 'Имя не должно быть больше 20 символов'),
    post_LastName: Yup.string()
        .required('Поле не заполнено')
        .min(3, 'Имя не должно быть меньше 3 символов')
        .max(20, 'Имя не должно быть больше 20 символов'),
    post_Phone: Yup.string()
        .required('Поле не заполнено')
        .matches(phoneRegExp, "Телефон введен не правильно, проверьте свои данные!"),
    post_NumberPost: Yup.string()
    .required('Поле не заполнено')
    .min(1, 'Имя не должно быть меньше 3 символов')
    .max(100, 'Имя не должно быть больше 20 символов'),
});

export const validationSchemaBasket = Yup.object().shape({
    username: Yup.string()
        .required('Поле не заполнено')
        .min(3, 'Имя не должно быть меньше 3 символов')
        .max(20, 'Имя не должно быть больше 20 символов'),
    email: Yup.string().email('не верный email '),
    phone: Yup.string()
        .required('Поле не заполнено')
        .matches(phoneRegExp, "Телефон введен не правильно, проверьте свои данные!")
});

export const currencies = [
    {
        value: 'Оплата на карту',
        label: 'Оплата на карту',
    },
    {
        value: 'Наложенный платёж',
        label: 'Наложенный платёж',
    },
    {
        value: 'Оплата наличными',
        label: 'Оплата наличными',
    },
];

export const deliverys = [
    {
        value: 'Новой почтой',
        label: 'Новой почтой',
    },
    {
        value: 'Укр почтой',
        label: 'Укр почтой',
    },
    {
        value: 'Самовывоз',
        label: 'Самовывоз',
    }
];