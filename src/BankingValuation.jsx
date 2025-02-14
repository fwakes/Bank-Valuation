import { useState } from "react";

export default function BankingValuation() {
  const [roe, setRoe] = useState("");
  const [coE, setCoE] = useState("");
  const [growth, setGrowth] = useState("");
  const [equity, setEquity] = useState("");
  const [shares, setShares] = useState(""); // Keep as a string for input
  const [price, setPrice] = useState("");

  const pbv = (roe - growth) / (coE - growth);
  const intrinsicValue = Math.round(pbv * equity); // No decimals
  const intrinsicPerShare = Math.round(intrinsicValue / parseFloat(shares || 1)); // Ensure shares is parsed correctly
  const buyPrice = Math.round(intrinsicPerShare * 0.75); // Fix NaN issue
  const priceAsValue = (price / intrinsicPerShare) * 100;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Banking Valuation</h1>

      {/* Input Form */}
      <div style={formStyle}>
        <label>ROE (%)</label>
        <input type="number" value={roe} onChange={(e) => setRoe(parseFloat(e.target.value))} style={inputStyle} />

        <label>CoE (%)</label>
        <input type="number" value={coE} onChange={(e) => setCoE(parseFloat(e.target.value))} style={inputStyle} />

        <label>Growth (%)</label>
        <input type="number" value={growth} onChange={(e) => setGrowth(parseFloat(e.target.value))} style={inputStyle} />

        <label>Equity (miliar)</label>
        <input
          type="text"
          value={equity.toLocaleString()}
          onChange={(e) => setEquity(parseFloat(e.target.value.replace(/,/g, '')) || "")}
          style={inputStyle}
        />

        <label>Shares Outstanding (miliar)</label>
        <input
          type="text"
          value={shares}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*\.?\d*$/.test(val)) { // Allow only numbers and decimals
              setShares(val);
            }
          }}
          style={inputStyle}
        />

        <label>Price Now</label>
        <input
          type="text"
          value={price.toLocaleString()}
          onChange={(e) => setPrice(parseFloat(e.target.value.replace(/,/g, '')) || "")}
          style={inputStyle}
        />
      </div>

      {/* Results Section */}
      <div style={resultStyle}>
        <p><strong>PBV:</strong> <span style={highlightStyle}>{pbv.toFixed(2)}</span></p>
        <p><strong>Intrinsic Value:</strong> <span style={highlightStyle}>{intrinsicValue.toLocaleString()} miliar</span></p>
        <p><strong>Intrinsic Value per Share:</strong> <span style={highlightStyle}>{intrinsicPerShare.toLocaleString()}</span></p>
        <p><strong>Buy Price (After MoS - 25%):</strong> <span style={highlightStyle}>{buyPrice.toLocaleString()}</span></p>
        <p><strong>Price as % of Value:</strong> <span style={priceAsValue > 100 ? overvaluedStyle : undervaluedStyle}>
          {priceAsValue.toFixed(1)}%
        </span></p>
      </div>
    </div>
  );
}

// 🖌 Styling Objects (Updated Font Size to 16px)
const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  fontFamily: "Calibri, sans-serif",
  fontSize: "16px"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
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

const resultStyle = {
  marginTop: "20px",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f9f9f9"
};

const highlightStyle = {
  fontWeight: "bold",
  color: "#007bff"
};

const overvaluedStyle = {
  fontWeight: "bold",
  color: "red"
};

const undervaluedStyle = {
  fontWeight: "bold",
  color: "green"
};
