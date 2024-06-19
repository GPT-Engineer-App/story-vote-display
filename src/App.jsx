import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Navbar from "./components/Navbar.jsx"; // Import the Navbar component
import Footer from "./components/Footer.jsx"; // Import the Footer component
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Maps from "./pages/Maps.jsx"; // Import the Maps component

function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar component */}
      <Routes>
        <Route exact path="/" element={<Index />} />
      {/* Add routes for Top Stories and About pages */}
        <Route path="/top-stories" element={<Index />} />
        <Route path="/about" element={<div>About Page</div>} />
      <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/maps" element={<Maps />} /> {/* Add route for Maps page */}
      </Routes>
      <Footer /> {/* Add the Footer component */}
    </Router>
  );
}

export default App;
