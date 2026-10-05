import Media from "./Media";
const cards = [
  {
    title: "01 / STRUCTURE",
    text: "Start with clear content, a considered layout and a responsive foundation.",
  },
  {
    title: "02 / INTERACTION",
    text: "Give every movement a purpose. Use timing, hierarchy and feedback to guide the experience.",
  },
  {
    title: "03 / REFINEMENT",
    text: "Refine the details across screen sizes, keyboard navigation and reduced-motion preferences.",
  },
];
export default function Craft() {
  return (
    <section
      id="approach"
      className="craft-section shell"
      aria-labelledby="craft-title"
    >
      <span className="eyebrow">[ THE APPROACH ]</span>
      <h2 id="craft-title">
        <span>DETAILS</span>
        <span>MAKE THE</span>
        <span>DIFFERENCE.</span>
      </h2>
      <div className="craft-cards">
        {cards.map((card, index) => (
          <article
            className="craft-card"
            key={card.title}
            style={{ zIndex: index + 1 }}
          >
            <span className="craft-number">{index + 1}</span>
            <p>{card.text}</p>
            <div className="craft-person">
              <Media file="avatar.webp" alt="" width="192" height="192" />
              <span>
                {card.title}
                <br />
                <small>Creative development approach</small>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
