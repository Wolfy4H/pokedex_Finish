import react from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Pokemon from "./components/Pokemon";
import notFound from "./components/NotFound";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Pokemon />} />
        <Route path="*" element={<notFound />} />
      </Routes>
    </div>
  );
};
export default App;
