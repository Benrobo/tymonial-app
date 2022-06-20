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

function App() {
  return (
    <div className="app">
      <DataContextProvider>
        <TemplateContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<ProtectedRoute path="/" component={<Dashboard />} />} />
              <Route path="/dashboard" element={<ProtectedRoute path="/dashboard" component={<Dashboard />} />} />
              <Route path="/template" element={<ProtectedRoute path="/" component={<Templates />} />} />
              <Route path="/feedbacks" element={<ProtectedRoute path="/" component={<FeedBacks />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feedback/:template_id/" element={<FeedBackForm />} />
            </Routes>
          </Router>
        </TemplateContextProvider>
      </DataContextProvider>
    </div >
  );
}

export default App;
