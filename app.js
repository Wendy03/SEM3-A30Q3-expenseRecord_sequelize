const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const port = 3000

const app = express()
// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// setting static files
app.use(express.static('public'))

// create equals help function
const handlebars = require("handlebars")
handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
})

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 method-override
app.use(methodOverride('_method'))

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.use(flash())

app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 載入 restaurant model
const Record = require('./models/record')

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.userName = req.user ? req.user.name + "的" || '家庭' : ''
  next()
})

// 載入路由器
app.use('/', require('./routes/home.js'))
app.use('/record', require('./routes/record.js'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))

app.listen(process.env.PORT || port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
