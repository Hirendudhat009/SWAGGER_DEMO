const localStratagy = require('passport-local').Strategy
const JWTstratagy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

const bcrypt = require('bcryptjs')
const User = require('./model/user.model');


module.exports = function (passport) {

    passport.use(new localStratagy({ usernameField: 'email' }, (email, password, done) => {

        User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    return done({ error_meesage: 'email is not exist' }, false)
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done({ error_meesage: 'invalid password' }, false)
                    }
                })
            })
            .catch(err => console.log(err))
    })
    );

    passport.use(new JWTstratagy({
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    },
        async (token, done) => {
            try {
                return done(null, token.user)
            }
            catch (error) {
                return done(error)
            }
        }
    ))

}