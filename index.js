
// assignment - implementing feature in dating app to find potential matches based on hobbies

const express = require('express');
const mysql = require('mysql');

//Express app

const app = express();

const port = process.env.PORT || 3001;


// Creating a MySQL connection
// dating_app database conatins the data

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joshna428',
    database: 'dating_app'

});

//Connect to MySQL

connection.connect((err) => {
    if (err) {
        console.error('Failed to connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


// API endpoint to get potential matches based on hobbies

app.get('/match/:userId', (req, res) => {
    const userId = req.params.userId;
  
    findPotentialMatches(userId, (error, potentialMatches) => {
      if (error) {
        res.status(500).json({ error: 'Error finding potential matches' });
        return;
      }
  
      res.json({ potentialMatches });
    });
  });

   /**
 * Find potential matches for a user based on their hobbies.
 * @param {number} userId - The ID of the user.
 * @param {function} callback - The callback function to handle the result or error.
 */
function findPotentialMatches(userId, callback) {
    // Query to retrieve the user's information
    const findUserQuery = 'SELECT * FROM users WHERE id = ?';
    connection.query(findUserQuery, [userId], (error, user) => {
      if (error) {
        callback(error);
        return;
      }
  
      if (user.length === 0) {
        callback(new Error('User not found'));
        return;
      }
  
      // Split the user's hobbies into an array
      const userHobbies = user[0].hobbies.split(',');
  
      // Query to find potential matches based on matching hobbies
      const findPotentialMatchesQuery = `
        SELECT u.id, u.name, u.hobbies
        FROM users u
        INNER JOIN hobbies h ON u.id = h.user_id
        WHERE u.id != ? AND h.hobby IN (?)
        GROUP BY u.id, u.name, u.hobbies
      `;
  
      // Execute the query to find potential matches
      connection.query(findPotentialMatchesQuery, [userId, userHobbies], (error, rows) => {
        if (error) {
          callback(error);
          return;
        }
  
        // Map the query results to potential match objects
        const potentialMatches = rows.map((row) => {
          return {
            id: row.id,
            name: row.name,
            hobbies: row.hobbies.split(',')
          };
        });
  
        // Sort potential matches based on the number of matching hobbies in descending order
        potentialMatches.sort((a, b) => {
          const aMatchCount = countMatchingHobbies(userHobbies, a.hobbies);
          const bMatchCount = countMatchingHobbies(userHobbies, b.hobbies);
          return bMatchCount - aMatchCount;
        });
  
        // Return the potential matches
        callback(null, potentialMatches);
      });
    });
  }
  
  /**
   * Count the number of matching hobbies between the user and a potential match.
   * @param {string[]} userHobbies - The hobbies of the user.
   * @param {string[]} matchHobbies - The hobbies of the potential match.
   * @returns {number} - The count of matching hobbies.
   */
  function countMatchingHobbies(userHobbies, matchHobbies) {
    let count = 0;
    for (const hobby of matchHobbies) {
      if (userHobbies.includes(hobby)) {
        count++;
      }
    }
    return count;
  }
  

   //start the server
   app.listen(port, () => {
    console.log(`server started on port  ${port}`);
  }); 

  //http://localhost:3001/match/1
