import React from 'react';
import { MDBIcon,MDBCol,MDBInput,MDBCard, MDBCardBody} from "mdbreact";

class Modifatelier extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        titre: '',
        description:'',
        date: '',
        horaire: '',
        duree: '',
        place_dispo: '',
        place_reserve: '',
        photo_produit:'',
        prix: '',
    }
    this.onChange = this.onChange.bind(this)
    this.handleUploadImage = this.handleUploadImage.bind(this);
}

onChange(event) {
  this.setState({
    [event.target.name]: event.target.value
  })
}
handleUploadImage(ev) {
  ev.preventDefault();

  const data = new FormData();
    data.append('photo_produit', this.uploadInput.files[0]);
    data.append('titre',this.state.titre);
    data.append('description',this.state.description);
    data.append('date',this.state.date);
    data.append('horaire',this.state.horaire);
    data.append('duree',this.state.duree);
    data.append('place_dispo',this.state.place_dispo);
    data.append('place_reserve',this.state.place_reserve);
    data.append('prix',this.state.prix);

  fetch('http://localhost:8080/atelier/'+ this.props.match.params.id, {
    method: 'PUT',
    body: data,
  }).then((response) => {
      
    response.json().then((body) => {
      this.setState({ image: `http://localhost:8080/atelier/${body.photo_produit}` });
      console.log('ity ilay body. photo ovaina o :', body.photo_produit);

    });
  });
}

  render() {
    return (
        <div className="container-fluid"> 
        <div className="row">
         <div className="col-md-4">
         </div>
         <div className="col-md-4">
         <MDBCol md="12">
           <MDBCard width="50%">
             <MDBCardBody>
               <form  onSubmit={this.handleUploadImage}>
                 <p className="h4 text-center py-4" id="pdash">Modifier atelier</p>
                 <div className="grey-text">
                   <MDBInput
                     label="Nom du l'atelier"
                     group
                     type="text"
                     validate
                     success="right" value={this.state.value}  onChange={this.onChange} name="titre"
                     required
                   />
                   <MDBInput
                     label="Déscription"
                     group
                     type="text"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange} name="description"
                     required
                   />
                   <MDBInput
                     label="Date"
                     group
                     type="date"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange} name="date"
                     required
                   />
                    <MDBInput
                     label="horaire de debut"
                     group
                     type="time"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange}  name="horaire"
                     required
                   />
                    <MDBInput
                     label="Duree de l'atelier"
                     group
                     type="number"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange}  name="duree"
                     required
                   />
                    <MDBInput
                     label="Nombre de place disponible"
                     group
                     type="number"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange}  name="place_dispo"
                     required
                   />
                    <MDBInput
                     label="Nombre de place reservé"
                     group
                     type="number"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange}  name="place_reserve"
                     required
                   />
                   <MDBInput
                     label="Prix de l'atelier (€)"
                     group
                     type="text"
                     validate
                     success="right" value={this.state.value} onChange={this.onChange}  name="prix"
                     required
                   />
                   <label className="btn btn-default btn-file" id="fichier">
                    Image de l'atelier<input ref={(ref) => { this.uploadInput = ref; }} type="file" name="photo_produit"   required/>
                 </label>
                 </div>
                 <div className="text-center">
                 <div className="text-center mt-4">
               <button className="btn btn-outline-warning" type="submit" id="ajouter_boutton">
                    Modifier
                 <MDBIcon icon="paper-plane" className="ml-2" />
               </button>
             </div>
             </div>
               </form>
             </MDBCardBody>
           </MDBCard>
         </MDBCol>
         </div>
         <div className="col-md-4">

         </div>
        </div> 
     </div>

    );
  }
}

export default Modifatelier;