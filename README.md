# Chat Application

A simple full-stack chat application with authentication, user profiles, and (optional) real-time messaging using React and Node.js.
## 🎬 Demo Video

[Watch on YouTube](https://youtu.be/9iFCkcfH6SI)

## demo images

![Screenshot 2025-07-04 110938](https://github.com/user-attachments/assets/c81a2d73-e6c7-4abf-96f1-5a65da97bb36)
![Screenshot 2025-07-04 110943](https://github.com/user-attachments/assets/1137f66c-5ce9-4a05-8f6d-1c4319b47e00)
![image](https://github.com/user-attachments/assets/5e6b0476-d30c-4f3b-a09a-dd44741c7c97)
![image](https://github.com/user-attachments/assets/f53368bd-364b-4323-ad38-de7ae3f827d4)
![image](https://github.com/user-attachments/assets/e8ac84e6-b0ec-41a8-80bd-cdda017a6fee)


## Features

- User registration and login
- Profile update
- List of online users (if sockets enabled)
- Send and receive messages
- Responsive UI with React
- Toast notifications for actions

## Tech Stack

- **Frontend:** React, Context API, Axios, React Hot Toast
- **Backend:** Node.js, Express, MongoDB
- **(Optional) Real-time:** Socket.IO

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

#### 1. Clone the repository

```sh
git clone https://github.com/VIGGU-7/chat-application.git
cd chat-application
```

#### 2. Install dependencies

**Backend:**
```sh
cd backend
npm install
```

**Frontend:**
```sh
cd ../frontend
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=8080
mongo_url="<>"
JWT_SECRET="<>"
cloudName="<>"
cloudinaryApiKey=<>
cloudinaryApiSecret="<>"
clientUrl=<>
NODE_ENV="devolopment"
```
Create a `.env` file in the `frontend` folder:
```
VITE_BACKEND_URL="http://<>/api"
VITE_BASE_URL="http://<>"  
```

#### 4. Start the Application

**Backend:**
```sh
npm run dev
```

**Frontend:**
```sh
npm start
```

The frontend runs on [http://localhost:3000](http://localhost:3000)  
The backend runs on [http://localhost:8080](http://localhost:8080)

## Usage

- Register a new account or log in.
- Update your profile.
- Start chatting with other users.
- If real-time is enabled, messages and online status update instantly.

## Project Structure

```
chat-application/
  backend/
    src/
      controllers/
      models/
      routes/
      ...
    server.js
  frontend/
    src/
      components/
      context/
      lib/
      ...
    App.jsx
```

## Customization

- To enable/disable real-time features, adjust socket logic in the context files.
- Update styles in `frontend/src` as needed.
