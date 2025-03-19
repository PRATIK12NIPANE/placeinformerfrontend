import { useState } from "react";

export default function Captcha({ onVerify }) {
  const [input, setInput] = useState("");
  const captchaText = "1234";

  return (
    <div>
      <p>Enter Captcha: {captchaText}</p>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => onVerify(input === captchaText)}>Verify</button>
    </div>
  );
}
