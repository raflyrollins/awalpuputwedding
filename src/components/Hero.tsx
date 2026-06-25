import { useState, useEffect } from "react";
import "./Hero.css";

const WEDDING_DATE = new Date("2026-06-28T11:00:00+07:00");

function calcTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero hero--mounted">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__invite">Undangan Pernikahan</p>
        <h1 className="hero__names">
          <span className="hero__name">Awaludin</span>
          <span className="hero__ampersand">&amp;</span>
          <span className="hero__name">Puput</span>
        </h1>
        <p className="hero__fullnames">
          Awaludin Nur Syawal &amp; Puput Auliyah Zumba
        </p>
        <div className="hero__divider">✦</div>
        <p className="hero__date">Minggu, 28 Juni 2026</p>
        <p className="hero__time">Pukul 11:00 WIB</p>

        <div className="countdown">
          <div className="countdown__item">
            <span className="countdown__num">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="countdown__label">Hari</span>
          </div>
          <span className="countdown__sep">:</span>
          <div className="countdown__item">
            <span className="countdown__num">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="countdown__label">Jam</span>
          </div>
          <span className="countdown__sep">:</span>
          <div className="countdown__item">
            <span className="countdown__num">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="countdown__label">Menit</span>
          </div>
          <span className="countdown__sep">:</span>
          <div className="countdown__item">
            <span className="countdown__num">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="countdown__label">Detik</span>
          </div>
        </div>
      </div>
    </section>
  );
}
