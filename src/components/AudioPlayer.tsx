import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const REFF_START = 15;
const REFF_END = 100;

export default function AudioPlayer({ play }: { play: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !play) return;

    const onEnded = () => {
      audio.currentTime = REFF_START;
      audio.play();
    };

    const onTimeUpdate = () => {
      if (audio.currentTime >= REFF_END) {
        audio.currentTime = REFF_START;
      }
    };

    audio.loop = false;
    audio.currentTime = REFF_START;

    const start = () => {
      const p = audio.play();
      setPlaying(true);
      if (p && typeof p.catch === "function") {
        p.catch(() => {});
      }
    };

    const onFirstInteraction = () => {
      start();
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
    };

    document.addEventListener("click", onFirstInteraction);
    document.addEventListener("touchstart", onFirstInteraction);

    start();

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      document.removeEventListener("click", onFirstInteraction);
      document.removeEventListener("touchstart", onFirstInteraction);
      audio.pause();
    };
  }, [play]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.currentTime = REFF_START;
      audio.play();
      setPlaying(true);
    }
  };

  return (
    <div className={`audio ${playing ? "audio--on" : ""}`}>
      <audio ref={audioRef} src="/music.mp3" preload="auto" />
      <button
        className="audio__btn"
        onClick={toggle}
        aria-label={playing ? "Matikan musik" : "Putar musik"}
      >
        <span className="audio__icon">♪</span>
        <div className="audio__bars">
          <span />
          <span />
          <span />
          <span />
        </div>
      </button>
    </div>
  );
}
