import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default class Tableau extends Component {

    constructor(props) {
        super(props);
        this.state = { profil: [] };
        
    }
    componentDidMount() {
       var test = []
        axios.get('http://localhost:8080/atelier')
            .then(response => {
                for(let i=0; i<response.data.length; i++){
                    if(response.data[i].id_user==localStorage.getItem('id_user')){
                        test.push(response.data[i])
                    }
                }
                console.log('produit tableau :', response.data)
                this.setState({ profil: test });
            })
            .catch(function (error) {
                console.log(error);
            })
           
    }

    liste() {
        return <div>
            <div id="listecomponent">
                    <h4 id="h4tableau">Ateliers  recents</h4>
                <table className="table table-striped table-bordered table-hover" id="table">
                    <thead>
                        <tr>
                            <th className="thtab">Images</th>
                            <th className="thtab">Nom</th>
                            <th className="thtab">Description</th>
                            <th className="thtab">Date</th>
                            <th className="thtab">horaire de debut</th>
                            <th className="thtab">Durée</th>
                            <th className="thtab">place disponible</th>
                            <th className="thtab">place reservé</th>
                            <th className="thtab">Prix</th>
                            <th className="thtab">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (this.state.profil.length > 0) ? (this.state.profil.map((obj) => {
                                return <tr key={obj._id}>
                                    <td><img id="imagetab" width="100px" height="90px" src={'http://localhost:8080/atelier/'+obj.photo_produit} alt={obj.photo_produit}/></td>
                                    <td>{obj.titre}</td>
                                    <td>{obj.description}</td>
                                    <td>{obj.date}</td>
                                    <td>{obj.horaire}</td>
                                    <td>{obj.duree} h</td>
                                    <td>{obj.place_dispo}</td>
                                    <td>{obj.place_reserve}</td>
                                    <td>{obj.prix}  Ar</td>
                                    <td> 
                                    <Link className="btn btn-primary" to={'/dashboard/atelier/'+obj._id}
 
                                    id="btn-modifier">Modifier</Link><br/>
                                 
                                   
                                 
                                    {obj.valid == true ?(<button id="bottondesactivez" className="btn btn-success" onClick={(e)=>{
                                        e.preventDefault()
                                        axios.get("http://localhost:8080/masqueratelier/"+obj._id).then(res=>{
                                            axios.get('http://localhost:8080/atelier')
                                            .then(response => {
                                                var test = []
                                                for(let i=0; i<response.data.length; i++){
                                                    if(response.data[i].id_user==localStorage.getItem('id_user')){
                                                        test.push(response.data[i])
                                                    }
                                                }
                                                console.log('produit tableau :', response.data)
                                                this.setState({ profil: test });
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            })
                                        console.log(res.data)
                                    })
                                    }}><i class="glyphicon glyphicon-minus-sign"></i>Desactiver</button>):(<button id="visual" onClick={(e)=>{
                                        e.preventDefault()  
                                        axios.get("http://localhost:8080/afficheatelier/"+obj._id).then(res=>{
                                            axios.get('http://localhost:8080/atelier')
            .then(response => {
                var test = []
                for(let i=0; i<response.data.length; i++){
                    if(response.data[i].id_user==localStorage.getItem('id_user')){
                        test.push(response.data[i])
                    }
                }
                console.log('produit tableau :', response.data)
                this.setState({ profil: test });
            })
            .catch(function (error) {
                console.log(error);
            })
                                    }
                                )

    }} className="btn btn-secondary" id="bottonactivez"><i class="glyphicon glyphicon-ok"></i>Activer</button>)}

                                   
</td>
                                    
                                </tr>
                            })) : ('Aucun atelier a ajouter')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
    render() {
        return (
            <div>
                {this.liste()}
            </div>
        );
    }
}