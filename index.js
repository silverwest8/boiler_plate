const express = require('express')
const app = express()
const port = 4000

//user가져오기
const { User } = require("./models/User");

//body-parser 설정
const bodyParser = require('body-parser');
//application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const config = require('./config/key');

//mongoDB connection
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! Hi world! oh...')
})

app.post('/register', (req, res) => {
  //회원가입시 필요한 정보를 client에서 가져오면 db에 넣어줌 --> 모르겠다,,, 다시 ,,, Postman?
  const user = new User(req.body) // user instance 생성, req.body 안에는  json 형식으로 id, password가 들어있음 (body parser로 한거임)
  
  user.save((err, userInfo) => { // save --> 몽고DB 메소드
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
