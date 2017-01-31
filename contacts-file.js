/** Classe FileContacts */
class FileContacts {

  read(callback) {
    fs.readFile(path,function(err, data){
      if(err){
        console.error('pb');
      } else {
        try{
        const jsonData = JSON.parse(data);
        //console.log('jsonData', jsonData);
        const contacts = JSON.parse(data).map(contact => new Contact(contact));
        if(!!callback){
          callback(contacts);
        }
      } catch(err){
        console.error('pb', err);
      }
      }
    })
  }
