import './App.css'
import React from "react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import JobListPage from "./pages/JobListPage";
import { ToastContainer } from "react-toastify";
import AuthPage from './pages/AuthPage';
import DashLayout from './pages/DashLayout';
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected Pages start*/}
        <Route path="/" element={<ProtectedRoute>    <DashLayout />      </ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobs" element={<JobListPage />} />
        </Route>
        {/* protected pages end */}

        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <ToastContainer position="bottom-right" autoClose={2000} />

    </>
  );
}

export default App;
