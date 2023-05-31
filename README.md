# dating_app_feature_matching_basedonHobbies


Features:

User registration and profile management
Matching algorithm based on hobbies
API endpoint to retrieve potential matches
Integration with MySQL database
Prerequisites
Node.js (version X.X.X)
MySQL database

Installation :
Clone the repository:

git clone https://github.com/your-username/match-finder-app.git
Install dependencies:

cd match-finder-app
npm install
Set up the MySQL database:

Create a new database named match_finder_db.
Import the provided SQL file match_finder_db.sql into your MySQL database.
Configure the database connection:

Open the index.js file.
Replace 'your_username', 'your_password', and 'your_database_name' with your actual MySQL credentials and database name.
Usage
Start the server:

node index.js
The server will start listening on port 3000 (or the specified port).

Make a GET request to http://localhost:3001/match/:userId (replace :userId with the desired user ID) to retrieve potential matches based on hobbies.

API Endpoint
Retrieve Potential Matches
Endpoint: /match/:userId

Method: GET

Parameters:

userId (required): The ID of the user to find potential matches for.

Response:

Status Code: 200 (OK)
Body: JSON object with a property potentialMatches containing an array of potential matches.

Troubleshooting :
If you encounter any issues, make sure you have the necessary prerequisites installed and the MySQL database set up correctly.

Contributing:
This project is not open for contributions at the moment.
