import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout.jsx";
import HomePage from "@/components/pages/HomePage.jsx";
import CommandsPage from "@/components/pages/CommandsPage.jsx";
import LoginPage from "@/components/pages/LoginPage.jsx";
import MyServersPage from "@/components/pages/MyServersPage.jsx";
import ServerDashboardPage from "@/components/pages/ServerDashboardPage.jsx";
import AboutPage from "@/components/pages/AboutPage.jsx";
import PrivacyPage from "@/components/pages/PrivacyPage.jsx";
import TermsPage from "@/components/pages/TermsPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-discord-background transition-colors duration-300">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="commands" element={<CommandsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="servers" element={<MyServersPage />} />
          <Route path="servers/:serverId" element={<ServerDashboardPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="toast-custom"
      />
    </div>
  );
}

export default App;