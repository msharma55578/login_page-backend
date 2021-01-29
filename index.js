var express = require("express");
var app = express();
var mysql = require("mysql");
let cors = require("cors");
app.use(cors());
let bodyParser = require("body-parser");
app.use(bodyParser());

// Connect create with Mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mohit555",
  database: "mydbase",
});

// database connected confirmation
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
  app.use(bodyParser.urlencoded({ extended: true }));

//Register record using post
app.post("/add", (req, res) => {
  let Name = req.body.name;
  let email = req.body.email;
  let color = req.body.color;
  let password = req.body.password;

  var sql = "INSERT INTO login (name,email,color,password) VALUES (?, ?, ?, ?)"; 

  con.query(sql, [Name, email, color, password], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send("inserted successfully");
  });
});

//login page
app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    
     let check='select * from login where email="'+email+'" && password ="'+password+'"';
    con.query(check, function (err, result) {
        if (err) throw err;

        if(result.length===0){
            console.log("check username or password");
            res.send(false);
        }else{
            res.send(true);
            console.log(result);
        }
        
        // res.send("hlw");
      });

  });

  app.put("/forget", (req, res) => {
    let email = req.body.email;
    let color = req.body.color;
    let password = req.body.password;

    let check='select * from login where email="'+email+'" && color ="'+color+'"';
    con.query(check, function (err, result) {
        if (err) throw err;

        if(result.length===0){
            console.log("check username or secuity question answer");
            res.send(false);
        }else{
            sql_update='update login set password="' +password +'" where email="'+email+'" ';
            con.query(sql_update, function (err1, res1){
                console.log(result);
                res.send(true);
            })
        }
      });
  });

app.get("/fetch", (req, res) => {
    con.query("select * from login", (err, rows, fields) => {
      if (!err) {
        console.log(rows);
        res.send(rows);
      } else console.log(err);
    });
  });

app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`);
});

