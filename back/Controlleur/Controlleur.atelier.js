const Produit = require('../models/model.atelier');
const Particulier = require('../models/model.particulier');
const fs = require('fs');

//Create new profil
exports.create = (req, res) => {
    if(!req.body.titre) {
        return res.status(400).send({
            message: "profil content can not be empty"
            
        });
    }
    
    Produit.find()
    .then(user => {
        
        let id;
        if(user.length == 0){
            id = 0
        }else {
            id = parseInt(user[user.length - 1]._id) + 1
        }
        
        //images
        let imageFile = req.files.photo_produit;
        let nomImage = id
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
          
        });
        
    const produit = new Produit({    
        _id: id,
        id_user: req.body.id_user,
        titre: req.body.titre , 
        description: req.body.description,
        date: req.body.date,
        horaire: req.body.horaire,
        duree:  req.body.duree,
        place_dispo: req.body.place_dispo,
        place_reserve: req.body.place_reserve,
        prix: req.body.prix,
        photo_produit:'' + nomImage +'.jpg'
    });



    produit.save()
    .then(() => {
        Produit.find()
        .then(data=>{
            res.send(data);
            console.log(data);
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the profil."
            
        });
    });
})
};

exports.findAll = (req, res) => {   
    Produit.find()
    .then(users => {    
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving profils."
        });
    });
};



exports.delete_atelier =(req, res) =>{
    Produit.findById(req.params._id)
    .then(atelier =>
    atelier.remove().then(() =>
        res.json({
        success: true
        })
    )
    )
    .catch(err =>
    res.status(404).json({
        succes: false
    })
    )
}

exports.modifier = (req, res) => {
    
    if(!req.body.titre) {
        return res.status(400).send({
            message: "Atelier content can not be empty"
        });
    }
    console.log('parametre '+req.params.profilId)

    let imageFile = req.files.photo_produit;
     
        let nomImage = req.params.profilId
        res.setHeader('Content-Type', 'text/plain');

        imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
    
    
    Produit.findByIdAndUpdate(req.params.profilId, {
        titre: req.body.titre , 
        description: req.body.description,
        date: req.body.date,
        horaire: req.body.horaire,
        duree:  req.body.duree,
        place_dispo: req.body.place_dispo,
        place_reserve: req.body.place_reserve,
        prix: req.body.prix,
        photo_produit:'' + nomImage +'.jpg'
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.profilId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "eleve not found with id " + req.params.profilId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.profilId
        });
    });
};
exports.particulier = (req, res) => {
    Particulier.find().then(use=>{
        var id;
        if(use.length==0){
            id=0
        }
        else{
            id=use[use.length-1]._id+1
        }
        

        Produit.findById(req.params._id).then(use=>{
                const particulier = new Particulier({
                    _id:id,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    numtel:req.body.numtel,

                });
            Produit.findByIdAndUpdate(use._id, { _id:use.id,
                    id2:use.id2,
                    titre: use.titre,
                    description: use.description,
                    date: use.date,
                    horaire: use.horaire,
                    duree:use.duree,
                    place_reserve: use.place_reserve+1,
                    place_dispo: use.place_dispo-1,
                    prix:use.prix,
                    image:use.image,

                }).then(upd=>console.log(upd)
                )
                                particulier
                                    .save()
                                    .then(user => {
                res.json(user)
         }); 
    });
    }); 
    }

exports.masqueratelier  = (req,res)=>{
    Produit.findOneAndUpdate({ _id: req.params._id }, {
        valid: false

    }, { new: true }).then(upd => res.send(upd)
    )
}


exports.getaetelier = (req,res)=>{
    Produit.findOneAndUpdate({ _id: req.params._id }, {
        valid: true

    }, { new: true }).then(upd => res.send(upd)
    )
}


exports.modifatelier = (req,res)=>{
    console.log('ity ny requete'+req.body.nom) 

    let imageFile = req.files.photo_produit; 
console.log('inona ny ato o!'+imageFile) 
let nomImage = req.params._id
res.setHeader('Content-Type', 'text/plain');
imageFile.mv(`${__dirname}/public/${nomImage }.jpg`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  });
console.log(req.params._id);

console.log('tonga eto v nw') 
// Find and update eleve with the request body 
Produit.findOneAndUpdate({_id: req.params._id}, { 
    titre: req.body.titre, 
    prix: req.body.prix, 
    description: req.body.description, 
    horaire: req.body.horaire,
    date: req.body.date,
    photo_produit: ''+nomImage + '.jpg', 
    duree: req.body.duree, 
    place_dispo: req.body.place_dispo, 
    place_reserve: req.body.place_reserve,
}, { new: true }).then(user => { 
if (!user) { 
    return res.status(404).send(
        { 
            message: "eleve not found with id " + req.params._id 
        }); 
    } res.send(user); })
    .catch(err => {
if (err.kind === 'ObjectId') {
    return res.status(404).send(
        { 
            message: "eleve not found with id " + req.params._id 
        });
} 
return res.status(500).send(
    { 
        message: "Something wrong updating note with id " + req.params._id 
    });
}); 
}


exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./Controlleur/public/'+req.params.image)
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("ts lasa le sary o", e.stack);
    }
}