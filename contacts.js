let personnes = require('./contacts.json');
let _ = require('lodash');
var colors = require('colors');
const program = require('commander');

program
  .version('0.0.1')
  .option('-c, --colors', 'Add colors')
  .command("list")
  .action(function(){
    let myContacts = new Contacts();
  })

  program.parse(process.argv);
  console.log(program.colors);

function Contact (id, firstName, lastName, address, phone) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.address = address;
  this.phone = phone;
}

Contact.prototype.toString = function () {
  //Console.log(this.firstName.toUpperCase(), this.lastName)
  if(!!program.colors){
    return this.lastName.toUpperCase().blue + ' ' + this.firstName.toUpperCase().red;
  }else{
    return this.lastName.toUpperCase()+ ' ' + this.firstName.toUpperCase();

  }
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
