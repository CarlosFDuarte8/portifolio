import React from "react";
import imageOverlay from "../img/earth.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

class Contact extends React.Component {
  render() {
    return (
      <section
        className="paralax-mf footer-paralax bg-image sect-mt4 route"
        style={{ backgroundImage: "url(" + imageOverlay + ")" }}
      >
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="contact-mf">
                <div id="contact" className="box-shadow-full">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="title-box-2">
                        <h5 className="title-left"> Preencha o formulario</h5>
                      </div>
                      <div>
                        <form
                          action="https://formspree.io/f/mpzovejy"
                          method="POST"
                          className="contactForm"
                        >
                          <div id="sendmessage">
                            Sua mensagem fou recebida, logo entrarei em contato.
                            Obrigado!
                          </div>
                          <div id="errormessage"></div>
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  id="name"
                                  placeholder="Seu nome"
                                  data-rule="minlen:4"
                                  data-msg="Entre com seu nome, por favor"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  id="email"
                                  placeholder="Seu e-mail"
                                  data-rule="email"
                                  data-msg="Por favor, digite seu e-mail."
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="subject"
                                  id="subject"
                                  placeholder="Assunto"
                                  data-rule="minlen:4"
                                  data-msg="Ops... Coloque um assunto, por favor!"
                                />
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <textarea
                                  className="form-control"
                                  name="message"
                                  data-rule="required"
                                  data-msg="Ops, Não deixe de escrever uma mensagem, grato!"
                                  placeholder="Mensagem"
                                ></textarea>
                                <div className="validation"></div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <button
                                type="submit"
                                className="button button-a button-big button-rouded"
                              >
                                Enviar Mensagem
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="title-box-2 pt-4 pt-md-0">
                        <h5 className="title-left">Entrar em contato</h5>
                      </div>
                      <div className="more-info">
                        <p className="lead">
                          Deixe seu recado, ou mande um e-mail:{" "}
                          <a href="mailto:carlosf.duarte8@gmail.com">
                            carlosf.duarte8@gmail.com
                          </a>
                          .
                          <br />
                          Basta preencher o formulário ou enviar-me um e-mail.
                        </p>
                        {/* <!-- <ul class="list-ico">
                                <li><span class="ion-ios-location"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
                                <li><span class="ion-ios-telephone"></span> (617) 557-0089</li>
                                <li><span class="ion-email"></span> contact@example.com</li>
                                </ul> --> */}
                      </div>
                      <div className="socials">
                        <ul>
                          <li>
                            <a
                              href=""
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ico-circle">
                                <FontAwesomeIcon icon={faGithub} />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ico-circle">
                                <FontAwesomeIcon icon={faLinkedin} />
                              </span>
                            </a>
                          </li>
                          <li>
                            <a
                              href=""
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="ico-circle">
                                <FontAwesomeIcon icon={faEnvelope} />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
