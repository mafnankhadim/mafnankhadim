import { marqueeItems } from "../data/content.js";
import "../styles/marquee.css";

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      {/* The track holds the list twice. The animation translates it by exactly
          -50%, so the second copy lands where the first began and the loop is
          seamless. Duplicating in markup (rather than animating two elements)
          keeps it to a single transform. */}
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul className="marquee-row" key={copy}>
            {marqueeItems.map((item) => (
              <li key={item}>
                <span className="marquee-dot" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
