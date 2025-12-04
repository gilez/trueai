import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import Faculty from './pages/Faculty';
import Research from './pages/Research';
import SubPage from './pages/SubPage';

function App() {
  // Default to dark mode
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/greeting" element={<SubPage type="greeting" />} />
          <Route path="/about/vision" element={<SubPage type="vision" />} />
          <Route path="/research" element={<Research />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
