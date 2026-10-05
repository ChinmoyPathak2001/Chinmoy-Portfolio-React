// React owns these text nodes; GSAP only changes their opacity.
export default function ScrollCopy({ as: Tag = "p", text, ...props }) {
  return (
    <Tag {...props} aria-label={text.replace(/\s+/g, " ")}>
      {text.split(/(\n|[^\S\n]+)/).map((part, index) =>
        part === "\n" ? (
          <br key={index} />
        ) : /^\s+$/.test(part) ? (
          " "
        ) : part ? (
          <span className="scroll-word" aria-hidden="true" key={index}>
            {part}
          </span>
        ) : null,
      )}
    </Tag>
  );
}
