import './App.css';
import Login from './Login/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Register  from './Register/register';
import { Navigate } from "react-router-dom";

function App() {
  return (
<Router>
      <div>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/welcome" element={<Welcome />} /> */}
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
