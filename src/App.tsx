import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePreview from "./pages/HomePage";
import OOPLesson1 from "./pages/modules/oop/Lesson1/Lesson1";
import LearningHub from "./pages/LearningHub";
import QuizSimulation from "./pages/modules/oop/Lesson1/quiz/QuizSimulation";
import AuthPage from "./pages/AuthPage";
import AuthSuccess from "./pages/AuthSuccess";

import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";
import RankingPage from "./pages/RankingPage";

const isProduction = true; // manually control

if (isProduction) {
  const noop = () => {};

  console.log = noop;
  console.info = noop;
  console.debug = noop;
  console.warn = noop;
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC AUTH */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } 
        />

        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* HOME (optional public) */}
        <Route path="/" element={<HomePreview />} />

        
        <Route 
          path="/ranking" 
          element={
            <PublicRoute>
              <RankingPage />
            </PublicRoute>
          } 
        />

        <Route 
          path="/oop/lesson-1" 
          element={
            <ProtectedRoute>
              <OOPLesson1 />
            </ProtectedRoute>
          } 
        />

        
        <Route 
          path="/learn" 
          element={
            <ProtectedRoute>
              <LearningHub />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/oop/quiz" 
          element={
            <ProtectedRoute>
              <QuizSimulation />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}