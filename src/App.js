import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom"
import { Route } from "react-router";
import { DataContextProvider } from "./context/DataContext";
import "./App.css"
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Templates from "./pages/templates";
import { TemplateContextProvider } from "./context/TemplateContext";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedBacks from "./pages/feedbacks/feedbacks";
import FeedBackForm from "./pages/feedbackForm";
import Settings from "./pages/settings";
import HomePage from "./pages/home";

function App() {
  return (
    <div className="app">
      <DataContextProvider>
        <TemplateContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<ProtectedRoute path="/dashboard" component={<Dashboard />} />} />
              <Route path="/template" element={<ProtectedRoute path="/" component={<Templates />} />} />
              <Route path="/feedbacks" element={<ProtectedRoute path="/" component={<FeedBacks />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feedback/:template_id/" element={<FeedBackForm />} />
              <Route path="/settings" element={<ProtectedRoute path="/" component={<Settings />} />} />
            </Routes>
          </Router>
        </TemplateContextProvider>
      </DataContextProvider>
    </div >
  );
}

export default App;
