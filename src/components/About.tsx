import React from "react";
import '../index.css'
import java from '../img/java.png'
import react from '../logo.svg'
import { Container } from "react-bootstrap/lib/Tab";

class About extends React.Component {
  
  
  render() {
    return (
      <section id="about" className="about-mf sect-pt4 route">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="box-shadow-full">
                            <div className="row">
                            <div className="col-sm-2">
                                <div className="card" style={{width: "8rem"  }}>
                                    <img className="card-img-center" src={java} alt="Card image cap" style={{ maxWidth: "80px" }}/>
                                    <div className="card-body">
                                        <h5 className="card-title">Java</h5>
                                        
                                    </div>
                                    
                                </div>
                                </div>
                                <div className="col-sm-2">
                                <div className="card" style={{width: "8rem" }}>
                                    <img className="card-img-center" src={react} alt="Card image cap" style={{ maxWidth: "100px" }}/>
                                    <div className="card-body">
                                        <h5 className="card-title">React</h5>
                                        
                                    </div>
                                    
                                </div>
                               </div>
                               <div className="col-sm-2">
                                <div className="card" style={{width: "8rem" }}>
                                    <img className="card-img-center" src={react} alt="Card image cap" style={{ maxWidth: "100px" }}/>
                                    <div className="card-body">
                                        <h5 className="card-title">Angular</h5>
                                        
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

export default About;