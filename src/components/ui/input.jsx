export function Input({ value, onChange, type = "text" }) {
    return <input type={type} value={value} onChange={onChange} className="border p-2 w-full" />;
  }
  