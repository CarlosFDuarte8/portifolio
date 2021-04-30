import React from "react";
import imageOverlay from "../img/earth.jpg";


const Footer: React.FC = () => {
  return (
    <section
        className="paralax-mf footer-paralax bg-image sect-mt4 route"
        style={{ backgroundImage: "url(" + imageOverlay + ")" }}
      >
<footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="copyright-box">
                  <p>Desenvolvido por mim... </p>
                  <p>© 2021 – Carlos Duarte. Todos os direitos reservados </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        </section>
  );

}

export default Footer;