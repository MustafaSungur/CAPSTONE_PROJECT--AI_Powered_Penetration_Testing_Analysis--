# AI-Powered Penetration Testing Analysis Application
## Introduction
This project utilizes artificial intelligence technologies to perform advanced penetration testing analysis aimed at identifying security vulnerabilities and safeguarding web applications against security threats. The application integrates various Open Source Intelligence (OSINT) tools and network scanning techniques.

## Project Overview
This RESTful API is developed using Node.js and the Express framework. It is complemented by a frontend built with React, utilizing the Vite build tool for faster development and optimized builds. The API includes various endpoints for managing user authentication, session management, and OSINT operations. The system supports authentication mechanisms with JSON Web Tokens (JWT).

## Technologies Used
### Backend
- Node.js
- Express
- MongoDB
- JWT for authentication
- Nmap
- Nuclei
- theHarvester
- Gemini

### Frontend:
- React
- Vite
- Shadcn/ui
- Tailwind

## Endpoints
### Authentication Endpoints
| HTTP Method  | Endpoint  |  Description |
| ------------ | ------------ | ------------ |
| POST  | /api/auth/login	  |  Logs in a user and returns a JWT token |
|  POST |/api/auth/register	   | Registers a new user and issues a JWT token  |
|  DELETE |   /api/auth/delete	|  Deletes a user account (requires auth token) |
| PATCH  | /api/auth/update	  | Updates user details (requires auth token)  |

### OSINT Endpoints
| HTTP Method  | Endpoint  |  Description |
| ------------ | ------------ | ------------ |
| POST  | /api/osint/	  |  Initiates an OSINT operation |
|  POST |/api/osint/urls	   | Retrieves all OSINT data for URLs|
|  GET |   /api/osint/urls/:id	|  Retrieves comments on a specific URL|


## Development and Testing
**- Follow these steps to set up and test the application:**

#### Setting up the Frontend
1. Clone the frontend repository from GitHub.
2. Navigate to the frontend directory and install dependencies:
```
npm install
```

1. Setting up the Frontend Environment
- Create a .env file in the root of your frontend project directory and include the following variables:
```
VITE_BASE_URL=http://localhost:<backend_port>
```
Replace **backend_port** with the port number your backend server is listening on, typically the same value you set for PORT in your backend .env.

1.  Start the frontend development server:
```
npm run dev
```
This will serve the frontend on a local server, typically at http://localhost:3000.

#### Setting up the Backend
1. Clone the backend repository if it is separate or navigate to the backend directory.
2. Install the necessary backend dependencies:
```
npm install
```

1. Setting up the Backend Environment
- Create a .env file in the root of your backend project directory and include the following variables:
```
API_KEY=<your_gemini_api_key>   # API key for Gemini
MONGO_DB=<your_mongodb_uri>     # MongoDB URI
PORT=<your_preferred_port>      # Port number the backend server will listen on
```
Replace **your_gemini_api_key**, **your_mongodb_uri**, and** your_preferred_port** with your actual API key for Gemini, MongoDB connection string, and the port you wish to use, respectively.

1.  Start the backend server:
```
npm run dev
```
Ensure that the backend services are running properly and are accessible to the frontend.

## Testing the Application
**Once both the frontend and backend are up and running, proceed with the following steps to test the application features:**


![1718438959170](https://github.com/user-attachments/assets/c21cbfe5-f7d3-40ec-8e24-75b009b85dea)

1)  Register Page:
- Navigate to the registration page.
- Create a new user account to test the registration process.
  
![image](https://github.com/user-attachments/assets/605aea96-b57b-411b-abf4-d6abb4b9fc20)

2) Login Page:
- Enter your username and password.
- Click the 'Login' button to authenticate and access the application.

![image](https://github.com/user-attachments/assets/43fc0317-6eeb-4d88-9d8e-01da14942b7b)


3)  OSINT Page:
- Go to the OSINT page.
- Input a website URL to initiate an OSINT operation. This will trigger the backend to start gathering data.

![image](https://github.com/user-attachments/assets/e32cbb1e-f747-4973-ba1b-959d8d04892a)


4) Dashboard Page:
- Access the dashboard to view past OSINT records.
- This page provides a summary and status of all the operations conducted.
  
![1718438958821](https://github.com/user-attachments/assets/3573f8df-f545-430b-98f0-4d10331fafa4)

5) OSINT Detail Page:
- From the dashboard, if a penetration test report is ready, its corresponding icon will turn green.
- Click on the green icon to view detailed results and reports of the OSINT operation.

 ![1718438959080](https://github.com/user-attachments/assets/e4525361-5154-4283-a79a-2b42cc2dcf2a)
