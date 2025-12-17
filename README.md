# Collaborative Todo Application #
```
A feature-rich, responsive, collaborative Todo application built using React and advanced Context API architecture.
This project demonstrates multi-context state management, performance optimization with memoization, custom hooks, simulated collaboration, and modern UI/UX.
```
# Features # 
```
🔐 Authentication

Mock login/logout using a simple username.
App content is protected and only visible to authenticated users.
📝 Task Management
Create, edit, complete, and delete tasks.
Nested subtasks structure.
Add and remove tags.
Multiple lists (Inbox + custom lists).
All operations update immediately.
🤝 Collaboration Simulation
Activity feed logs all user actions.
Simulates multi-user collaboration.
🎨 UI & User Preferences
Light/Dark theme toggle.
Fully responsive UI (Mobile, Tablet, Desktop).
Clean, modern, minimalistic design.
⚡ Performance Optimizations
React.memo
useCallback, useMemo
Split Context Architecture → AuthContext, TodosContext, UIContext, CollaborationContext
🧩 Custom Hooks
useAuth, useTodos, useUI, useCollaboration
🏗 Tech Stack
React (Vite)
React Context API
React Icons
Custom Responsive CSS
```
# 📁 Project Architecture #

```
my-react-app/
│
├── public/                   # Static files (icons, images, favicon, etc.)
│   └── index.html
│
├── src/
│   ├── assets/               # Optional: images, icons, fonts
│   ├── components/           # Reusable components (if any)
│   ├── contexts/             # All React Contexts
│   │   ├── AuthContext.jsx
│   │   ├── TodosContext.jsx
│   │   ├── UIContext.jsx
│   │   └── CollaborationContext.jsx
│   │
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point for React
│   ├── index.css             # Global CSS (your index.css)
│   └── App.css               # App-specific CSS (your app.css)
│
├── package.json              # Project metadata + dependencies
├── vite.config.js            # Vite configuration
└── node_modules/             # Installed npm packages
```
# Live Demo #
```
Live URL: https://todoapplication-react-vite.netlify.app/
```
# Video Walkthrough #
```Video URL:``` https://drive.google.com/file/d/1BRS83HzV4llOtomkC1kVWnkFidJOHvaT/view?usp=sharing

#What to show in the video#
```
Login (enter name)
Create a new list
Add tasks
Add subtasks & tags
Mark task/subtask complete
Delete a task/list
Show activity feed
Toggle light/dark theme
Show responsiveness (desktop → tablet → mobile)
```

# Setup & Installation #
Follow these steps to run the Collaborative Todo Application locally on your system.

📥 1. Download or Clone the Repository

You can get the project using Git:
```
git clone https://github.com/bhavyasatyasri200/Collaborative_To_Do_Application.git
cd Collaborative_To_Do_Application
```
2.Install Dependencies 
Install all required packages:

```
npm install
```
This installs:

React

Vite

React Icons

All Context Providers

Other dependencies

🚀 3. Start the Development Server

Run the app locally:
```
npm run dev
```
Vite will start the server and display a URL like:

http://localhost:5173/

Open this link in your browser to view the application.


