//version ES6


let personnes = require('./contacts.json');
let _ = require('./lib/underscore');
var colors = require('colors');
var program = require('commander');

function Contact (id, firstName, lastName, address, phone) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.phone = phone;
}

Contact.prototype.toString = function () {
  //Console.log(this.firstName.toUpperCase(), this.lastName)
  return this.lastName.toUpperCase().blue + ' ' + this.firstName.toUpperCase().red;
}

function MemoryContacts(){
  this.contacts = [];

  _.each(personnes, function(personne){
    this.contacts.push(new Contact(personne.id, personne.firstName, personne.lastName,personne.address, personne.phone));
  }.bind(this));
  /*personnes.forEach(function(personne){
  this.contacts.push(new Contact(personne.id, personne.firstName, personne.lastName,personne.address, personne.phone));
}.bind(this));*/
  /*this.contacts = _.map(personnes, function(personne){
  return new Contact(personne.id, personne.firstName, personne.lastName,personne.address, personne.phone));
});*/
  this.get = function(callback){
    if (!!callback){
    callback(this.contacts);
    }
  }
  //console.log(personnes.length);
}

function Contacts() {
  //Fonction qui sera utilisée comme callback
  function afficherContacts(contacts){
    //Affiche les contacts...
    console.log(contacts.join(","));

  }
  this.print = function(){
    this.get(afficherContacts);
  }
};
// On fait "heriter" Contacts de MemoryContacts via le prototype
Contacts.prototype = new MemoryContacts();

//let c = new Contact();
let mycontact = new Contacts();
mycontact.print();
