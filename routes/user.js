const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const { check, validationResult } = require('express-validator')
const { formCheck, registerFormCheck } = require('../validatorRule')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login', { style: 'login.css' })
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register', { style: 'login.css' })
})

// 註冊檢查
router.post('/register', registerFormCheck, (req, res) => {
  const { name, email, password, password2 } = req.body
  const errors = validationResult(req)
  let errorMessages = []

  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      errorMessages.push({ message: '這個 Email 已經註冊過了' })
      res.render('register', {
        errorMessages,
        name,
        email,
        password,
        password2,
        style: 'login.css'
      })
    } else if (!errors.isEmpty()) {
      for (let i = 0; i < errors.array().length; i++) {
        errorMessages.push({ message: errors.array()[i]['msg'] })
      }
      res.render('register', { name, email, style: 'login.css', errorMessages })
    } else {
      const newUser = new User({
        name,
        email,
        password
      })
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash

          newUser
            .save()
            .then(user => {
              res.redirect('/')
            })
            .catch(err => console.log(err))
        })
      )
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

module.exports = router