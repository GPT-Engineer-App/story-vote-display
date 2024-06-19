import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Navbar from "./components/Navbar.jsx"; // Import the Navbar component

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar component */}
      <Routes>
        <Route exact path="/" element={<Index />} />
      {/* Add routes for Top Stories and About pages */}
        <Route path="/top-stories" element={<Index />} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
