const express = require("express");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const socketio = require("socket.io");


function router(app, io, myContacts){

  //GET localhost:8080/rest/contacts
  //renvoie tout les contacts
  app.get('/rest/contacts', function(req, res) {
    //myContacts.get ...res.send
    /*myContacts.get(function(contacts){
      res.send(contacts);
    });*/

    myContacts.get(contacts => res.send(contacts));
  });

  //GET localhost:8080/rest/contacts/:id
  //renvoie le contact avec id => id
  app.get('/rest/contacts/:id', function(req, res) {
    var id = parseInt(req.params.id);
    myContacts.get(contacts => {
      //Recupere seulement le contact avec l'id
      var contact = contacts.find(contact => contact.id === id);
      res.send(contact);
    });

    //lit tout les contacts et renvoie uniquement "id"
  });

  //POST localhost:8080/rest/contacts/
  //cree le contact
  app.post('/rest/contacts', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    myContacts.add(firstName, lastName, () => res.sendStatus(200));

  })

  //PUT localhost:8080/rest/contacts/:id
  //met à jour le contact avec l'identifiant id
  app.put('/rest/contacts/:id', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var address = req.body.address;
    var phone = req.body.phone;
    var id = parseInt(req.params.id);

    myContacts.delete(id, () => myContacts.add(firstName, lastName, address, phone, () => res.sendStatus(200)));
  })
}
io.on('connection', function(socket){
  console.log("un client s'est connecté", socket.id);
});
myContacts.watchContacts(function(contacts){
  io.emit("contacts",contacts);
});

module.exports = function(contacts){
  const app = express();
  app.use(express.static('./public'));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  let server = app.listen(8080);
  let io = socketio.listen(server);

  router(app,io, contacts);



 }
