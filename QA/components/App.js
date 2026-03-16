import React from "react";
import "./styles/styles.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import QuestionCard from "./components/QuestionCard";
import { questions } from "./data";

export default function App() {
  return (
    <div className="app">

      <Header />

      <div className="layout">

        <Sidebar />

        <main className="main">

          <div className="questions-header">
            <h2>Questions</h2>

            <div className="filters">
              <button className="filter active">All Questions</button>
              <button className="filter">Unanswered</button>
              <button className="filter">Most Answered</button>
            </div>

            <div className="category">
              <button className="category-btn">Category ▾</button>
              <button className="add-btn">+</button>
            </div>
          </div>

          <input
            className="question-search"
            placeholder="Search"
          />

          <div className="questions-list">
            {questions.map((q) => (
              <QuestionCard key={q.id} {...q} />
            ))}
          </div>

        </main>

      </div>

    </div>
  );
}