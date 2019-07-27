import React, { Component } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Atelier extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nom: '',
            prenom: '',
            email: '',
            numtel: '',
            profil: []
        };

        this.onChange = this.onChange.bind(this)
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        axios.get('http://localhost:8080/atelier')
            .then(response => {
                this.setState({ profil: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    Produit() {
        return <div className="container-fluid">
            <div className="row view-group" id="colonne">
                {this.state.profil.length > 0 ? (

                    this.state.profil.filter(us=>us.valid==true).map(user => (

                        <div class="item col-xs-3 col-lg-3" id="carte">

                            <div className="card card-cascade narrower card-ecommerce">
                                <img width="auto" id="imageproduit" height="230px" src={'http://localhost:8080/atelier/' + user.photo_produit} alt={user.photo_produit} />

                                <div className="card-body card-body-cascade">

                                    <center><h6 id="description"><span id="nomproduit">{user.titre}</span></h6></center>
                                    <div className="row">
                                        <div className="col-md-6">

                                            <p className="card-text"><strong><span id="description">Description</span></strong>&nbsp;&nbsp; <div id="point">{user.description}</div> </p>
                                            <p className="card-text"><strong><span id="description">Date</span></strong>&nbsp;&nbsp; <div id="point">{user.date}</div> </p>
                                            <p className="card-text"><strong><span id="description">Nombre de place disponible</span></strong>&nbsp;&nbsp; <div id="point">{user.place_dispo}</div> </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="card-text"><strong><span id="description">Horaire de debut</span></strong>&nbsp;&nbsp; <div id="point">{user.horaire}</div> </p>
                                            <p className="card-text" id="colonne2"><strong><span id="description">Durée de l'atelier</span></strong>&nbsp;&nbsp; <div id="point">{user.duree}</div> </p>
                                            <p className="card-text"><strong><span id="description">Nombre de place reserve</span></strong>&nbsp;&nbsp; <div id="point">{user.place_reserve}</div> </p>
                                        </div>
                                    </div>
                                    <span className="spanprix">
                                        <strong>Prix: {user.prix} €</strong>
                                    </span><br />

                                    <span class="float-right">

                                        <button className="btn btn-primary"
                                            onClick={() => {
                                                confirmAlert({
                                                    customUI: ({ onClose }) => {
                                                        return (
                                                            <div id="div1" className="peach-gradient">

                                                                <div className="row">
                                                                    <div className="col-md-10"></div>
                                                                    <div className="col-md-2"><button id="bouttonx" className="btn peach-gradient" onClick={onClose}>X</button></div>
                                                                </div>

                                                                <h2 id="h2popups">S'inscrire de l'atelier : {user.titre}</h2>
                                                                <input required className="zonetext2" name="nom" onChange={this.onChange} value={this.state.value} placeholder="Entrer votre nom" /><br></br>
                                                                <input required className="zonetext2" name="prenom" placeholder="Entre votre prénom" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="email" placeholder="Entrer votre e-mail" onChange={this.onChange} value={this.state.value} /><br></br>
                                                                <input required className="zonetext2" name="numtel" placeholder="Entre votre numero de téléphone" onChange={this.onChange} value={this.state.value} /><br/><br></br>
                                                                <button 
                                                                    onClick={() => {
                                                                        axios.post("http://localhost:8080/particulier/" + user._id, {
                                                                            nom: this.state.nom,
                                                                            prenom: this.state.prenom,
                                                                            numtel: this.state.numtel,
                                                                            email: this.state.email
                                                                        }).then(res => {
                                                                            axios.get("http://localhost:8080/atelier").then(res => {

                                                                                this.setState({ profil: res.data })
                                                                            })
                                                                        })
                                                                        onClose();
                                                                      
                                                                    }}
                                                                    className="btn btn-primary"     id="bouttonconfirmer" >
                                                                    Confirmer
                                                                        </button>
                                                                <button onClick={onClose} id="bottonanuler" className="btn btn-secondary">Annuler</button>
                                                            </div>
                                                        );
                                                    }
                                                });
                                            }}
                                            id="inscrire-btn">S'inscrire</button>

                                    </span>

                                </div>
                            </div>

                        </div>

                    ))
                ) : (
                        <div>
                            <h3 id="h3vide">Aucun Atelier Publié</h3>
                        </div>
                    )}
            </div>

        </div>
    }
    render() {
        return (
            <div>
                {this.Produit()}
            </div>
        );
    }
}
export default Atelier; 
