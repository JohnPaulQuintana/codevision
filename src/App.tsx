import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePreview from "./pages/HomePage";
// import HomePage from "./pages/HomePage";
import OOPLesson1 from "./pages/modules/oop/Lesson1";
import LearningHub from "./pages/LearningHub";

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

      </Routes>
    </BrowserRouter>
  );
}