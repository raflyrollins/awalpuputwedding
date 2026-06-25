import { useEffect, useRef, useState } from "react";
import "./Gallery.css";

// Layout didasarkan pada dimensi asli foto:
// Foto 1, 5      → landscape 16:9  (span lebar)
// Foto 2         → landscape 4:3   (span medium)
// Foto 3,4,6,7,8 → portrait 3:4    (span tinggi)

const PHOTOS = [
  {
    src: "/gallery/1.jpeg",
    alt: "Rumah adat",
    span: "wide",
    label: "Rumah Adat",
  },
  {
    src: "/gallery/2.jpeg",
    alt: "Pantai dari belakang",
    span: "medium",
    label: "Tepi Pantai",
  },
  {
    src: "/gallery/3.jpeg",
    alt: "Berdua di ombak",
    span: "portrait",
    label: "Ombak",
  },
  {
    src: "/gallery/4.jpeg",
    alt: "Busana tradisional",
    span: "portrait",
    label: "Tradisional",
  },
  {
    src: "/gallery/5.jpeg",
    alt: "Lentera golden hour",
    span: "wide",
    label: "Golden Hour",
  },
  {
    src: "/gallery/6.jpeg",
    alt: "Pantai sore hari",
    span: "portrait",
    label: "Senja",
  },
  {
    src: "/gallery/7.jpeg",
    alt: "Tradisional outdoor",
    span: "portrait",
    label: "Outdoor",
  },
];

// Urutan sel dalam grid (index ke PHOTOS):
// Row 1: foto 1 (wide)   + foto 4 (portrait)
// Row 2: foto 7 + foto 3 (portrait) + foto 2 (medium)
// Row 3: foto 5 (wide)   + foto 6 (portrait)
const GRID_ORDER = [0, 3, 6, 2, 1, 4, 5];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer → stagger reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Keyboard nav untuk lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null
        );
      if (e.key === "ArrowRight")
        setLightbox((i) => (i !== null ? (i + 1) % PHOTOS.length : null));
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [lightbox]);

  // Lock scroll saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const prev = () =>
    setLightbox((i) =>
      i !== null ? (i - 1 + PHOTOS.length) % PHOTOS.length : null
    );
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % PHOTOS.length : null));

  return (
    <section
      ref={sectionRef}
      className={`gallery ${visible ? "gallery--visible" : ""}`}
      id="gallery"
    >
      <div className="gallery__header">
        <p className="gallery__eyebrow">Prewedding Gallery</p>
        <h2 className="gallery__title">Momen Sebelum Hari Bahagia</h2>
      </div>

      <div className="gallery__grid">
        {GRID_ORDER.map((photoIdx, gridPos) => {
          const photo = PHOTOS[photoIdx];
          return (
            <button
              key={gridPos}
              className={`gallery__cell gallery__cell--${photo.span}`}
              style={{ transitionDelay: `${gridPos * 80}ms` }}
              onClick={() => setLightbox(photoIdx)}
              aria-label={`Lihat foto: ${photo.alt}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="gallery__overlay" aria-hidden="true">
                <span className="gallery__label">{photo.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {lightbox !== null && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan foto"
          onClick={() => setLightbox(null)}
        >
          <button
            className="gallery__lb-close"
            onClick={() => setLightbox(null)}
            aria-label="Tutup"
          >
            ✕
          </button>

          <button
            className="gallery__lb-nav gallery__lb-nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto sebelumnya"
          >
            ‹
          </button>

          <img
            src={PHOTOS[lightbox].src}
            alt={PHOTOS[lightbox].alt}
            className="gallery__lb-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="gallery__lb-nav gallery__lb-nav--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto selanjutnya"
          >
            ›
          </button>

          <p className="gallery__lb-counter" aria-live="polite">
            {lightbox + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </section>
  );
}
