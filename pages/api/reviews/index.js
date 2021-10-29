import { sql_query } from "../../../database_connection";
import { authenticated } from "../../../utility/middlware";
import { formateDataReviews } from "../../../utility/utils";

export default authenticated(async function getReviews(req, res) {
    switch (req.method) {
        case 'GET': {
            let reviews = await sql_query('select * from reviews').catch((err) => {
                return res.status(500).json({ message: `reviews.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let reviewsData = formateDataReviews(reviews)
            if(reviewsData && reviewsData.length > 0){
                return res.status(200).json(reviewsData);
            } else {
                return res.status(500).json({ message: `sorry but data not parse`, reviews: [] })
            }
          
        }
        case 'POST': {
            let INSERT = `INSERT INTO reviews (userName, reviewsText, reviewsCurrentUrl, isShowInMainPage, isGoogle) VALUES (?,?,?,?,?)`
           
            let addedNedData = await sql_query(INSERT, [req.body.userName, req.body.reviewsText, req.body.reviewsCurrentUrl, req.body.isShowInMainPage, req.body.isGoogle])
            .catch((err) => {
                res.status(500).json({ message: `reviews.js POST req, INSERT desc: Something was wrong! ${err}` })
            })

            let reviews = await sql_query('select * from reviews').catch((err) => {
                return res.status(500).json({ message: `reviews.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let reviewsData = formateDataReviews(reviews)
            if(reviewsData && reviewsData.length > 0){
                return res.status(200).json({ message: `success`, reviews: reviewsData });
            } else {
                return res.status(500).json({ message: `sorry but data not parse`, reviews: [] })
            }
        }
        case 'DELETE': {
            let DELETE = `DELETE FROM reviews WHERE id = ?`

            console.log(`ANSWER`, req.body);

            await sql_query(DELETE,[req.body.deleteId]).catch((err)=>{
                return res.status(500).json({ message: `reviews/[id]/index.js DELETE req, DELETE desc: Something was wrong! ${err}` })
            })

            let reviews = await sql_query('select * from reviews').catch((err) => {
                return res.status(500).json({ message: `reviews.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let reviewsData = formateDataReviews(reviews)
            if(reviewsData && reviewsData.length > 0){
                return res.status(200).json( {message: `delete saccess`, reviews: reviewsData});
            } else {
                return res.status(500).json({ message: `delete unsacces`, reviews: reviewsData })
            }
        } 
        case 'PUT':{
            console.log(`ANSWER server data`, req.body);

            // let UPDATE = 'UPDATE reviews SET userName = ?, reviewsText = ?, reviewsCurrentUrl = ?, isShowInMainPage = ?, isGoogle = ? WHERE id = ?'

            // let responseData = await sql_query(UPDATE,[req.body.userName, req.body.reviewsText, req.body.reviewsCurrentUrl, req.body.isShowInMainPage, req.body.isGoogle, req.body.id])
            // .catch((err)=>{
            //     return res.status(500).json({ message: `reviews/index.js PUT req, UPDATE desc: Something was wrong! ${err}` })
            // })

            let reviews = await sql_query('select * from reviews')
            .catch((err) => {
                return res.status(500).json({ message: `reviews.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let reviewsData = formateDataReviews(reviews)
            if(reviewsData && reviewsData.length > 0){
                return res.status(200).json( {message: `edit saccess`, reviews: reviewsData});
            } else {
                return res.status(500).json({ message: `edit unsacces`, reviews: reviewsData })
            }
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
})
