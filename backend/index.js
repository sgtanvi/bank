import express from "express"
import mysql from "mysql"

const app = express();
const  PORT = 3003;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"bank" 
})

app.use(express.json())

//localhost 3003 reads our message 
app.get("/", (req,res)=>{
  res.json("hello, this is the backend")  
})
//localhost 3003/users shows users from database 
app.get("/users", (req,res)=>{
    const q = "SELECT * FROM users"
    db.query(q, (err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
  })

app.post("/users", (req,res) => {
  const q = "INSERT INTO users (`username`, `password`, `balance`, `pin`) VALUES  (?)";
  const values = [
    req.body.username,
    req.body.password,
    req.body.balance,
    req.body.pin
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("");
  });
});


app.listen(PORT, ()=>{
    console.log("connected to backend!")
})