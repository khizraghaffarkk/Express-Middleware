import express from 'express';
// const cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// import getRoute from './routes/get.js';
// import getSpecificUser from './routes/get.js';
// import {getPost} from './routes/get.js';

import db from './database.js';
import {check, validationResult} from 'express-validator';

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());

app.use((req,res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

const PORT = 3000;
const users = [
    {name:'zain', age:12},
    {name:'haris', age:15}
];

const posts = [
    {title:'t1', des:'title1'},
    {title:'t2', des:'title2'}
];

app.get('/', (req,res) => {
    res.send({
        msg:"Hellmsg",
        use:"sh"
    }
    );
});

//    app.use('/users', getRoute);
//    app.use('/users', getSpecificUser);

//    app.use('/posts', getPost);

app.get('/users', (req,res) => {
    res.send(users);
});

app.get('/users/:name', (req,res) =>{
    const {name} = req.params;
    console.log(name);
    const specificuser = users.find((user) => user.name == name);
    if(specificuser) res.status(200).send(specificuser);
    else res.status(404).send("user not found");
    console.log(specificuser);
});

const userdata = [];
app.get('/userdata', (req,res) => {
    res.send(userdata);
    // res.status(200).send({msg:'viewed userdata array'});
});

app.get('/u', async (req,res) => {
    const getUserData = await db.promise().query(`select * from Users`);
    console.log("getUserData Array");
    console.log(getUserData[0]);
    if(getUserData){
        console.log("data views from db");
        res.status(200).send(getUserData[0]);
    }
    else{
        console.log("err in view query");
        }
});

app.post('/userdata', [
    check('username').notEmpty().withMessage('name cannot empty')
                     .isLength({min:5}).withMessage('should more than 5 characters'),
    check('password').notEmpty().withMessage('pass cannot empty')
                     .isLength({max:3}).withMessage('should max 3 characters'),
], (req,res) => {
    const {username, password} = req.body;
    const errorsFound = validationResult(req);
    console.log(errorsFound);
    if(!errorsFound.isEmpty()){
        return res.status(400).json({errors: errorsFound.array() });
    }

    if(username && password){
        console.log(username,password);
        try{
            console.log('inside try');
            db.query(`insert into Users values('${username}',${password})`);
            res.status(200).send({msg:'create user'});
        }
        catch (err){
            console.log('err');
        }
    }
});

// app.get('/posts', (req,res) => {
//     res.send(posts);
// })

//req.query
// app.get('/posts', (req,res) => {

//     console.log("req.query--");
//     console.log(req.query);
    
//     const {title} = req.query;
//     console.log("titi--");
//     console.log(title);
//     if(title){
//         const specificpost = posts.find((post) => post.title == title);
//         if(specificpost) res.status(200).send(specificpost);
//         else res.status(404).send("post not found");
//         console.log(specificpost);
//     }
    
// });

// //Middleware function
// function validateAuth(req,res, next){
//     const {authorization} = req.headers;
//     if(authorization && authorization==='11') {
//         next();
//     }
//     else{
//         res.status(403).send("not correct authorization");
//     }
// }

// app.post('/posts', validateAuth, (req,res) => {
//        const bodydata = req.body; 
//        posts.push(bodydata);
//        res.status(201).send("sent");
// });

// function validateSession(req,res, next){
//     const {cookies} = req;
//     if('s-id' in cookies){
//         console.log("session is in cookie");
//         if(cookies.s_id === '1112') next();
//         else res.status(403).send("s-id is not 1112");
//     }
//     else res.status(403).send("session is not in cookie");
// }
// //cookie generation
// app.get('/signin', (req,res) => {
//     res.cookie('s_id','1112');
//     res.status(200).json({msg:'you are loged in'});
// });

// app.get('/protected', validateSession, (req,res) => {
//     res.status(200).json({msg:"you have right"});
// });


app.listen(PORT, () => console.log(`server is ruunung on: ${PORT}`));
console.log("helllo");