import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      id="toTop"
      style={{ display: visible ? "block" : "none" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i className="fa fa-rocket"></i>
    </div>
  );
}
