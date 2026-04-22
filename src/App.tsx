import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePreview from "./pages/HomePage";
// import HomePage from "./pages/HomePage";
import OOPLesson1 from "./pages/modules/oop/Lesson1/Lesson1";
import LearningHub from "./pages/LearningHub";
import QuizSimulation from "./pages/modules/oop/Lesson1/quiz/QuizSimulation";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomePreview />} />

        {/* HUB */}
        <Route path="/learn" element={<LearningHub />} />

        {/* OOP MODULE */}
        <Route path="/oop/lesson-1" element={<OOPLesson1 />} />
        {/* SIMULATION QUIZ */}
        <Route path="/oop/quiz" element={<QuizSimulation />} />

      </Routes>
    </BrowserRouter>
  );
}