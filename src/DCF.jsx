import { useState } from "react";
import { Link } from "react-router-dom";

export default function DCFCalculator() {
  const [fcf, setFcf] = useState("");
  const [growthRate, setGrowthRate] = useState("");
  const [terminalGrowth, setTerminalGrowth] = useState("");
  const [wacc, setWacc] = useState("");
  const [sharesOutstanding, setSharesOutstanding] = useState(""); // New input
  const [results, setResults] = useState(null);

  const calculateDCF = () => {
    let fcfValues = [];
    let presentValues = [];
    let discountFactors = [];
    let totalPV = 0;

    // ✅ Calculate Growth Rates for Years 6-10 (Step Down)
    const stepDown = (growthRate - terminalGrowth) / 5;
    let growthRates = [
      growthRate,
      growthRate,
      growthRate,
      growthRate,
      growthRate,
      growthRate - stepDown * 1,
      growthRate - stepDown * 2,
      growthRate - stepDown * 3,
      growthRate - stepDown * 4,
      growthRate - stepDown * 5,
    ];

    // ✅ Calculate FCF for Years 1-10
    fcfValues[0] = fcf * (1 + growthRates[0] / 100);
    for (let i = 1; i < 10; i++) {
      fcfValues[i] = fcfValues[i - 1] * (1 + growthRates[i] / 100);
    }

    // ✅ Calculate Present Value (Discounting)
    for (let i = 0; i < 10; i++) {
      discountFactors.push(1 / Math.pow(1 + wacc / 100, i + 1));
      presentValues.push(fcfValues[i] * discountFactors[i]);
      totalPV += presentValues[i];
    }

    // ✅ Terminal Value Calculation
    const terminalValue = (fcfValues[9] * (1 + terminalGrowth / 100)) / (wacc / 100 - terminalGrowth / 100);
    const pvTerminalValue = terminalValue / Math.pow(1 + wacc / 100, 10);

    // ✅ Enterprise Value Calculation
    const enterpriseValue = totalPV + pvTerminalValue;

    // ✅ Intrinsic Value Per Share Calculation
    const ivPerShare = enterpriseValue / sharesOutstanding;

    setResults({
      growthRates,
      fcfValues,
      presentValues,
      totalPV,
      terminalValue,
      pvTerminalValue,
      enterpriseValue,
      ivPerShare,
    });
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Discounted Cash Flow (DCF) Calculator</h1>

      <div style={formStyle}>

      <label>FCF (million)</label>
<input
  type="text"
  value={fcf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Adds comma separator dynamically
  onChange={(e) => {
    let rawValue = e.target.value.replace(/,/g, ""); // Remove commas before storing
    if (/^\d*\.?\d*$/.test(rawValue)) { // Allow valid numbers with decimals
      setFcf(rawValue);
    }
  }}
  onBlur={() => setFcf(parseFloat(fcf).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
  style={inputStyle}
/>


        <label>Growth Rate (1-5 years) %</label>
        <input type="number" value={growthRate} onChange={(e) => setGrowthRate(parseFloat(e.target.value))} style={inputStyle} />

        <label>Terminal Growth %</label>
        <input type="number" value={terminalGrowth} onChange={(e) => setTerminalGrowth(parseFloat(e.target.value))} style={inputStyle} />

        <label>Discount Rate (WACC) %</label>
        <input type="number" value={wacc} onChange={(e) => setWacc(parseFloat(e.target.value))} style={inputStyle} />

        <label>Shares Outstanding (million)</label>
<input
  type="text"
  value={sharesOutstanding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} // Adds comma separator dynamically
  onChange={(e) => {
    let rawValue = e.target.value.replace(/,/g, ""); // Remove commas for input
    if (/^\d*\.?\d*$/.test(rawValue)) { // Allow valid numbers with decimals
      setSharesOutstanding(rawValue);
    }
  }}
  onBlur={() => setSharesOutstanding(parseFloat(sharesOutstanding).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
  style={inputStyle}
/>

        <button onClick={calculateDCF} style={buttonStyle}>Calculate Enterprise Value</button>
      </div>

      {results && (
        <div style={outputStyle}>
          {/* ✅ Growth Rate Breakdown Table */}
          <h2>Growth Rate Breakdown</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Year</th>
                <th style={tableHeaderStyle}>Growth Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {results.growthRates.map((rate, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>Year {index + 1}</td>
                  <td style={tableCellStyle}>{rate.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Step 1: Earnings for Years 1-10 */}
          <h2>Step 1: Earnings from Year 1-10</h2>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Year</th>
                <th style={tableHeaderStyle}>FCF (million)</th>
                <th style={tableHeaderStyle}>Present Value</th>
              </tr>
            </thead>
            <tbody>
              {results.fcfValues.map((fcf, index) => (
                <tr key={index}>
                  <td style={tableCellStyle}>Year {index + 1}</td>
                  <td style={tableCellStyle}>{fcf.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td style={tableCellStyle}>{results.presentValues[index].toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={highlightStyle}>
            Total PV (Step 1): {results.totalPV.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} million
          </h3>

          {/* ✅ Step 2: Terminal Value */}
          <h2>Step 2: Terminal Value Calculation</h2>
          <p><strong style={highlightStyle}>Terminal Value:</strong> {results.terminalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })} million</p>
          <p><strong style={highlightStyle}>PV of Terminal Value:</strong> {results.pvTerminalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} million</p>

          {/* ✅ Step 3: Enterprise Value */}
          <h2>Step 3: Enterprise Value Calculation</h2>
          <p><strong style={highlightStyle}>Enterprise Value:</strong> {results.enterpriseValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} million</p>

          {/* ✅ Step 5: Intrinsic Value Per Share */}
          <h2>Step 5: Intrinsic Value Per Share</h2>
          <p><strong style={highlightStyle}>IV Per Share:</strong> {results.ivPerShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      )}

      <Link to="/" style={linkStyle}>🔙 Back to Home</Link>
    </div>
  );
}

// 🖌 Styling Fixes
const containerStyle = { maxWidth: "700px", margin: "auto", fontFamily: "Calibri, sans-serif", fontSize: "16px", textAlign: "center" };
const titleStyle = { fontSize: "22px", fontWeight: "bold", marginBottom: "20px" };
const formStyle = { display: "grid", gap: "10px", background: "#f9f9f9", padding: "20px", borderRadius: "10px" };
const inputStyle = { padding: "10px", width: "100%", border: "1px solid #ccc", borderRadius: "5px", fontSize: "16px", textAlign: "center" };
const buttonStyle = { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" };
const outputStyle = { marginTop: "20px", textAlign: "left" };
const tableStyle = { width: "80%", margin: "20px auto", borderCollapse: "collapse", textAlign: "center" };
const tableHeaderStyle = { fontWeight: "bold", backgroundColor: "#f1f1f1", padding: "10px" };
const tableCellStyle = { padding: "10px", borderBottom: "1px solid #ddd" };
const highlightStyle = { backgroundColor: "#f1f8ff", padding: "5px 10px", borderRadius: "5px", fontWeight: "bold" };
const linkStyle = { display: "block", marginTop: "20px", textDecoration: "none", color: "#007bff", fontWeight: "bold" };
