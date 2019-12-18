const { check, validationResult } = require('express-validator')

const registerFormCheck = [
  check('email')
    .trim()
    .exists().withMessage("Email必填欄位")
    .isEmail().withMessage("請輸入正確的 Email 格式"),
  check('password')
    .exists().withMessage("Password必填欄位")
    .isLength({ min: 7, max: 14 }).withMessage("密碼長度 7~14"),
  check('password2')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('密碼兩次比對不符')
      }
      return true
    })

]

const formCheck = [
  check('name')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('名稱為必填'),
  check('date')
    .isISO8601().withMessage('日期格式不符')
    .isAfter('2018-12-31').withMessage('日期區間:2019.1.1 ~2019.12.31')
    .isBefore('2020-01-01').withMessage('日期區間:2019.1.1 ~2019.12.31'),
  check('category')
    .not().isEmpty().withMessage('請選分類'),
  check('amount')
    .trim()
    .isInt({ min: 1, max: 999999 })
    .withMessage('金額大於0'),
]
module.exports = { registerFormCheck, formCheck }

