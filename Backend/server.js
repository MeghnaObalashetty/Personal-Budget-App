const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const compression = require('compression');

const port = 3001;
const app = express();
app.use(cors({
  origin: ["https://meghna-budget.netlify.app"],
  methods: ["POST", "GET", "PUT","DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
//used  gzip compression making requests to  server.
app.use(compression());
// Your database configuration
const db = mysql.createConnection({
  host: "bj8fas3v1wda6rammvul-mysql.services.clever-cloud.com",
  user: "ub4lnsnxjoaufuys",
  password: "424eb0SKblqMHuJvg5UI",
  database: "bj8fas3v1wda6rammvul",
});

db.connect();


// Login endpoint with JWT token generation
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * from users_details where email = ? and password = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      const token = jwt.sign({ email }, "secretKey", { expiresIn: '1m' });//1 min token exipry
      const tokenExpiration = Date.now() + 60 * 1000; // Token expiration time (1 hour)

      return res.json({
        Login: true,
        token,
        tokenExpiration,
        username: data[0].name,
        id: data[0].id,
        password: data[0].password,
      });
    } else {
      return res.json({ Login: false });
    }
  });
});

// Signup endpoint 
app.post("/signup", async (req, res) => {
  const sql =
    "INSERT INTO users_details(`id`, `name`, `email`, `password`) VALUES(?)";
  const values = [
    req.body.id,
    req.body.fullname,
    req.body.email,
    req.body.password,
  ];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    return res.json(data);
  });
});

//add budget for a month, if duplicate just update
app.post("/budgetList", (req, res) => {
  const { id, category, totalBudget, expense, month } = req.body;
  const upperCaseCategory = category.toUpperCase();
  const checkExistingSql =
    "SELECT * FROM budget_details WHERE user_id = ? AND UPPER(category) = UPPER(?) AND  month = ?";
  const checkExistingValues = [id, category, month];

  db.query(checkExistingSql, checkExistingValues, (err, existingData) => {
    if (err) {
      console.error(err);
      return res.json(err);
    }

    if (existingData && existingData.length > 0) {
      // If a record exists for the same user, category, and month, update it
      const updateSql =
        "UPDATE budget_details SET totalBudget = ?, expense = ? WHERE user_id = ? AND UPPER(category) = UPPER(?) AND month = ?";
      const updateValues = [totalBudget, expense, id, category, month];

      db.query(updateSql, updateValues, (updateErr, updateData) => {
        if (updateErr) {
          console.error(updateErr);
          return res.json(updateErr);
        }
        return res.json(updateData);
      });
    } else {
      // If no record exists, perform an insert
      const insertSql =
        "INSERT INTO budget_details(`user_id`, `category`, `totalBudget`, `expense`, `month`) VALUES (?, ?, ?, ?, ?)";
      const insertValues = [id, upperCaseCategory, totalBudget, expense, month];

      db.query(insertSql, insertValues, (insertErr, insertData) => {
        if (insertErr) {
          console.error(insertErr);
          return res.json(insertErr);
        }
        return res.json(insertData);
      });
    }
  });
});



// Endpoint to update the list of expenses based on user ID
app.post("/expensesList", (req, res) => {
  let { category, expense, month } = req.body;
  const userId = req.body.id;
  console.log('Received enter-used-budget request:', req.body);

  db.query(
    'SELECT * FROM budget_details WHERE category = ? AND month = ? AND user_id = ?',
    [category, month, userId],
    (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.length > 0) {
        // Category exists, update the used value
        db.query(
          'UPDATE budget_details SET expense = ? WHERE category = ? AND month = ? AND user_id = ?',
          [expense, category, month, userId],
          (updateErr) => {
            if (updateErr) {
              console.error('MySQL update error:', updateErr);
              return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: 'Expense update successful' });
          }
        );
      } else {
        // Category doesn't exist, return an error
        res.status(400).json({ error: 'Category does not exist for the specified month and user' });
      }
    }
  );
  });

  app.post('/dashboard', (req, res) => {
    console.log("req-->",req.body)
    const sql = 'SELECT * FROM budget_details where user_id=?';   
    db.query(sql,[req.body.id], (err, results) => {
      if (err) {
        console.log("Error fetching budget details:", err);
        return res.status(500).json({ error: '' });
      }
      if (results.length === 0) {
        console.log("results",results)
        return res.status(404).json({ message: 'No budget details found for the user' });
      }
      return res.status(200).json({ budgetDetails: results });
    });
  });

  app.post('/categories', (req, res) => {
    const { month,userId } = req.body;
   // const userId = req.body.id;
    const sql = 'SELECT DISTINCT category FROM budget_details WHERE month = ? AND user_id =?';
    db.query(sql, [month,userId], (err, results) => {
      if (err) {
        console.log("Error fetching categories:", err);
        return res.status(500).json({ error: 'Error fetching categories' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'No categories found for the selected month' });
      }
      const categories = results.map((item) => item.category);
      return res.status(200).json(categories);
    });
  });
  
//delete configured budget for that month
app.delete('/deleteBudget', (req, res) => {
  const { month, userId, category } = req.body;
  const sql = 'DELETE FROM budget_details WHERE month = ? AND user_id = ? AND category = ?';
  db.query(sql, [month, userId, category], (err, result) => {
    if (err) {
      console.log("Error deleting category:", err);
      return res.status(500).json({ error: 'Error deleting category' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found for deletion in the selected month' });
    }
    return res.status(200).json({ message: 'Category deleted successfully' });
  });
});
app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});