import { useEffect, useRef, useState } from "react";
import { contactEmail as email } from "../config/contact";
export default function CopyEmail() {
  const [status, setStatus] = useState("Click to copy");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied!");
    } catch {
      setStatus("Copy unavailable — open email");
      window.location.href = `mailto:${email}`;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("Click to copy"), 2400);
  }
  return (
    <button
      type="button"
      className="header-contact copy-email"
      onClick={copy}
      aria-label={`Copy email address ${email}`}
    >
      <span>{email}</span>
      <span className="email-tooltip" role="status">
        {status}
      </span>
    </button>
  );
}
