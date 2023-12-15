import express from 'express';
const router = express.Router();

const users = [
    {name:'zain', age:12},
    {name:'haris', age:15}
];

const posts = [
    {title:'t1', des:'title1'},
    {title:'t2', des:'title2'}
];

router.get('/', (req,res) => {
    res.send(users);
});

router.get('/:name', (req,res) =>{
    const {name} = req.params;
    console.log(name);
    const specificuser = users.find((user) => user.name == name);
    if(specificuser) res.status(200).send(specificuser);
    else res.status(404).send("user not found");
    console.log(specificuser);
});

router.get('/', (req,res) => {
    res.send(posts);
})
export default router;