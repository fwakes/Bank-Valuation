import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BBRIValuation() {
  const [roe, setRoe] = useState(19.0);
  const [coE, setCoE] = useState(14.0);
  const [growth, setGrowth] = useState(5.0);
  const [equity, setEquity] = useState(314485);
  const [shares, setShares] = useState(151.56);
  const [price, setPrice] = useState(4030);

  const pbv = (roe - growth) / (coE - growth);
  const intrinsicValue = pbv * equity;
  const intrinsicPerShare = intrinsicValue / shares;
  const buyPrice = intrinsicPerShare * 0.75;
  const priceAsValue = (price / intrinsicPerShare) * 100;

  return (
    <div className="p-6">
      <Card className="w-full max-w-md mx-auto p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">BBRI Valuation</h2>
          <div className="space-y-2">
            <label>ROE (%)</label>
            <Input type="number" value={roe} onChange={(e) => setRoe(parseFloat(e.target.value))} />
            <label>CoE (%)</label>
            <Input type="number" value={coE} onChange={(e) => setCoE(parseFloat(e.target.value))} />
            <label>Growth (%)</label>
            <Input type="number" value={growth} onChange={(e) => setGrowth(parseFloat(e.target.value))} />
            <label>Equity (miliar)</label>
            <Input type="number" value={equity} onChange={(e) => setEquity(parseFloat(e.target.value))} />
            <label>Shares Outstanding (miliar)</label>
            <Input type="number" value={shares} onChange={(e) => setShares(parseFloat(e.target.value))} />
            <label>Price Now</label>
            <Input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
          </div>
          <div className="mt-4">
            <p>PBV: {pbv.toFixed(2)}</p>
            <p>Intrinsic Value: {intrinsicValue.toLocaleString()} miliar</p>
            <p>Intrinsic Value per Share: {intrinsicPerShare.toFixed(2)}</p>
            <p>Buy Price (After MoS - 25%): {buyPrice.toFixed(2)}</p>
            <p>Price as % of Value: {priceAsValue.toFixed(1)}%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
