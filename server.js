const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sahil@1234',
  database: 'business_data',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve login.html as the initial page
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.post('/login', (req, res) => {
  const { userId, password } = req.body;
  connection.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [userId, password],
    (err, results) => {
      if (err) {
        res.status(500).send('Error fetching data from database');
        return;
      }
      if (results.length > 0) {
        res.redirect('/index.html'); // Redirect to index.html on successful login
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
  );
});

app.post('/register', (req, res) => {
  const { newUserId, newPassword } = req.body;
  connection.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [newUserId, newPassword],
    (err, results) => {
      if (err) {
        res.status(500).send('Error inserting data into database');
        return;
      }
      res.redirect('/login.html'); // Redirect to login.html after successful registration
    }
  );
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Please open your browser and navigate to http://localhost:${port}/login.html`);
  });
  
