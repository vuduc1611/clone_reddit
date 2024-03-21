import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "../src/Components/Header/Header";
import { useEffect, useState } from "react";
import { LandingPage } from "./Components/LandingPage/LandingPage";
import { Login } from "./Components/Auth/Login";
import { Register } from "./Components/Auth/Register";
import { HomePage } from "./Components/HomePage/HomePage";

export default function App() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [isDesktop, setDesktop] = useState(false);
  useEffect(() => {
    const handleSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  useEffect(() => {
    if (windowSize.width > 800) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [windowSize]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {isDesktop ? (
            <>
              <Route path="/landingpage" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<HomePage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
