# Cricket Match Management API

This Node.js application provides a set of REST APIs to manage cricket match data, focusing on tracking ball-by-ball details during a match. The APIs allow for adding new ball data, editing existing ball data, and retrieving match details.

## Features

- Add new ball data to update match statistics.
- Edit existing ball data and reverse previous updates.
- Retrieve all match details including ball-by-ball data.

## Technologies Used

- Node.js
- Express
- MongoDB with Mongoose


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community) (Make sure MongoDB is running)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cricket-api.git
    cd cricket-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:

    ```env
    MONGO_URI=mongodb://localhost:27017/cricketDB
    PORT=4000
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The server should be running on `http://localhost:4000`.


