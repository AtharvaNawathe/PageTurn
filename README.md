# 20240319_Capstone_PageTurn
Pageturn: Your go-to destination for discovering, sharing, and discussing books. Explore diverse genres, read reviews. Dive into a world of literature and ignite your passion for reading with Pageturn.


# PAGETURN Capstone Project Checklist

## 1. Design
- [✅] Define basic functionality and features of the application.
- [✅] Sketch or wireframe user interface layout.
- [✅] Plan database schema based on application requirements.

## 2. Backend Development
- [✅] Set up Node.js and Express.js for the backend server.
- [✅] Create and configure MongoDB for the database.
- [✅] Develop API endpoints for user authentication (e.g., registration, login) using JWT.
- [✅] Implement CRUD operations for managing users and books.
- [✅] Develop API endpoints for handling reviews, likes, comments, and search functionality.
- [✅] Implement error handling and validation for API requests.

## 3. Frontend Development
- [ ] Set up Angular for the frontend application.
- [ ] Design and develop user interfaces using Angular components, templates, and styles.
- [ ] Implement user authentication forms (e.g., registration form, login form).
- [ ] Create components for displaying user profiles, book details, reviews, and search results.
- [ ] Handle user interactions and navigation between pages/routes.

## 4. Integration
- [ ] Integrate frontend with backend API endpoints.
- [ ] Implement HTTP requests (e.g., GET, POST, PUT, DELETE) to communicate with the backend.
- [ ] Test API integration using tools like Postman or Insomnia.

## 5. Testing
- [ ] Perform unit testing for Angular components and services.
- [ ] Test API endpoints for functionality, error handling, and security.
- [ ] Conduct end-to-end testing to ensure proper interaction between frontend and backend components.

## 6. Deployment
- [ ] Prepare application for deployment to a hosting platform (e.g., Heroku, Firebase).
- [ ] Set up deployment pipelines for automatic deployment from version control (e.g., GitHub, GitLab).
- [ ] Deploy both backend and frontend applications to the hosting platform.

## 7. Learning and Improvement
- [ ] Continuously learn and explore new concepts, techniques, and best practices in MEAN stack development.
- [ ] Seek feedback from peers or mentors to improve code quality and project structure.
- [ ] Reflect on development process and identify areas for improvement in future projects.



# Pageturn Backend API Checklist

## Authentication Endpoints:
- [✅] Register User: `POST /api/auth/register`
- [✅] Login User: `POST /api/auth/login`
- [ ] Logout User: `POST /api/auth/logout`    [will implement while building frontend]

## User Management Endpoints:
- [✅] Get User Profile: `GET /api/users/me`
- [✅] Update User Profile: `PUT /api/users/me`   			 
- [✅] Get User by Username: `GET /api/users/:username`  
- [✅] Delete User: `DELETE /api/users/me`    	
- [✅] Get all Users: `GET /api/users`		 
- [✅] Add Book to Currently Reading: `POST /api/users/:userId/currently-reading`
- [✅] Add Book to Want to Read: `POST /api/users/:userId/want-to-read`
- [✅] Add Book to Read: `POST /api/users/:userId/read`

## Book Management Endpoints:
- [✅] Get All Books: `GET /api/books`
- [✅] Get Book by ID: `GET /api/books/:id`
- [✅] Search Books: `GET /api/books/search` 			 	
- [✅] Add Book: `POST /api/books`				
- [✅] Update Book: `PUT /api/books/:id`
- [✅] Delete Book: `DELETE /api/books/:id` 			 
 
## Review Management Endpoints:
- [✅] Get Reviews for Book: `GET /api/books/:id/reviews`  
- [✅] Write Review for Book: `POST /api/books/:id/reviews` 		
- [✅] Get Review by ID: `GET /api/reviews/:id` 			
- [✅] Update Review: `PUT /api/reviews/:id`       
- [✅] Delete Review: `DELETE /api/reviews/:id`    

## Interaction Endpoints:
- [✅] Like Review: `POST /api/reviews/:id/like` 				
- [✅] Unlike Review: `POST /api/reviews/:id/unlike`
- [✅] Add Comment to Review: `POST /api/reviews/:id/comments`
