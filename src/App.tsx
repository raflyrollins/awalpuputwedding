import { useCallback, useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import Gallery from "./components/Gallery";
import Gift from "./components/Gift";
import Messages from "./components/Messages";
import Footer from "./components/Footer";
import "./App.css";

const QUOTE =
  '"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."';
const QUOTE_SOURCE = "— QS. Ar-Rum: 21";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [invitationOpen, setInvitationOpen] = useState(false);

  const openInvitation = useCallback(() => {
    setOpened(true);
    setTimeout(() => setInvitationOpen(true), 800);
  }, []);

  useEffect(() => {
    if (invitationOpen) {
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [invitationOpen]);

  if (!opened) {
    return (
      <div className="cover">
        <div className="cover__content">
          <p className="cover__invite">Undangan Pernikahan</p>
          <h1 className="cover__names">
            <span className="cover__name">Awal</span>
            <span className="cover__ampersand">&amp;</span>
            <span className="cover__name">Puput</span>
          </h1>
          <p className="cover__fullnames">
            Awaludin Nur Syawal &amp; Puput Auliyah Zumba
          </p>
          <p className="cover__date">28 Juni 2026</p>
          <button className="cover__btn" onClick={openInvitation}>
            Buka Undangan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${invitationOpen ? "app--open" : ""}`}>
      <nav className="nav">
        <a href="#hero" className="nav__item">
          Home
        </a>
        <a href="#event" className="nav__item">
          Acara
        </a>
        <a href="#gallery" className="nav__item">
          Galeri
        </a>
        <a href="#gift" className="nav__item">
          Hadiah
        </a>
        <a href="#messages" className="nav__item">
          Ucapan
        </a>
      </nav>

      <main>
        <Hero />
        <section className="quote-section">
          <div className="quote-section__inner">
            <p className="quote-section__text">{QUOTE}</p>
            <p className="quote-section__source">{QUOTE_SOURCE}</p>
          </div>
        </section>
        <EventDetails />
        <Gallery />
        <Gift />
        <Messages />
      </main>

      <Footer />

      <AudioPlayer play={invitationOpen} />
    </div>
  );
}
