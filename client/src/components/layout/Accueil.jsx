import React, { Component } from 'react';
import Header from "./Header";
import Atelier from "./Atelier"

class Accueil extends Component {
  
  render() {
    let imgUrl = 'http://www.leparisien.fr/resizer/OHgkvKFl5Mm_hjOsnkhgPnQb6JU=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/NNRFOUDC2KR3NWBCMVGTYNM2SY.jpg'; 
    return (
      <div className="container-fluid">
        <Header />
        <div className="card card-image" id="header" style={{backgroundImage: 'url(' + imgUrl + ')', 
                                                          backgroundSize: 'cover', backgroundPosition: 'center center',backgroundRepeat: 'no-repeat',}}>
          <div className="text-white text-center rgba-stylish-strong py-5 px-4">
            <div className="py-5">
              <h2 id="h2accueil">VOUS ETES PASSIONNÉ DE CUISINE ?</h2>
              <p className="mb-4 pb-2 px-md-5 mx-md-5">
              Nous sommes <span id="spanheader">un centre de formation de cuisine</span>
              <br/> qui propose des ateliers à nos élèves à partir de 12 ans,<br/>
               mais aussi à des gens particuliers.<br/><br/>
               Des personnes qui veulent apprendre à  cuisiner afin de manger correctement.
              </p>
            </div>
          </div>
        </div>
        <Atelier/>
        <footer className="page-footer" id="footer">
              <center>
                <span><span id="spanfooter">RAKOTONDRAZANAKA bruno</span>© 2019 Copyright</span>
              </center>
        </footer>
      </div>
    )
  }
}
export default Accueil; 
