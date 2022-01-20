import "./App.css";
import Login from "./Login/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Register/register";
import { Navigate } from "react-router-dom";
import Home from "./Home/home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
