 <h1 align  = "center">Cognitive Assessment Application</h1>

<div align="center">
 <img src = "https://github.com/NikhilSingh07/NikhilSingh07/blob/main/Secret/cognitive.gif" width = "400" align  = "center"> 
</div>


## Project Summary

This project addresses linguistic and cultural challenges in cognitive assessment through a web-based application. Developed with Node.js, Express.js, React.js, and a PostgreSQL database, the application uses interactive searching and foraging tasks to assess cognitive abilities. The use of a game-like format not only makes the assessment enjoyable but also offers a distinctive way to evaluate cognitive skills.


## Project Overview

### Features

🎮 Game-Like Format: Users explore 18 items (6 shapes, 3 sizes) within a captivating and interactive environment.

🎯 Objective: The primary goal is to search for 6 hidden fruits beneath 6 items in each trial, introducing an element of challenge and concentration.

🧠 Cognitive Challenge: Clicking an item shuffles positions, evaluating foraging efficiency and working memory as users adapt to the changing environment.

🔍 Hidden Challenge: Uncover hidden patterns to test executive functions. Each pattern is linked to 2 shapes:


### Hidden Patterns

1. Pattern 1: Shapes never produce fruits.  
2. Pattern 2: Subsequent shapes yield fruit in every consecutive trial.  
3. Pattern 3: Subsequent shapes yield fruit in every alternate trial.  

## Why it Matters?

This app isn't just about playing games. It's a smart way to understand how our brains work, especially when it comes to memory and problem-solving. Plus, it's designed to be fair and consider different languages and cultures.  

## Getting started
Follow these steps to run the Cognitive Assessment Application on your computer:

### 1. Prerequisites

   Make sure you have the following installed on your machine:

   - [Node.js](https://nodejs.org/)  
   - [npm](https://www.npmjs.com/) (Node Package Manager)  
   - [PostgreSQL](https://www.postgresql.org/) (You'll need to set up a database)  

### 2. Clone the Repository  

       git clone https://github.com/your-username/cognitive-assessment.git
       cd CognitiveAssessment


### 3. Set up the database

      1. Create a PostgreSQL database.
      2. Open the 'database.sql'file in the 'backend/database' directory.
      3. Copy the content of database.sql.
      4. Open your PostgreSQL command line or a tool like pgAdmin.
      5. Paste and execute the SQL code to create the necessary tables and setup the database.
      6. Update the database configuration in the config folder.
       

### 4. Set up the React App
     
      cd frontend
      npm install

### 5. Set up the server

      cd..
      cd backend
      npm install


### 6. Run the Application

Open two terminal windows:

In one window, navigate to the frontend folder and run:
                        
      npm start
      
In the other window, navigate to the backend folder and run:      

      npm start


That's it! 
You've successfully set up and run the Cognitive Assessment Application on your computer. Have fun exploring and testing your cognitive abilities!


