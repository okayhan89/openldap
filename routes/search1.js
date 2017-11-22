var express = require('express');

var router = express.Router();

'use strict';
/* GET search listing. */
router.get('/', function(req, res, next) {

  function cback(msg){
     res.send(msg);
  };
  abc(cback);

});

function abc(cf){
var ldap = require('ldapjs');
const assert = require('assert');
var msg = new Object();
var arr = new Array();

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
  client.search('dc=btvg2, dc=com', opts, function(err, res) {
debugger;
    assert.ifError(err);
    res.on('searchEntry', function(entry) {
	if(entry.object.uid != null && entry.object.uid != undefined && entry.object.givenName != null){
     		
		var data = entry.object.uid
		arr.push(data);
		//arr.push(entry.object.uid);
     		//arr.push(entry.object.givenName);
		console.log(arr);
	}
    });
    res.on('searchReference', function(referral) {
    });
    res.on('error', function(err) {
    });
    res.on('end', function(result) {
      msg.data = arr;
      cf(msg);
    });
  });

});
return msg;
}
module.exports = router;

