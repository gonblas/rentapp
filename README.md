# RentApp

# Install

## Prerequisites

- Docker installed on your system. You can download and install it from [here](https://www.docker.com/get-started).

## Build the api docker image:

1. Clone the project repository:

    ```bash
    git clone https://github.com/gonblas/rentapp.git
    cd rentapp
    ```

2. Build and start the docker container:

    ```bash
    docker-compose up --build -d
    ```

3. Check if the container is running:
    
        ```bash
        docker ps
        ```
    
Now you can access the Swagger Docs on http://localhost:8000/docs

## Additional notes

- Make sure that port 8000 is available and not being used by another application.
- You can change the mapped port by modifying docker-compose.yaml file.
