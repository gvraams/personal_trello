import React from "react";
import "./styles.css";
import ReactApp from "./Home";

export default function App() {
  return (
    <React.Fragment>
      <div className="App">
        <h1>Poor Man's Trello</h1>
        <h2>Kanban board with Drag n Drop implemented in vanilla JavaScript</h2>
      </div>
      <ReactApp />
    </React.Fragment>
  );
}
