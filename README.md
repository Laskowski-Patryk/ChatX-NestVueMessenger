# ChatX - Real-Time Messenger App

ChatX is a real-time messenger application developed using Nest.js, Vue.js, websockets, and TypeScript. The project encompasses a full-stack application architecture, integrating real-time communication features and user authentication.


## Features

- Real-time messaging using websockets powered by Socket.io.
- User authentication and registration.
- Responsive user interface using Bootstrap and Vue.js.
- Enhanced security with recaptcha verification.

## Technologies Used

- **Backend**: Nest.js, Express.js, Socket.io, TypeScript
- **Frontend**: Vue.js, Bootstrap-Vue, TypeScript
- **Database**: MongoDB
- **Testing**: Cypress *work in progress*

## Prerequisites

- Node.js (version 7.16.0 or higher)
- npm (version 8.4.0 or higher)

## Getting Started

### Installation

1. Clone the repository: `git clone https://github.com/Laskowski-Patryk/ChatX-NestVueMessenger`
2. Navigate to the project directory: `cd chatx`

#### Backend Setup

1. Navigate to the backend directory: `cd chatx-api`
2. Install backend dependencies: `npm install`
3. Rename `.env.example` to `.env` and update with your environment variables.
4. Run the backend server: `npm run dev`

#### Frontend Setup

1. Open a new terminal window.
2. Navigate to main directory.
3. Install frontend dependencies: `npm install`
4. Run the frontend development server: `npm run serve`

### Usage

1. Register a new user.
2. Log in with your credentials.
3. Start a new conversation or join an existing one.
4. Send and receive real-time messages in the messenger interface.
