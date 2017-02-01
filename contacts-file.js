const fs = require('fs');
const _ = require('lodash');
const diff= require('./lib/diff');
const Contact = require('./contact');
const write = require('./write-implems');
const path = './contacts.json';

/** Classe FileContacts */
class FileContacts {
  constructor(){
  this.write = write.writePromises;
}
  watch(){
    this.read(function(contactsReference){
      //Appel le watch
      fs.watch(path, function(){
        //en callback on relit le fichier
        this.read(function(contactsAJour){
          //compare les deux listes de contacts
          const contactsDiff = diff(contactsReference, contactsAJour);
          //on affiche la difference
          console.log(contactsDiff);
          //on met a jour la liste de reference
          contactsReference = contactsAJour;
        })
      }.bind(this))

    }.bind(this));
  }

  /*write(contacts, callback){
    const contactsString = JSON.stringify(contacts);
    fs.writeFile(path, contactsString, callback);
  }*/

  add(firstName, lastName, address, phone, callback){
    this.read(function(contacts){
      const maxId = _.chain(contacts)
        .sortBy(function(c){ return c.id; })
        .last()
        .value()
        .id;

      const newContact = new Contact(
        {
          id: maxId + 1,
          firstName: firstName,
          lastName: lastName,
          address: address,
          phone: phone
        });
      contacts.push(newContact);
      //ecrire les contacts mis à jours dans le fichier
      this.write(contacts, callback);
    }.bind(this));
  }

  delete(id, callback){
    this.read(function(contacts){
      //recupere une liste sans le contact
      const fewerContact = contacts.filter(contact => contact.id != id);
      //ecrire les contacts mis à jours dans le fichier
      this.write(fewerContact, callback);
    }.bind(this));
  }

  read(callback){
    //fs.readFile(chemin, function callback qui gere les données du fichier)
    try{

      fs.readFile(path, function(err, data){
        if(err){
          console.error("Probleme pour recuperer", path, err);
        } else {
          try{
            const jsonData = JSON.parse(data);
            const contacts = jsonData.map(contact => new Contact(contact));

            if(!!callback){
              callback(contacts);
            }
          }catch(catchError){
            console.error("Probleme pour parser le json", catchError);
          }
        }

      })
    } catch(error){
      console.error("Probleme pour lire le fichier", path, err);
    }
  }

  get(callback) {
    this.read(callback);
  }
}


module.exports = FileContacts;
