interface Props {
  id: string;
  lines: string[];
}

/** Big section title. Each line rises out of a mask when scrolled into view (see useScrollReveals). */
export default function SectionHeading({ id, lines }: Props) {
  return (
    <h2 id={id} className="heading">
      {lines.map((line) => (
        <span className="mask" key={line}>
          <span data-rise>{line}</span>
        </span>
      ))}
    </h2>
  );
}
