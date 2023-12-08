import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AuthProvider } from "./providers";
import { Layout } from "./components";

import {
  Admissions,
  Events,
  Calendar,
  News,
  Contact,
  AtlasQuiz,
  Newsletter,
} from "./pages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<></>} />
            <Route path="/admission" element={<Admissions />} />
            <Route path="/atlas-quiz" element={<AtlasQuiz />} />
            <Route path="/events" element={<Events />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/news" element={<News />} />
            <Route path="/newsletter" element={<Newsletter />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/admission" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
