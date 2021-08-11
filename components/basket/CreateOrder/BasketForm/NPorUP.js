import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import s from '../../../../styles/orderForm.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setPostInfo } from '../../../../redux/reducers/form-reducer';

const useStyles = makeStyles((theme) => ({
    textField: {
        width: '75%',
        '& input': {
            border: 0,
        },
        '& MuiFormHelperText-root': {
            [theme.breakpoints.down('sm')]: {
                fontSize: '0.35rem'
            },
        }
    },
}));

const NPorUP = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch()
    const form = useSelector(state => state.answerForm)

    const [postInfoPeople, setPostInfoPeople] = React.useState({
        post_FirstName: form.postInfo.post_FirstName,
        post_LastName: form.postInfo.post_LastName,
        post_Phone: form.postInfo.post_Phone,
        post_NumberPost: form.postInfo.post_NumberPost
    })

    const chengeHendler = (event) => {
        setPostInfoPeople({ ...postInfoPeople, [event.target.name]: event.target.value });
    };

    React.useEffect(() => {
        dispatch(setPostInfo(postInfoPeople))
    }, [postInfoPeople])

    return (
        <div className={s.NPorUPContainer}>
            <div className={s.NameLastName}>
                <TextField
                    label="Имя"
                    name="post_FirstName"
                    placeholder="Имя"
                    id="margin-dense"
                    className={s.textFieldName}
                    margin="dense"
                    onChange={chengeHendler}
                    value={postInfoPeople.post_FirstName}
                />
                <TextField
                    label="Фамилия"
                    name="post_LastName"
                    placeholder="Фамилия"
                    id="margin-dense"
                    className={s.textFieldName}
                    margin="dense"
                    onChange={chengeHendler}
                    value={postInfoPeople.post_LastName}
                />
            </div>
            <div className={s.dataContainer}>
                <TextField
                    id="standard-full-width"
                    label="Телефон"
                    name="post_Phone"
                    placeholder="+380()ххх-ххх-ххх"
                    fullWidth
                    margin="dense"
                    className={s.textField}
                    onChange={chengeHendler}
                    value={postInfoPeople.post_Phone}
                />
                <TextField
                    id="standard-full-width"
                    label="Город, Отделение"
                    name="post_NumberPost"
                    placeholder="Город, отделение почты"
                    fullWidth
                    margin="dense"
                    className={s.textField}
                    onChange={chengeHendler}
                    value={postInfoPeople.post_NumberPost}
                />
            </div>
        </div>
    )
}

export default NPorUP