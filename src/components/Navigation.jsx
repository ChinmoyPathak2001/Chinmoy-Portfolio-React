import { gmailComposeUrl } from "../config/contact";
import Media from "./Media";
import { motion, useReducedMotion } from "framer-motion";

export default function Navigation() {
  const reduceMotion = useReducedMotion();
  return (
    <nav className="floating-nav" aria-label="Main navigation">
      <motion.a
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.2 }}
        href="#projects"
      >
        Projects
      </motion.a>
      <motion.a
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.2 }}
        href="#about"
      >
        About
      </motion.a>
      <motion.a
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.2 }}
        href="#archive"
      >
        Archive
      </motion.a>
      <motion.a
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="talk"
        href={gmailComposeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Let’s talk — compose an email in Gmail (opens a new tab)"
      >
        <span className="avatar" aria-hidden="true">
          <Media file="avatar.webp" alt="" width="192" height="192" />
        </span>
        <span className="talk-label">Let’s talk</span>
        <svg
          className="talk-icon"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 4h16v12H9l-5 4V4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
    </nav>
  );
}
