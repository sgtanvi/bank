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

app.post("/api/users", (req, res) => {
    const q = "INSERT INTO users (username, password, pin) VALUES  (?)";
    const values = [
        req.body.username,
        req.body.password,
        req.body.pin
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("");
    });

    console.log(res)
});

app.post("/regusercheck", (req, res) => {
    const username = req.body.Username;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, result) => {
            if (err) {
                return res.send({ err: err });
            }

            if (result && result.length > 0) {
                return res.send({ message: "Username already in use" });
            }
        }
    );
});

app.post("/regpasscheck", (req, res) => {
    const password = req.body.Password;

    db.query(
        "SELECT * FROM users WHERE password = ?",
        [password],
        (err, result) => {
            if (err) {
                return res.send({ err: err });
            }

            if (result && result.length > 0) {
                return res.send({ message: "Password already in use" });
            }
        }
    );
});

app.post("/regpincheck", (req, res) => {
    const pin = req.body.PIN;

    db.query(
        "SELECT * FROM users WHERE pin = ?",
        [pin],
        (err, result) => {
            if (err) {
                return res.send({ err: err });
            }

            if (result && result.length > 0) {
                return res.send({ message: "PIN already in use" });
            }
        }
    );
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                return res.send({ err: err });
            }

            if (result && result.length > 0) {
                return res.send(result);
            } else {
                return res.send({ message: "Invalid User Login" });
            }
        }
    );
});

app.post("/ATMlogin", (req, res) => {
    const username = req.body.username;
    const PIN = req.body.PIN;

    db.query(
        "SELECT * FROM users WHERE username = ? AND pin = ?",
        [username, PIN],
        (err, result) => {
            if (err) {
                return res.send({ err: err });
            }

            if (result && result.length > 0) {
                return res.send(result);
            } else {
                return res.send({ message: "Invalid Credentials" });
            }
        }
    );
});

app.delete("/users/:id", function (req, res) {
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id = ?";

    db.query(q, [userId], function (err, data) {
        if (err) return res.json(err);
        return res.json("Deleted");
    });
});

    }
  });
});

app.get("/api/getuser/:username", (req, res) => {
    const { username } = req.params;
    const sqlGet = "SELECT * FROM users WHERE username = ?";
    db.query(sqlGet, username, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.post("/api/transferpull", (req, res) => {
    const { senderId, amount } = req.body;
    const sqlSender =
        "UPDATE users SET money = money - ? WHERE id = ?;";

    db.query(sqlSender, [amount, senderId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(req.body);
        }
    });

});

app.post("/api/transferadd", (req, res) => {
    const { recipientId, amount } = req.body;
    const sqlRecipient =
        "UPDATE users SET money = money + ? WHERE id = ?;";

    db.query(sqlRecipient, [amount, recipientId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(recipientId);
        }
    });
});

app.post("/api/requestpull", (req, res) => {
    const { requestedId, amount } = req.body;
    const sqlSender =
        "UPDATE users SET money = money - ? WHERE id = ?;";

    db.query(sqlSender, [amount, requestedId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(req.body);
        }
    });

});

app.post("/api/requestadd", (req, res) => {
    const { requesterId, amount } = req.body;
    const sqlRecipient =
        "UPDATE users SET money = money + ? WHERE id = ?;";

    db.query(sqlRecipient, [amount, requesterId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(`Test: ${requesterId}`);
        }
    });
});

app.post("/api/withdraw", (req, res) => {
    const { userId, amount } = req.body;
    const sqlSender =
        "UPDATE users SET money = money - ? WHERE id = ?;";

    db.query(sqlSender, [amount, userId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(req.body);
        }
    });

});

app.post("/api/deposit", (req, res) => {
    const { userId, amount } = req.body;
    const sqlSender =
        "UPDATE users SET money = money + ? WHERE id = ?;";

    db.query(sqlSender, [amount, userId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(req.body);
        }
    });

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})