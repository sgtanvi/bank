const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '#Password1234', //Change based on your machine
    database: 'bank'
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.get("/users", (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/users", (req, res) => {
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


app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM users;";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const { username, password } = req.body;
    const sqlInsert = "INSERT INTO users (username, password) VALUES (?,?);"
    db.query(sqlInsert, [username, password], (error, result) => {
        if (error) {
            console.log(error);
        };
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM users WHERE id = 17"
    db.query(sqlRemove, (error, result) => {
        if (error) {
            console.log(error);
        };
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM users WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
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

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body
    const sqlUpdate = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    db.query(sqlUpdate, [username, password, id], (error, result) => {
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
        else{
            console.log(req.body);
        }
    });

});

app.post("/api/transferadd", (req, res) => {
    const {recipientId, amount } = req.body;
    const sqlRecipient =
        "UPDATE users SET money = money + ? WHERE id = ?;";

    db.query(sqlRecipient, [amount, recipientId], (error, result) => {
        if (error) {
            console.log(error);
        }
        else{
            console.log(recipientId);
        }
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})