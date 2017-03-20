const denodeify = module.require('denodeify');
const fs = require('fs');
const co = require('co');

const readFile = denodeify(fs.readFile);
const writeFile = denodeify(fs.writeFile);
const unlink = denodeify(fs.unlink);


const rename = denodeify(fs.rename);
const path = "./contacts.json";
const backupPath = path + "Bkp";



module.exports.writeCallback = function write(contacts, callback){
  const contactsString = JSON.stringify(contacts);
  fs.writeFile(path, contactsString, callback);

}


module.exports.writePromises = function write(contacts){
  return readFile(this.path)
  .then(function(data){
    console.log("lecture du fichier");
    return writeFile(backupPath, data);
  }). then (function(){
    console.log("backup ecrit");
    return writeFile(path, JSON.stringify(contacts))
    .then ( function success() {
      //supprime bkp
      console.log("Ecrirtue du fichier ok");
      return unlink(backupPath)
    },
    function error(){
      // renomme bkp
      console.log("ecriture du fichier ko, on recupere le fichier backup")
      return rename(backupPath, path);
    }
  )
}).then(() => {
  if(!!callback){
    callback(null, "ok")
  }
})
.catch((err) =>
callback(err, "ko"))

}
module.exports.writeGenerators = function write(contacts, callback){

  return co(function*(){
    const data = yield readFil(path);
    yield writeFile(backupPath, data);
    try{
      //ecrit le fichier
      yield writeFile(path, JSON.stringify(contacts));
    } catch(err){
      //renomme backup en normal
      yield rename(backupPath, path);
    } finally{
      //supprime => unlink
      yield unlink(backupPath);
    }
  })
  . then(function success(data){ callback(data);}, function error(err){})
  .catch(callback)
}
