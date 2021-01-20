const express = require('express');
const app = express();
const port = 4000;
const auth = require('./middleware/auth');

//user가져오기
const { User } = require("./models/User");

//body-parser 설정
const bodyParser = require('body-parser');
//application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const config = require('./config/key');
//mongoDB connection, 헤로크??
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! Hi world! oh...')
})

//Router -> user, product, comment... 정리
app.post('/api/user/register', (req, res) => {
  //회원가입시 필요한 정보를 client에서 가져오면 db에 넣어줌
  const user = new User(req.body) // user instance 생성, req.body 안에는  json 형식으로 id, password가 들어있음 (body parser로 한거임)
  //save 전에 암호화 해야함, user model에서 pre!
  user.save((err, userInfo) => { // save --> 몽고DB 메소드
    if(err) return res.json({success: false, err})
    return res.status(200).json({success: true})
  })

})

//cookie-parser 설정
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post('/api/user/login', (req, res) => {
  //1. 요청된 이메일을 데이터베이스에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    else {//2. 요청된 이메일이 있으면 비밀번호 맞는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) {
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
        }
        else { //3. 다 맞으면 토큰 생성
          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            //token을 저장 - where? cookie, local starage, session ... 어디가 제일 안전한가? 여기서는 일단 cookie, 각기장단점
            res.cookie('x_auth', user.token)
            .status(200)
            .json({loginSuccess: true, userID: user._id })
          })
        }
      })
    }
  })
})


//auth -> 미들웨어
app.get('/api/user/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image
  })
})

app.get('./api/user/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id}), {token: "" }, (err, user) => {
    if(err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
