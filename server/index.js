const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const usermodul = require('./modules/usermodule');
const postmodule = require('./modules/postmodule');
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(cookieParser());
mongoose.connect('mongodb://127.0.0.1:27017/bloge');

app.use('/images', express.static(path.join(__dirname, 'publicee/images')));
app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json("sucess")
})

const verifyuser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json("the token is missing")
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("the token is wronge")
            }
            else {
                req.email = decoded.email
                req.username = decoded.username;
                next()
            }
        })
    }
}

app.get('/home', verifyuser, (req, res) => {
    return res.json({ email: req.email, username: req.username })
})
app.post('/reg', (req, res) => {
    const { username, email, password } = req.body
    bcrypt.hash(password, 10)
        .then(hash => {
            usermodul.create({ username, email, password: hash })
                .then(user => res.json(user))
                
                .catch(error => res.json(error))
        })
})
app.post('/login', (req, res) => {
    const { email, password } = req.body
    usermodul.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, username: user.username }, "jwt-secret-key", { expiresIn: '1d' })
                        res.cookie('token', token)
                        return res.json("sucess")
                    }
                    else {
                        return res.json("pass is in correct")
                    }
                })
            }
            else {
                res.json("email or pass wrong ")
            }
        })
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'publicee/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/create', verifyuser, upload.single('file'), (req, res) => {
    const { title } = req.body;
    const file = req.file.filename; 
const email=req.body.email
    postmodule.create({ title, file ,email})
        .then(result => res.json('success'))
        .catch(err => res.json(err));
});
app.get('/getpost',(req,res)=>{
    postmodule.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.get('/getpostbyid/:id/',(req,res)=>{
    const id=req.params.id
    postmodule.findById(id)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.put('/editpost/:id/',(req,res)=>{
    const id=req.params.id
    postmodule.findByIdAndUpdate(
        (id),
        {title:req.body.title}
    ).then(result=>res.json('sucess'))
    .catch(err=>res.json(err))
})
app.delete('/getdltbyid/:id',(req,res)=>{
         postmodule.findByIdAndDelete(req.params.id)
         .then(result=>res.json('sucess'))
         .catch(err=>res.json(err))
})
const port = 5000
app.listen(port, () => {
    console.log(`server is running ${port}`);
})
     