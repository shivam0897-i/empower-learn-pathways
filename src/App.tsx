import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Import Sonner for toast
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; // Import useLocation
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources"
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import ScrollToTop from "./components/ScrollToTop";
import Community from "./pages/Community";
import { CareerQuestionnaire } from "./pages/CareerQuestionnairePage";
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence


// Create a client
const queryClient = new QueryClient();

// Component to handle animated routes
const AnimatedRoutes = () => {
  const location = useLocation(); // Get location

  return (
    <AnimatePresence mode="wait"> {/* Wrap Routes */}
      <Routes location={location} key={location.pathname}> {/* Pass location and key */}
        <Route path="/" element={<Home />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/Questionnaire" element={<CareerQuestionnaire/>} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Sonner position="bottom-left" /> {/* Use Sonner for toast */}
            <BrowserRouter>
              <ScrollToTop />
              <AnimatedRoutes /> {/* Use the new component */}
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
