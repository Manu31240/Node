#!/usr/bin/env node
//version ES6
//const data = require('./contacts.json');

const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');
const path = './contacts.json';
const Contact = require('./contact.js');

/** Classe FileContacts */
class FileContacts {
  read(callback) {
    fs.readFile(path,function(err, data){
      if(err){
        console.error('pb');
      } else {
        const jsonData = JSON.parse(data);
        //console.log('jsonData', jsonData);
        const contacts = JSON.parse(data).map(contact => new Contact(contact));
        if(!!callback){
          callback(contacts);
        }
      }
      })
  }
  get(callback){
    this.read(callback);
  }
  write (contacts, callback){
    const contactsString = JSON.stringify(contacts);
    fs.writeFile(path, contactsString, callback);

  }
  add (firstName, lastName, callback){
    this.read(function(contacts){
      const maxId = _.chain(contacts)
      .sortBy(function(c){return c.id;})
      .last()
      .value()
      .id;
      const newContact = new Contact({
        id : maxId + 1,
        firstName : firstName,
        lastName : lastName
      });
      console.log(newContact);
      contacts.push(newContact);
      //ecrire les contacts maj dans le fichier
      this.write(contacts, callback);
    }.bind(this));
  }
  delete (callback){

  }

}




/** Classe MemoryContacts */
/*class MemoryContacts {
  constructor() {
    this.contacts = data.map(contact => new Contact(contact));
  }
  get(callback) {
    callback(this.contacts);
  }
}
$/
/** Classe Contacts, hérite de MemoryContacts */
class Contacts extends FileContacts {
  print() {
    this.get(contacts => console.log(contacts.join(', ')));
  }
}

/* Instanciation de 'Contacts' */
const myContacts = new Contacts();
