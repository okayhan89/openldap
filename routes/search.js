var express = require('express');

var router = express.Router();

'use strict';
/* GET search listing. */
router.get('/', function(req, res, next) {
//  var cn = req.param('cn');
//  console.log(cn);
//  process.exit(0);

  function cback(msg){
     //console.log('msg : ' + JSON.stringify({data : msg}));
     console.log('msg : ' + msg + '------------------');
     //console.log(msg + "========1");
     res.send(msg);
     //res.send(JSON.stringify({"data" : msg}));
     //res.send(msg);
  };
  abc(cback);

});

function abc(cf){
var ldap = require('ldapjs');
const assert = require('assert');
var msg= '{ \"data\" : [';

var client = ldap.createClient({
  url: 'ldap://localhost:389',
  connectTimeout: 5000, //milliseconds
  idleTimeout: 60000,   //milliseconds
});
debugger;

var opts = {
  scope: 'sub',
//  filter: '(&(cn=*)(objectclass=top))',
//  filter: '(|(sn=k*)(email=l*))',
//filter: '(&(objectclass=groupOfUniqueNames))',
//filter: '(&(cn=s*)(email=*)(objectclass=top)(objectclass=person))',
//  filter: '(&(objectclass=top))',
//attributes: ['cn', 'sn', 'email'],
attributes: [],
//attributes: ['cn', 'sn'],
//attributes: ['createTimestamp', 'modifyTimestamp', 'creatorsName', 'cn', 'sn', 'o', 'description', 'userpassword', 'mobile', 'mail', 'uniquemember', 'objectclass'],
//  attrsOnly: '',
//  sizeLimit: '',
//  timeLimit: '',
//  paged: ''
};
debugger;

client.bind('cn=admin,dc=btvg2,dc=com', 'g2Arch1!', function(err, res) {
  assert.ifError(err);
  //console.log(res);

//  client.add('cn=smint, o=joyent', entry, function(err, res) {

  client.search('dc=btvg2, dc=com', opts, function(err, res) {
debugger;
    assert.ifError(err);
    //console.log(res);

    res.on('searchEntry', function(entry) {
      //console.log('entry: ' + JSON.stringify(entry.object.uid));
      //console.log('b : ' + msg );
      //msg +=  JSON.stringify(entry.object.uid);
    //  console.log('----------------'+entry.object.uid);
      
	if(entry.object.uid != null && entry.object.uid != undefined){
      //msg.push(entry.object.uid);
      msg += ' [\"' + entry.object.uid +'\"], ';
}
      //msg.push(1);
      //var a = JSON.stringify(entry.object.uid);
      //a = a+',';
      //msg += a;
      //console.log('msg: ' + msg);
    });
    res.on('searchReference', function(referral) {
      //console.log('referral: ' + referral.uris.join());
    });
    res.on('error', function(err) {
      //console.error('error: ' + err.message);
    });
    res.on('end', function(result) {
      //console.log('status: ' + result.status);
      msg=msg.substring(0, msg.length -2 );
      msg += '] }';
	console.log("--------------------------------------------------------------");
      cf(msg);
    });
  });

});
return msg;
}
module.exports = router;

