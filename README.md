# RentApp

## About

RentApp is a rental platform with a unique approach compared to existing market options. Instead of searching for individual properties, users access apartments through their corresponding buildings. This design allows someone standing on the street to easily view available apartments in a building they select.

The project was developed in a single sprint, focusing on delivering a streamlined and innovative rental experience.

## Technologies Used

- Backend: Python with FastAPI framework.
- Database: MySQL.
- Frontend: React with Material UI and vanilla CSS.
- Docker: Used to containerize the application.

## Lessons Learned

### Technical Insights

- Frontend-Backend Integration: Learned how to connect the frontend with the backend by making requests using various HTTP methods.
- Authentication and Security: Gained knowledge of implementing JWT (JSON Web Tokens) for secure user authentication.

### Client Collaboration

- Requirement Elicitation: Learned how to conduct effective client interviews to gather and refine project requirements.
- User Stories: Documented requirements as user stories to ensure clarity and alignment with client expectations. Detailed user stories were created and managed using Trello. You can view the board [here](https://trello.com/invite/b/670d68430f70443c61c511a6/ATTI4e7626c6fe1ba754a472238ce6727e210D5084CF/rentapp).
- Importance of Documentation: Understood the value of thorough documentation for both technical processes and project management.

## Screenshots

### Homepage

![Homepage](/client/public/home.png)

### Forms for apartment and building creating

![Forms](/client/public/forms.png)

### Search Filters

![Forms](/client/public/filters.png)

## Install

### Prerequisites

- Docker installed on your system. You can download and install it from [here](https://www.docker.com/get-started).

### Build the api docker image:

1. Clone the project repository:

    ```bash
    git clone https://github.com/gonblas/rentapp.git
    cd rentapp
    ```

2. Build and start the docker container:

    ```bash
    docker-compose up --build -d
    ```

3. Check if the containers are running:
    
   ```bash
   docker ps
   ```
    
Now you can access the frontend at [http://localhost:5173](http://localhost:5173) and the Swagger Docs of the API at [http://localhost:8000/docs](http://localhost:8000/docs).

### Additional notes

- Make sure that ports 8000 and 5173 are available and not being used by another application.