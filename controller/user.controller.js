const User = require('../model/user.model')
const UserDetail = require('../model/userDetail.model')
const path = require('path')
const bcrypt = require('bcryptjs');
const { createCipheriv } = require('crypto');

exports.postUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const data = await User.findOne({ where: { email: email } })
    if (data) {
        res.json({ error: 'E-mail is allready registered , try with different E-mail' })
    }
    const hassPass = await bcrypt.hash(password, 12)
    const user = await new User({
        email: email,
        password: hassPass
    })
    const result = await user.save();
    res.send(result)
}

exports.getUser = async (req, res, next) => {
    const user = await UserDetail.findAll()
    res.send(user)
}

exports.getUserById = async (req, res, next) => {
    const id = req.query.id;
    const user = await UserDetail.findByPk(id)
    if (!user) {
        res.send('user is not found')
    }
    res.json(user)
}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
        res.json({ error: 'E-mail is not Registered' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        res.json({ error: 'Wrong Password' })
    }
    res.json('Now! you are login')
}

exports.postDetail = async (req, res, next) => {
    const detail = await new UserDetail(req.body)
    const result = await detail.save()
    res.send('successful')
}

exports.putUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await UserDetail.findByPk(id)
    if (!user) {
        res.send('user is not registered')
    }
    user.firstname = req.body.firstname,
        user.lastname = req.body.lastname,
        user.age = req.body.age,
        user.city = req.body.city
    const result = await user.save();
    res.json(result)
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const user = await UserDetail.findByPk(id)
    if (!user) {
        res.send('user is not found')
    }
    await user.destroy();
    res.send('deleted succesfully')
}

exports.image = async (req, res, next) => {
    const file = req.file;
    const filename = file.path;
    res.send(filename)

}