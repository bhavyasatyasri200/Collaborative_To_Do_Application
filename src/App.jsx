import React, { useState, useMemo, memo, useEffect } from "react";
import { FiSun, FiMoon, FiInbox, FiList } from "react-icons/fi";
import "./App.css";

import { useAuth } from "./contexts/AuthContext.jsx";
import { useTodos } from "./contexts/TodosContext.jsx";
import { useUI } from "./contexts/UIContext.jsx";
import { useCollaboration } from "./contexts/CollaborationContext.jsx";

/* ================= LEFT SIDEBAR ================= */
const ListSidebar = memo(function ListSidebar({
  lists,
  selectedListId,
  onSelectList,
  onDeleteList,
  onAddList,
  onEditList, // new prop
}) {
  const [newList, setNewList] = useState("");
  const [editingListId, setEditingListId] = useState(null);
  const [editingListName, setEditingListName] = useState("");

  return (
    <aside className="panel sidebar-panel">
      <h2 className="panel-title">Lists</h2>

      <ul className="list-reset">
        {lists.map((list) => {
          const isInbox = list.id === "inbox";
          const isEditing = editingListId === list.id;

          return (
            <li
              key={list.id}
              className={`sidebar-item ${
                selectedListId === list.id ? "sidebar-item-active" : ""
              }`}
              onClick={() => !isEditing && onSelectList(list.id)}
            >
              <div className="sidebar-item-left">
                {isInbox ? <FiInbox /> : <FiList />}
                {isEditing ? (
                  <input
                    className="input"
                    value={editingListName}
                    onChange={(e) => setEditingListName(e.target.value)}
                    onBlur={() => {
                      onEditList(list.id, editingListName);
                      setEditingListId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onEditList(list.id, editingListName);
                        setEditingListId(null);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{list.name}</span>
                )}
              </div>

              {list.id !== "inbox" && !isEditing && (
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    className="btn-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingListId(list.id);
                      setEditingListName(list.name);
                    }}
                  >
                    ✎
                  </button>
                  <button
                    className="btn-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteList(list.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <form
        className="panel-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (newList.trim()) {
            onAddList(newList.trim());
            setNewList("");
          }
        }}
      >
        <input
          className="input"
          placeholder="New list"
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
        />
        <button className="btn btn-full">Add list</button>
      </form>
    </aside>
  );
});

/* ================= TASK SECTION ================= */
const TaskSection = memo(function TaskSection({
  currentList,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onEditTask, // new prop
}) {
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState("");

  if (!currentList) {
    return <main className="panel tasks-panel">No list selected</main>;
  }

  return (
    <main className="panel tasks-panel">
      <h2 className="panel-title">{currentList.name}</h2>

      <div className="task-list">
        {currentList.tasks.map((task) => {
          const isEditing = editingTaskId === task.id;
          return (
            <div key={task.id} className="task-item">
              <label className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(currentList.id, task.id)}
                />
                {isEditing ? (
                  <input
                    className="input"
                    value={editingTaskTitle}
                    onChange={(e) => setEditingTaskTitle(e.target.value)}
                    onBlur={() => {
                      onEditTask(currentList.id, task.id, editingTaskTitle);
                      setEditingTaskId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onEditTask(currentList.id, task.id, editingTaskTitle);
                        setEditingTaskId(null);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span className={task.completed ? "task-done" : ""}>
                    {task.title}
                  </span>
                )}
              </label>

              <div style={{ display: "flex", gap: "4px" }}>
                {!isEditing && (
                  <button
                    className="btn-chip"
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditingTaskTitle(task.title);
                    }}
                  >
                    ✎
                  </button>
                )}
                <button
                  className="btn-delete"
                  onClick={() => onDeleteTask(currentList.id, task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="task-add-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (newTask.trim()) {
            onAddTask(currentList.id, newTask.trim());
            setNewTask("");
          }
        }}
      >
        <input
          className="input"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn">Add</button>
      </form>
    </main>
  );
});

/* ================= ACTIVITY ================= */
const ActivityPanel = memo(function ActivityPanel({ activityLog }) {
  return (
    <aside className="panel activity-panel">
      <h2 className="panel-title">Activity</h2>
      <ul className="activity-list">
        {activityLog.map((log) => (
          <li key={log.id} className="activity-item">
            {log.message}
          </li>
        ))}
      </ul>
    </aside>
  );
});

/* ================= MAIN APP ================= */
export default function App() {
  const { isAuthenticated, login, logout } = useAuth();
  const {
    lists,
    selectedListId,
    addList,
    deleteList,
    selectList,
    addTask,
    toggleTask,
    deleteTask,
    editList,   // new function from context
    editTask,   // new function from context
  } = useTodos();

  const { theme, toggleTheme } = useUI();
  const { activityLog } = useCollaboration();

  const [name, setName] = useState("");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const currentList = useMemo(
    () => lists.find((l) => l.id === selectedListId) || lists[0],
    [lists, selectedListId]
  );

  if (!isAuthenticated) {
    return (
      <div className="auth-root">
        <form
          className="auth-form panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (name.trim()) login(name.trim());
          }}
        >
          <h1 className="login-title">Collaborative To-Do</h1>
          <input
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="app-root">
      {/* ===== FIXED HEADER ===== */}
      <header className="app-header">
        <h1 className="app-title">Collaborative To-Do</h1>

        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <div className="app-layout">
        <ListSidebar
          lists={lists}
          selectedListId={selectedListId}
          onSelectList={selectList}
          onDeleteList={deleteList}
          onAddList={addList}
          onEditList={editList} // pass editList
        />

        <TaskSection
          currentList={currentList}
          onAddTask={addTask}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onEditTask={editTask} // pass editTask
        />

        <ActivityPanel activityLog={activityLog} />
      </div>
    </div>
  );
}
