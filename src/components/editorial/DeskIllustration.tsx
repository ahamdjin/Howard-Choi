const objects = {
  preparation: ["file-folder", "memo"],
  estimate: ["abacus", "receipt"],
  investigation: ["spiral-calendar", "magnifying-glass-tilted-left"],
  reading: ["books", "bookmark"],
} as const;

/** Decorative still lifes accompanying the adjacent, localized explanation. */
export function DeskIllustration({ topic }: { topic: keyof typeof objects }) {
  return <div aria-hidden="true" className={`desk-illustration desk-illustration--${topic}`}>
    {objects[topic].map(name => <img key={name} src={`/editorial-images/desk/${name}.png`} width="256" height="256" loading="lazy" decoding="async" alt="" />)}
  </div>;
}
