const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const multer = require('multer')
const path = require('path')
const config = require('config')

const passportConfig = require('./passport-config')(passport)
const sequelize = require('./utils/database');
const userRoute = require('./routes/user.routes')
const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

app.use('/testing', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, 'images' + '-' + file.originalname)
    }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer({ storage: fileStorage })).single('image')
// app.use('/images', express.static(path.join(__dirname, 'images')))

app.use(userRoute)

// User.belongsTo(UserDetail)



app.use((err, req, res, next) => {
    res.send({ error: err.error.message })
})

sequelize.sync()
    .then(() => {
        app.listen(3000)
    })

