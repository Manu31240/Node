let personnes = require('./contacts.json');
let _ = require('./lib/underscore');

function Contact (id, firstName, lastName, address, phone) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.phone = phone;
}

Contact.prototype.toString = function () {
  //console.log(this.firstName.toUpperCase(), this.lastName)
  return this.lastName.toUpperCase() + ' ' + this.firstName.toUpperCase();
}

function MemoryContacts(){
  this.contacts = [];

  _.each(personnes, function(personne){
    this.contacts.push(new Contact(personne.id, personne.firstName, personne.lastName,personne.address, personne.phone));
  }.bind(this));
  /*this.contacts = _.map(personnes, function(personne){
  return new Contact(personne.id, personne.firstName, personne.lastName,personne.address, personne.phone));
})
*/
  this.get = function(callback){
    if (!!callback){
    callback(this.contacts);
    }
  }
  //console.log(personnes.length);
}

function Contacts() {
  function afficherContacts(contacts){
    console.log(contacts.join(","));

  }
  this.print = function(){
    this.get(afficherContacts);
  }
};

Contacts.prototype = new MemoryContacts();

let c = new Contact();
let mycontact = new Contacts();
mycontact.print();
