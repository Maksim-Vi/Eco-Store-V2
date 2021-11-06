import { sql_query } from "../../database_connection";
import { authenticated } from "../../utility/middlware";
import NextCors from 'nextjs-cors';
import _ from "lodash";

export default authenticated(async function getSettings(req, res) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'GET': {
            const data = await sql_query('select * from settings').catch((err) => {
                res.status(500).json({ message: `settings.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let settingsData = {}
            _.forEach(data[0], (value, key) => { settingsData = { ...settingsData, [key]: value === 1 ? true : false } })

            return res.status(200).json({ message: 'success get settings data', settings: settingsData });
        }
        case 'PUT': {
            await sql_query('TRUNCATE TABLE settings').catch((err) => {
                res.status(500).json({ message: `popular.js DELETE req, DELETE desc: Something was wrong! ${err}` })
            })
           
            let INSERT = `INSERT INTO settings (isShowNavSlider, isShowTopSlider, isShowTopGrid, isShowReviews, isShowContactUs, isShowAdvertisingSlider) VALUES (?,?,?,?,?,?)`
            let response = await sql_query(INSERT, [
                    req.body.isShowNavSlider === true ? 1 : 0,
                    req.body.isShowTopSlider === true ? 1 : 0, 
                    req.body.isShowTopGrid === true ? 1 : 0,
                    req.body.isShowReviews === true ? 1 : 0,
                    req.body.isShowContactUs === true ? 1 : 0,
                    req.body.isShowAdvertisingSlider === true ? 1 : 0
            ]).catch((err) => {
                res.status(500).json({ message: `settings.js POST req, INSERT desc: Something was wrong! ${err}` })
            })

            const data = await sql_query('select * from settings').catch((err) => {
                res.status(500).json({ message: `settings.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let settingsData = {}
            _.forEach(data[0],(value,key)=>{settingsData = {...settingsData,[key]: value === 1 ? true : false}})
          
            return res.status(200).json({ messages: 'success add settings', settings: settingsData });
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
})