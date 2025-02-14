import { useState } from "react";

export default function BankingValuation() {
  const [roe, setRoe] = useState("19.0");
  const [coE, setCoE] = useState("14.0");
  const [growth, setGrowth] = useState("5.0");
  const [equity, setEquity] = useState("314485");
  const [shares, setShares] = useState("151.56");
  const [price, setPrice] = useState("3860");

  const pbv = (parseFloat(roe.replace(/,/g, "")) - parseFloat(growth.replace(/,/g, ""))) / 
              (parseFloat(coE.replace(/,/g, "")) - parseFloat(growth.replace(/,/g, "")));

  const intrinsicValue = Math.round(pbv * parseFloat(equity.replace(/,/g, ""))); // No decimals
  const intrinsicPerShare = Math.round(intrinsicValue / parseFloat(shares.replace(/,/g, "") || 1)); 
  const buyPrice = Math.round(intrinsicPerShare * 0.75);
  const priceAsValue = (parseFloat(price.replace(/,/g, "")) / intrinsicPerShare) * 100;

  // ✅ Function to format numbers with commas while typing
  const formatNumber = (value) => {
    if (!value) return "";
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Banking Valuation</h1>

      {/* Input Form */}
      <div style={formStyle}>
        <label>ROE (%)</label>
        <input
          type="text"
          value={formatNumber(roe)}
          onChange={(e) => {
            const val = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(val)) { setRoe(val); }
          }}
          style={inputStyle}
        />

        <label>CoE (%)</label>
        <input
          type="text"
          value={formatNumber(coE)}
          onChange={(e) => {
            const val = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(val)) { setCoE(val); }
          }}
          style={inputStyle}
        />

        <label>Growth (%)</label>
        <input
          type="text"
          value={formatNumber(growth)}
          onChange={(e) => {
            const val = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(val)) { setGrowth(val); }
          }}
          style={inputStyle}
        />

        <label>Equity (miliar)</label>
        <input
          type="text"
          value={formatNumber(equity)}
          onChange={(e) => setEquity(e.target.value.replace(/,/g, ""))}
          style={inputStyle}
        />

        <label>Shares Outstanding (miliar)</label>
        <input
          type="text"
          value={formatNumber(shares)}
          onChange={(e) => {
            const val = e.target.value.replace(/,/g, '');
            if (/^\d*\.?\d*$/.test(val)) { setShares(val); }
          }}
          style={inputStyle}
        />

        <label>Price Now</label>
        <input
          type="text"
          value={formatNumber(price)}
          onChange={(e) => setPrice(e.target.value.replace(/,/g, ""))}
          style={inputStyle}
        />
      </div>

      {/* Results Section */}
      <div style={resultStyle}>
        <p><strong>PBV:</strong> <span style={highlightStyle}>{pbv.toFixed(2)}</span></p>
        <p><strong>Intrinsic Value:</strong> <span style={highlightStyle}>{formatNumber(intrinsicValue.toString())} miliar</span></p>
        <p><strong>Intrinsic Value per Share:</strong> <span style={highlightStyle}>{formatNumber(intrinsicPerShare.toString())}</span></p>
        <p><strong>Buy Price (After MoS - 25%):</strong> <span style={highlightStyle}>{formatNumber(buyPrice.toString())}</span></p>
        <p><strong>Price as % of Value:</strong> <span style={priceAsValue > 100 ? overvaluedStyle : undervaluedStyle}>
          {priceAsValue.toFixed(1)}%
        </span></p>
      </div>
    </div>
  );
}

// 🖌 Styling Objects
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
