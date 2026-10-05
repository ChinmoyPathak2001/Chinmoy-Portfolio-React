import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { assetUrl } from "../config/media";

export default function ProjectMedia({ project }) {
  const video = useRef(null);
  const host = useRef(null);
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element || reduceMotion || navigator.connection?.saveData) return;
    let active = false;
    let disposed = false;
    const update = () => {
      if (active && !document.hidden) {
        if (!element.getAttribute("src")) {
          element.src = assetUrl(`videos/${project.id}.mp4`);
          element.load();
        }
        element
          .play()
          .then(() => {
            if (disposed || !active || document.hidden) element.pause();
          })
          .catch(() => {});
      } else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (disposed) return;
        active = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    observer.observe(host.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      element.pause();
    };
  }, [project.id, reduceMotion]);
  return (
    <div
      ref={host}
      className="project-media"
      style={{ "--project-color": project.color }}
    >
      <img
        className="showcase-backdrop"
        src={assetUrl(`work/${project.poster}`)}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <span className="showcase-label" aria-hidden="true">
        {project.name} / SELECTED WORK
      </span>
      <div className="showcase-window">
        <img
          className="showcase-poster"
          src={assetUrl(`work/${project.poster}`)}
          alt={`${project.name} website preview`}
          loading="lazy"
          width="1440"
          height="720"
        />
        <video
          ref={video}
          className={playing ? "showcase-video is-playing" : "showcase-video"}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onError={() => setPlaying(false)}
        />
      </div>
      <span className="showcase-caption" aria-hidden="true">
        {project.type}
        <span>↗</span>
      </span>
    </div>
  );
}
