const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'images') {
                cb(null, './uploadsImages')
            } else if (file.fieldname === 'imagesDesc') {
                cb(null, './uploadsDescImages')
            }
        },
        filename: function (req, file, cb) {
            cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        }
    }),
    limits: {
        fileSize: 1025 * 1025 * 6
    },
});

module.exports = {upload};