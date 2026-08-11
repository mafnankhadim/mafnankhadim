export default function Footer() {
  return (
    <footer className="tcd-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4">
            <div className="footer-logo">
              <img src="/images/logos/logo.webp" alt="Footer Logo" />
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <h4 className="footer-title">My Services</h4>
              <ul className="footer-menu">
                <li><a href="#tcd-services">Web Design</a></li>
                <li><a href="#tcd-services">Web Development</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="footer-widget">
              <h4 className="footer-title">Support</h4>
              <ul className="footer-menu">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Partner Program</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 d-sm-block d-md-none d-lg-block">
            <div className="footer-widget">
              <h4 className="footer-title">Quick Contact</h4>
              <ul className="footer-menu">
                <li>
                  <a href="mailto:mafnankhadim74@gmail.com">
                    mafnankhadim74@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/923333395115"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +92 333 3395115
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
