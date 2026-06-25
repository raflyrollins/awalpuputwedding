import { useEffect, useRef, useState } from "react";
import "./EventDetails.css";

export default function EventDetails() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`event ${visible ? "event--visible" : ""}`}
      id="event"
    >
      <div className="event__inner">
        <h2 className="section-title">Acara Pernikahan</h2>
        <p className="section-subtitle">
          Dengan memohon rahmat dan ridha Allah SWT
        </p>

        <div className="event__cards">
          <div className="event__card">
            <div className="event__ornament">❀</div>
            <h3 className="event__card-title">Akad Nikah</h3>
            <p className="event__name">Awaludin Nur Syawal</p>
            <p className="event__and">&</p>
            <p className="event__name">Puput Auliyah Zumba</p>
            <p className="event__detail">Minggu, 28 Juni 2026</p>
            <p className="event__detail">Pukul 09:00 WIB</p>
            <p className="event__detail event__detail--light">
              Kediaman Mempelai Wanita
            </p>
            <p className="event__address">
              Jl. Perwira, Kelurahan Kota Ratu, <br />Lingkungan Onewitu
              <br />(Lapangan SMK Tarbiyah Ende)
            </p>
            <div className="event__ornament">❀</div>
          </div>

          <div className="event__card">
            <div className="event__ornament">❀</div>
            <h3 className="event__card-title">Resepsi</h3>
            <p className="event__name">Awaludin Nur Syawal</p>
            <p className="event__and">&</p>
            <p className="event__name">Puput Auliyah Zumba</p>
            <p className="event__detail">Minggu, 28 Juni 2026</p>
            <p className="event__detail">Pukul 11:00 WIB</p>
            <p className="event__detail event__detail--light">
              Kediaman Mempelai Wanita
            </p>
            <p className="event__address">
              Jl. Perwira, Kelurahan Kota Ratu, <br />Lingkungan Onewitu
              <br />(Lapangan SMK Tarbiyah Ende)
            </p>
            <div className="event__ornament">❀</div>
          </div>
        </div>

        <div className="event__info">
          <p className="event__info-text">
            Merupakan suatu kehormatan dan kebahagiaan apabila
            Bapak/Ibu/Saudara/i berkenan hadir memberikan doa restu.
          </p>
        </div>
      </div>
    </section>
  );
}
