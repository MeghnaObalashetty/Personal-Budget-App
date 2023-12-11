/*
 * File:				README
 * 
 * Author               Meghna Obalashetty	- 801333672
 *                           
 *
 *
 */

Technologies Used

Frontend: React JS, Vite 
Backend: Node.js, Express.js
Database: MySQL


Personal Budget Tracker App

This Personal Budget Tracker web application helps users manage their expenses, track budgets, and visualize spending habits. It's built using React JS with Vite for the frontend, Node.js for the backend, and MySQL as the database.

Features

User Authentication: Allows users to sign up, log in, and manage their accounts securely.
Budget Management: Helps users create, update, and delete their budgets for different categories and months.
Expense Tracking: Allows users to record their expenses and view detailed insights into their spending patterns.
Dashboard: To show all the expenses added in months.
Visualization/Charts : Provides visual charts and graphs to display budget allocations, expenses, and trends over time(months).
Accessibility: Designed with accessibility in mind to ensure a better user experience for everyone.


Clone the repository:
git clone https://github.com/your-username/my-budget-tracker.git

Access the application at https://meghna-budget.netlify.app/ in your browser.



TO RUN THE PROJECT IN LOCAL :

Navigate to the frontend directory:cd my-budget-tracker/
Install dependencies:npm install
Start the development server:npm run dev
To Build : npm run build


Backend (Node.js)
Navigate to the backend directory: cd my-budget-tracker/Backend
Install dependencies:npm install
Start the backend server:node server.js /npm start

Set up the MySQL database:
Create a MySQL database and configure the connection details in server.js file.
I have used below cloud server: https://console.clever-cloud.com/ to host my database in cloud.


TESTING:
You can run Unit Test case using 'npm run test' in project folder(my-budget-tracker)
![Alt text](https://github.com/MeghnaObalashetty/Personal-Budget-App/blob/master/src/assets/UnitTest.png)

E2E Testing using Cypress
Install using npm install cypress --save-dev
Open Using npx cypress open in terminal
Run Using npx cypress run
![Alt text](https://github.com/MeghnaObalashetty/Personal-Budget-App/blob/master/src/assets/E2ELogin.png)

You can view project screens and snapshots in the folder: src/assets