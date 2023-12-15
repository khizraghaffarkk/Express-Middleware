import mysql from 'mysql2';
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'app',
});

con.connect((err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("connected!!");
    }
});
export default con;