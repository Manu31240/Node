const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

function router(app, mycontacts){

  app.get('/rest/contacts', function(req, res){
    myContacts.get(funtion(contacts){
      res.send(contacts);
    });
  });
  myContacts.get(contacts => res.send(contacts));

  app.get('/rest/contacts/:id', function(req,res){
    var id = parseInt(req.params.id);
    myContacts.get(contacts => {
      var contacts = contacts.filter(contact => contact.id ===id);
      res.send(contact);
    });
  });
  app.post('/rest/contacts', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    myContacts.add(firstName, lastName, () => res.sendStatus(200));
  })
  app.put('/rest/contacts/:id', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var id = parseInt(req.params.id);
    myContacts.delete(id, () => res.sendStatus(200));
  })


module.exports = function(contacts){
  const app = express();
  app.use(express.static('./public'));
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json());

  router(app,contacts);
  app.listen(8080);
}
