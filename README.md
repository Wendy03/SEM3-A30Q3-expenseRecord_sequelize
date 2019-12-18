# 記帳本

#### 使用者登入帳號可以記錄每日的支出，可以新增、修改、刪除資料，可以月份、類別查詢資料

## Installing

#### 環境

1.  node.js v-10.15.0

2.  專案套件
    > - bcryptjs: "^2.4.3",
    > - body-parser: "^1.19.0",
    > - connect-flash: "^0.1.1",
    > - dotenv: "^8.2.0",
    > - express: "^4.17.1",
    > - express-handlebars: "^3.1.0",
    > - express-session: "^1.17.0",
    > - express-validator: "^6.3.0",
    > - method-override: "^3.0.0",
    > - moment: "^2.24.0",
    > - mysql2: "^2.0.2",
    > - passport: "^0.4.1",
    > - passport-facebook: "^3.0.0",
    > - passport-local: "^1.0.0",
    > - sequelize: "^5.21.2",
    > - sequelize-cli: "^5.5.1"

#### 確認本機是否安裝 [MySql](https://dev.mysql.com/downloads/windows/installer/)

#### 開啟終端機到存放專案本機位置並執行:

> git clone https://github.com/Wendy03/SEM3-A30Q3-expenseRecord_sequelize.git

##### 專案套件安裝

```

1.使用終端機切換目錄到專案: SEM3-A30Q3-expenseRecord_sequelize
2.使用終端機安裝套件: npm install

```

#### 專案的「根目錄」修改 .env 這個檔案

> #### [Facebook developers](https://developers.facebook.com/) 創建應用程式取得 client ID ' client secret

```
FACEBOOK_ID= //your Client ID
FACEBOOK_SECRET= //your Client secret
FACEBOOK_CALLBACK= http://localhost:3000/auth/facebook/callback
```

#### 修改 /config/config.json

```
- 修改 development mode 的設定，加入資料庫的名字與密碼,刪除operatorsAliases

"development": {
  "username": "root",
  "password": "password",
  "database": "record_sequelize",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
}
```

#### 資料庫設定

##### 請在 MySQL Workbench 輸入下方指令

- 建立 record_sequelize 資料庫

```
drop database if exists record_sequelize;
create database record_sequelize;
use record_sequelize;
```

##### 建立 Users 和 Record Table

- npx sequelize db:migrate

#### 執行程式

```

1. 終端機輸入: nodemon run dev
2. 開啟網頁輸入: http://localhost:3000/users/login

```

## 主要功能

##### 1. 使用者填寫名子、Email、Password 註冊帳號

##### 2. 使用者註冊成功後以 Email、Password 登入記帳本

##### 3. 使用者在首頁一次瀏覽所有支出的清單

##### 4. 使用者在首頁看到所有支出清單的總金額

##### 5. 使用者新增一筆支出

##### 6. 使用者編輯支出的所有屬性

##### 7. 使用者刪除任何一筆支出

##### 8.使用者在首頁可以根據支出「月份」、「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 截圖

###### 1.登入

![image](https://github.com/Wendy03/SEM3-A30Q3-expenseRecord_sequelize/blob/master/public/img/loginpage.PNG)

###### 2.註冊

![image](https://github.com/Wendy03/SEM3-A30Q3-expenseRecord_sequelize/blob/master/public/img/signuppage.PNG)

###### 3.個人頁面

![image](https://github.com/Wendy03/SEM3-A30Q3-expenseRecord_sequelize/blob/master/public/img/userpage.PNG)
