import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";
import { bannerRoles as words, CV_URL } from "../data/content.js";

export default function Banner() {
  const [index, setIndex] = useState(0);

  // Rotate the headline words (replaces the jQuery text-rotator plugin).
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="tcd-banner" className="tcd-banner freelancer">
      <div className="banner-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Reveal className="banner-content" direction="up">
                <h4>Hello!</h4>
                <h1>I'm M Afnan Khadim</h1>
                <h3 className="cd-headline clip">
                  <span className="cd-words-wrapper">
                    {words.map((word, i) => (
                      <b key={word} className={i === index ? "is-visible" : ""}>
                        {word}
                      </b>
                    ))}
                  </span>
                </h3>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-btn"
                >
                  Download CV
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
