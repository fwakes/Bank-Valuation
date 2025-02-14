import { useState } from "react";
import { Link } from "react-router-dom";

export default function CAGRCalculator() {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [cagr, setCagr] = useState(null);

  const calculateCAGR = () => {
    const years = parseFloat(endYear) - parseFloat(startYear);
    if (years > 0 && parseFloat(startValue.replace(/,/g, "")) > 0 && parseFloat(endValue.replace(/,/g, "")) > 0) {
      const result = ((Math.pow(parseFloat(endValue.replace(/,/g, "")) / parseFloat(startValue.replace(/,/g, "")), 1 / years) - 1) * 100).toFixed(2);
      setCagr(result);
    } else {
      setCagr("Invalid Input");
    }
  };

  // ✅ Function to format numbers with commas while typing
  const formatNumber = (value) => {
    if (!value) return "";
    const parts = value.replace(/,/g, "").split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>CAGR Calculator</h1>

      <div style={formStyle}>
        <label>Year Start</label>
        <input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} style={inputStyle} />

        <label>Year End</label>
        <input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} style={inputStyle} />

        <label>Starting Value</label>
        <input
          type="text"
          value={formatNumber(startValue)}
          onChange={(e) => {
            const val = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(val)) { setStartValue(val); }
          }}
          style={inputStyle}
        />

        <label>Ending Value</label>
        <input
          type="text"
          value={formatNumber(endValue)}
          onChange={(e) => {
            const val = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(val)) { setEndValue(val); }
          }}
          style={inputStyle}
        />

        <button onClick={calculateCAGR} style={buttonStyle}>Calculate CAGR</button>
      </div>

      {cagr !== null && <p style={resultStyle}><strong>CAGR:</strong> {cagr}%</p>}

      <Link to="/" style={linkStyle}>🔙 Back to Banking Valuation</Link>
    </div>
  );
}

// 🖌 Styling
const containerStyle = {
  maxWidth: "500px",
  margin: "auto",
  fontFamily: "Calibri, sans-serif",
  fontSize: "16px",
  textAlign: "center"
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold"
};

const formStyle = {
  display: "grid",
  gap: "10px",
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px"
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px"
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px"
};

const resultStyle = {
  marginTop: "20px",
  fontSize: "18px",
  fontWeight: "bold"
};

const linkStyle = {
  display: "block",
  marginTop: "20px",
  textDecoration: "none",
  color: "#007bff",
  fontWeight: "bold"
};
