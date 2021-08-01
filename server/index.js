const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "sanju@123",
    database: "task",
});

app.post("/create", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?",[email]
,function(err, rows){
    if(err){
        db.end();
        return console.log(err);

    }
    if(!rows.length){
        db.query(
            "INSERT INTO users (firstname, lastname, email, password) VALUES (?,?,?,?)",
            [firstname, lastname, email, password],
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.send("values inserted");
                }
            }
        );
    }
    else{
        res.send({message:"User already exists"});
    }

});

  
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email =? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email or password combination!!" });
            }
        }
    );
});

app.get("/user", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  

app.listen(3001, () => {
    console.log("yay, your server is running on port 3001");
});
