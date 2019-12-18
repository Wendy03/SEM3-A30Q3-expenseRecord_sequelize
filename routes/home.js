const express = require('express')
const Sequelize = require("sequelize")
const categoryList = require('../models/data/category.json').category
const router = express.Router()
// 載入 model
const db = require('../models')
const Record = db.Record
const User = db.User
const Op = Sequelize.Op
// 載入 auth middleware
const { authenticated } = require('../config/auth')

router.get('/', authenticated, (req, res) => {
  const filterMonth = req.query.filterMonth || ""
  const filterCategory = req.query.filterCategory || ""

  const categoryNameZh =
    categoryList[filterCategory] === undefined
      ? ""
      : categoryList[filterCategory]["name_zh"]


  let querySelect = { where: { UserId: req.user.id }, order: [['date', 'DESC']] };
  if (filterMonth === "" && filterCategory !== "") {
    querySelect = {
      where:
      {
        UserId: req.user.id,
        category: filterCategory
      }, order: [['date', 'DESC']]
    }
  } else if (filterCategory === "" && filterMonth !== "") {
    querySelect = {
      where: {
        UserId: req.user.id,
        date: {
          [Op.gte]: new Date(`2019-${filterMonth}-01`),
          [Op.lte]: new Date(`2019-${filterMonth}-31`)
        }
      }, order: [['date', 'DESC']]
    }
  } else if (filterCategory !== "" && filterMonth !== "") {
    querySelect = {
      where: {
        UserId: req.user.id,
        date: {
          [Op.gte]: new Date(`2019-${filterMonth}-01`),
          [Op.lte]: new Date(`2019-${filterMonth}-31`)
        },
        category: filterCategory
      }, order: [['date', 'DESC']]
    }
  }

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error("user not found")

      return Record.findAll(querySelect)
        .then((records) => {
          records.forEach(record => {
            record.icon = categoryList[record.category].image
          })
          let totalAmount = 0
          if (records.length > 0) {
            totalAmount = records.map(record => Number(record.amount)).reduce((a, b) => a + b)
          }
          const isDataEmpty = records.length === 0 ? true : false
          res.render("index", {
            style: 'index.css',
            records,
            totalAmount,
            filterCategory,
            filterMonth,
            categoryNameZh,
            isDataEmpty
          });
        })
        .catch((error) => { return res.status(422).json(error) })
    })
})
module.exports = router