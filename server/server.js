// Import necessary packages
const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require("cors");
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Add CORS middleware to enable cross-origin requests

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'database',
  password: '123456789', // Wrap the password in quotes
  port: 5432, // The default PostgreSQL port is 5432
});


// read database and login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = $1 AND password = $2";
  // const values = [username, password]; // Parameters for the query

  pool.query(sql, [ req.body.username,req.body.password], (err, data) => {
    console.log(data)
    if (err) {
      console.error('Error executing query:', err);
      return res.json("Error");
    }

    if (data.rows.length === 1) {
      return res.json("Login successfully");
    } else {
      return res.json("No record");
    }
  });
});
 
app.get('/getUsers', async(req,res)=>{
  try{
    const sql = "SELECT * FROM users";
    
    const{rows}=await pool.query(sql);

    res.json(rows);

  }catch(error){
    console.error('error fetching data:',error);
    res.status(500).json({error:'internal server error'})
  }
});
// update route
app.put('/updateUser/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const sql = 'UPDATE users SET username = $1, password = $2 WHERE id = $3';
    const values = [username, password, id];

    await pool.query(sql, values);
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

// Delete a user  ID, username, and password
app.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const sql = 'DELETE FROM users WHERE id = $1';
    const values = [id];

    await pool.query(sql, values);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error' });
  }
});



// Start the Express server
app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
