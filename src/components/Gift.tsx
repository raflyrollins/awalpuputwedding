import { useState } from "react";
import "./Gift.css";

export default function Gift() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <section className="gift" id="gift">
      <h2 className="section-title">Hadiah &amp; Doa</h2>
      <p className="section-subtitle">
        Doa restu Anda adalah hadiah terbaik. Namun jika ingin memberi tanda
        kasih, berikut kami sampaikan:
      </p>

      <div className="gift__cards">
        <div className="gift__card">
          <div className="gift__icon">💳</div>
          <h3 className="gift__bank">Bank BRI</h3>
          <p className="gift__name">Puput Auliyah Zumba</p>
          <div className="gift__number">
            <span>002401075892503</span>
            <button
              className="gift__copy"
              onClick={() => copy("002401075892503", "bri")}
            >
              {copied === "bri" ? "✓ Tersalin" : "Salin"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
