const express = require('express')
const router = express.Router()
// 載入 model
const db = require('../models')
const Record = db.Record
const User = db.User

const { authenticated } = require('../config/auth')
const { check, validationResult } = require('express-validator')
const { formCheck, registerFormCheck } = require('../validatorRule')

// 新增一筆 Record 頁面
router.get('/new', authenticated, (_req, res) => {
  return res.render('new', { style: 'index.css' })
})

// 新增一筆Record
router.post('/', authenticated, formCheck, (req, res) => {
  const { name, category, date, amount, merchant } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    let errorMessages = []
    for (let i = 0; i < errors.array().length; i++) {
      errorMessages.push({ message: errors.array()[i]['msg'] })
    } res.render('new', {
      name,
      category,
      date,
      amount,
      merchant,
      errorMessages,
      style: 'index.css'
    })
  } else {
    Record.create({
      name,
      category,
      date,
      amount,
      merchant,
      UserId: req.user.id
    })
      // 存入資料庫
      .then((record) => { return res.redirect('/') })
      .catch((error) => { return res.status(422).json(error) })
  }

})

// 修改 Record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      return Record.findOne({
        where: {
          id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then((record) => {
      return res.render('edit', { record, style: 'index.css' })
    })
})

// 修改 Record
router.put('/:id', authenticated, formCheck, (req, res) => {
  const errors = validationResult(req)
  Record.findOne({
    where: {
      id: req.params.id,
      UserId: req.user.id,
    }
  })
    .then((record) => {
      Object.assign(record, req.body)
      if (!errors.isEmpty()) {
        let errorMessages = []
        for (let i = 0; i < errors.array().length; i++) {
          errorMessages.push({ message: errors.array()[i]['msg'] })
        } res.render('edit', {
          record,
          errorMessages,
          style: 'index.css'
        })
      } else {
        record.save()
          .then((record) => {
            return res.redirect('/')
          })
          .catch((err) => { return res.status(422).json(error) })
      }
    })
})

// 刪除 Record
router.delete('/:id/delete', (req, res) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.destroy({
        where: {
          UserId: req.user.id,
          id: req.params.id
        }
      })
    })
    .then((record) => { return res.redirect('/') })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router