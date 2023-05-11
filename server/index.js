import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const  PORT = 3003;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"bank" 
})

//localhost 3003 reads our message from this page backend server
app.get("/", (req,res)=>{
  res.json("hello, this is the backend")  
})

//Another request - localhost 3003/users shows users from database 
app.get("/users", (req,res)=>{
    const q = "SELECT * FROM users"
    db.query(q, (err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
  })

//api -sending user desc.
app.post("/users", (req,res) => {
  const q = "INSERT INTO users (`username`, `password`, `pin`) VALUES  (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.pin
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("");
  });
}); 
/*
app.post("/login", (req,res) => {
  const q = "SELECT * FROM users WHERE `id` = ? AND `username` = ? AND `password` = ?";
  db.query(q, [req.body.username, req.body.password], (err, data) => {
    if (err) { 
      return res.json("Error"); 
    }
    if (data.length > 0) {
      return res.json("success");
    }else {
      return res.json("Fail");

    }
  });
});
*/
app.listen(PORT, ()=>{
    console.log("connected to backend!")
})