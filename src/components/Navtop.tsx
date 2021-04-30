import React from 'react';
import 'bootstrap-4-react';
import perfil from '../img/perfil.png'

 class Navtop extends React.Component{
     render() {
         return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
            <img
              src={perfil}
              alt="logo"
              style={{ maxWidth: "100px" }}
            />
          </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">Sobre</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contato</a>
                </li>
                
              </ul>
            </div>
          </nav>
             
         );
     }
 }

 export default Navtop;