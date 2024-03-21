const axios = require('axios');

// Array of user data objects
const users =[
    {
    "username": "alice_smith",
    "email": "alice_smith@example.com",
    "password": "alice123",
    "fullName": "Alice Smith",
    "dateOfBirth": "1990-09-20",
    "gender": "female",
    "country": "India",
    "interests": ["fantasy", "history"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "sam_jackson",
    "email": "sam_jackson@example.com",
    "password": "sam123",
    "fullName": "Sam Jackson",
    "dateOfBirth": "1988-04-10",
    "gender": "male",
    "country": "India",
    "interests": ["mystery", "self-help"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "lisa_brown",
    "email": "lisa_brown@example.com",
    "password": "lisa123",
    "fullName": "Lisa Brown",
    "dateOfBirth": "1993-12-28",
    "gender": "female",
    "country": "India",
    "interests": ["thriller", "travel"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "max_carter",
    "email": "max_carter@example.com",
    "password": "max123",
    "fullName": "Max Carter",
    "dateOfBirth": "1985-07-03",
    "gender": "male",
    "country": "India",
    "interests": ["science fiction", "poetry"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "emily_wilson",
    "email": "emily_wilson@example.com",
    "password": "emily123",
    "fullName": "Emily Wilson",
    "dateOfBirth": "1997-03-18",
    "gender": "female",
    "country": "India",
    "interests": ["biography", "young adult"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "alex_jones",
    "email": "alex_jones@example.com",
    "password": "alex123",
    "fullName": "Alex Jones",
    "dateOfBirth": "1980-11-05",
    "gender": "male",
    "country": "India",
    "interests": ["history", "children"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "olivia_clark",
    "email": "olivia_clark@example.com",
    "password": "olivia123",
    "fullName": "Olivia Clark",
    "dateOfBirth": "1992-06-25",
    "gender": "female",
    "country": "India",
    "interests": ["self-help", "horror"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  },
  {
    "username": "jacob_miller",
    "email": "jacob_miller@example.com",
    "password": "jacob123",
    "fullName": "Jacob Miller",
    "dateOfBirth": "1983-09-12",
    "gender": "male",
    "country": "India",
    "interests": ["cookbooks", "graphic novels"],
    "wantToRead": [],
    "currentlyReading": [],
    "read": [],
    "isAdmin": false
  }
];


// Function to register a single user
async function registerUser(userData) {
  try {
    const response = await axios.post('http://localhost:3000/api/users/register', userData);
    console.log(`User registered successfully: ${userData.username}`);
  } catch (error) {
    console.error(`Error registering user ${userData.username}: ${error.message}`);
  }
}

// Function to register multiple users
async function registerMultipleUsers(users) {
  for (const userData of users) {
    await registerUser(userData);
  }
}

// Call the function to register multiple users
registerMultipleUsers(users);
