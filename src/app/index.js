import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Posts from "./posts";

function App() {
  return (
    <Routes>
      <Route path="" element={<Navigate to="/posts" />} />
      <Route path="/posts" Component={Posts} />
    </Routes>
  );
}

export default App;
