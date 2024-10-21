# Sorting Hat App (Harry Potter Themed Personality Test)

## Purpose

This application is a Harry Potter-themed personality test that sorts users into one of the four Hogwarts houses (Gryffindor, Hufflepuff, Ravenclaw, or Slytherin). Users answer a series of questions, and based on their answers, they are assigned to a house. The app provides a magical, chat-like interface for user interaction and includes fun animations.

The app is built using **Vue.js** and can be run in development mode or deployed via **Docker** for production environments.

## Features

- Chat-based interface for answering questions.
- Harry Potter-themed personality test with score tracking.
- Responsive design that works across multiple screen sizes.
- Animated transitions between questions.
- Confetti animation for celebrating the house assignment.

## Project Setup

### Prerequisites

- **Node.js** (version 14 or higher)
- **Docker** and **Docker Compose**

### Installation and Running

1. Clone the repository:
   ```sh
   git clone https://github.com/NicolaGernone/sorting-hat-HP.git
   cd sorting-hat-app
   ```

2. Install the dependencies:
   ```sh
   make install
   ```

3. Run the development server:
   ```sh
   make dev
   ```
   This will start the app locally on `http://localhost:5173`.

### Using Docker

You can also build and run the app using Docker. This is the recommended approach for deploying the app in production.

1. **Build the Docker image**:
   ```sh
   make docker-build
   ```

2. **Start the Docker container**:
   ```sh
   make docker-up
   ```
   This will start the app on `http://localhost:8080`.

3. **Stop the Docker container**:
   ```sh
   make docker-down
   ```

### Building for Production

To create a production-ready build of the application, use the following command:

```sh
make build
```

The output will be in the `dist/` folder.

### Future Implementations

Here are some potential future improvements:
- **Backend Integration**: Extend the app to save user results in a database, allowing for further analysis or user sessions.
- **Multiplayer Mode**: Add a multiplayer feature to allow multiple users to take the quiz together and compare their results.
- **Enhanced Animations**: Add more magical animations, such as wand effects or house-specific animations.
- **Localization**: Support multiple languages for a broader audience.

### Comments

The application uses **Docker** for ease of deployment. It leverages **Vue.js** to provide a dynamic, interactive interface with smooth animations and transitions. The production build is served using **Nginx** for high performance and scalability.

If you're looking to extend or customize the app, the current architecture allows for easy integration of new features.

### Final Notes

- This setup allows for **local development** with `npm` and **production deployment** with **Docker**.
- The **`Makefile`** simplifies running the necessary Docker and npm commands, making it easy to manage the app.

