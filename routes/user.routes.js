const express = require('express')
const userController = require('../controller/user.controller')
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({ passError: true })
const passport = require('passport')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const upload = multer({ dest: './images' }).single('image')


const router = express.Router();

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})

const detailSchema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().min(3).required(),
    age: Joi.number().required(),
    city: Joi.string().required()
})

router.post('/register', validator.body(schema), userController.postUser)

router.post('/login', async (req, res, next) => {
    passport.authenticate('local',
        async (err, user, info) => {
            try {
                if (err || !user) {
                    res.send({ error: err })
                    return next(err)
                }
                req.login(
                    user,
                    { session: false },
                    async (error) => {
                        if (error) return next(error);

                        const body = { id: user.id, email: user.email };
                        const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: 3600 * 24 })
                        return res.json({ token })
                    }
                )
            } catch (err) {
                return next(err)
            }
        })(req, res, next)
}, userController.postLogin)

router.get('/user/detail', passport.authenticate('jwt', { session: false }), userController.getUser)
router.get('/user/detail/id', passport.authenticate('jwt', { session: false }), userController.getUserById)

router.post('/user/detail', validator.body(detailSchema), passport.authenticate('jwt', { session: false }), userController.postDetail)

router.put('/user/detail/:id', passport.authenticate('jwt', { session: false }), userController.putUser)

router.delete('/user/detail/:id', passport.authenticate('jwt', { session: false }), userController.deleteUser)

router.post('/image', upload, userController.image)

module.exports = router