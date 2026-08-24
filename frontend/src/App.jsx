import React from "react";
import HomePage from "./components/HomePage";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="app-container">
      <HomePage />
      {/* Chatbot renders its own floating "Speak with Mark" button
          fixed to the bottom of the screen, and opens full-screen
          on tap. */}
      <Chatbot />
    </div>
  );
}