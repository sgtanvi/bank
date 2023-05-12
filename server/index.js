const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');



////////////////////////////////////////Tanvi
const fileUpload = require('express-fileupload');
const fs = require('fs');
app.use(fileUpload());
//////////////////////////////////////

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

////////////////////////////////////Tanvi

app.post("/api/deposit", (req, res) => {
    const { userId, amount } = req.body;
    const imageFile = req.files.image;
  
    // Check if required data is provided
    if (!userId || !amount || !imageFile) {
      return res.status(400).send("Please provide all the required data");
    }
  
    // Check if amount is a number greater than 0
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send("Please provide a valid amount");
    }
  
    // Save the image file to the server
    const fs = require('fs');
    const fileName = `${userId}_${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;
    const filePath = `D:/Jaime's Files/VS Code Projects/Bank application/images/${fileName}`;
  
    imageFile.mv(filePath, function(err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Failed to upload image");
      }
  
      console.log("Image uploaded successfully");
  
      // Save the deposit transaction to the database
      const sqlSender = "UPDATE users SET money = money + ? WHERE id = ?;";
      db.query(sqlSender, [amount, userId], (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send("Failed to save deposit transaction");
        }
  
        console.log(result);
        return res.status(200).send("Deposit successful");
      });
    });
  });
///////////////////////////////////////  








/////////////////////////////////JAIME 
/*

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

});*/

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})