export function SkidComparison() {
  return (
    <figure className="skid-comparison my-8 p-5 sm:p-8">
      <figcaption className="editorial-serif text-3xl">One bend, two ways to lose grip</figcaption>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {[
          { title: "Front tires slide", description: "Understeer carries the front of the car wide of the intended turn.", angle: 12, x: 73, y: 21 },
          { title: "Rear tires slide", description: "In oversteer the rear swings outward and the nose rotates farther into the turn.", angle: -32, x: 55, y: 40 },
        ].map(({ title, description, angle, x, y }) => (
          <div key={title} className="skid-comparison__example">
            <svg viewBox="0 0 180 108" aria-hidden="true" className="h-32 w-full">
              <path d="M140 108 Q140 40 44 40 H0" fill="none" stroke="#495f63" strokeWidth="62" />
              <path d="M140 108 Q140 40 44 40 H0" fill="none" stroke="#e7e9dc" strokeDasharray="6 6" strokeWidth="2" />
              <g transform={`translate(${x} ${y}) rotate(${angle})`}>
                <rect x="-20" y="-9" width="40" height="18" rx="5" fill="#f2c66c" />
                <path d="M-13 0 L-4 -5 V5 Z" fill="#203136" />
              </g>
            </svg>
            <strong>{title}</strong><p className="mt-1 text-sm leading-6">{description}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 border-t border-white/25 pt-4 text-sm leading-6">The dashed line shows the intended path. If a slide ended in a collision, the <a className="underline underline-offset-4" href="/blogs/what-to-do-after-a-car-accident-in-california">after-crash guide</a> explains what to document next.</p>
    </figure>
  );
}
