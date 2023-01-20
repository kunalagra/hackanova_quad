import { Route, Routes } from "react-router-dom";
import Signup from "./webPages/Signup/Signup";
import Sidebar from "./Components/Sidebar";
import Login from "./webPages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Sidebar />}/>
      </Routes>
    </div>
  );
}

export default App;
