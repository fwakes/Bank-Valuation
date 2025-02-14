import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BankingValuation from "./BankingValuation";
import CAGRCalculator from "./CAGR";
import DCFCalculator from "./DCF";  // ✅ Import DCF Page

export default function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <div style={navBarStyle}>
        <Link to="/" style={navLinkStyle}>📊 Banking Valuation</Link>
        <Link to="/cagr" style={navLinkStyle}>📈 CAGR Calculator</Link>
        <Link to="/dcf" style={navLinkStyle}>💰 DCF Calculator</Link>
      </div>

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<BankingValuation />} />
        <Route path="/cagr" element={<CAGRCalculator />} />
        <Route path="/dcf" element={<DCFCalculator />} />  {/* ✅ Added DCF Route */}
      </Routes>
    </Router>
  );
}

// 🖌 Navigation Bar Styling
const navBarStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "15px",
  background: "#007bff",
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "bold"
};
