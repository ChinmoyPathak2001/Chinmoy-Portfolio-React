import CopyEmail from "./CopyEmail";
export default function Header() {
  return (
    <header className="header shell">
      <a className="wordmark" href="#home" aria-label="Chinmoy Pathak home">
        CHINMOY
        <br />P<span className="logo-square">A</span>THAK
      </a>
      <CopyEmail />
    </header>
  );
}
