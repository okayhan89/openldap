var express = require('express');

var router = express.Router();

'use strict';
/* GET search listing. */
router.get('/', function(req, res, next) {

  function cback(msg){
  	//console.log(msg);
    res.json(msg);
  };
  abc(cback);

});

function abc(cf){
var ldap = require('ldapjs');
const assert = require('assert');
var msg = new Object();
//var arr = new Array();
var arr1 = new Array();
var count= 1;
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
attributes: ['createTimestamp', 'modifyTimestamp','uid','givenName','sn','mail','controls'],
//attributes: ['uid','givenName','sn','mail'],
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
	if(entry.object.uid != null && entry.object.uid != undefined ){
     		var arr = new Array();
		arr.push(entry.object.uid);
    console.log(entry.object);
    arr.push(entry.object.givenName);
    arr.push(entry.object.sn);

    //arr.push(entry.object.dn);

    var strArr = entry.object.dn.split(',');
    arr.push(strArr[1].substring(3,8));
    //console.log(strArr[1]);
		//arr.push('abc');
     		//arr.push(count++);
		arr1.push(arr);
		//arr1.push(arr);
     		//arr.push(entry.object.givenName);
		//console.log(arr);
	}
    });
    res.on('searchReference', function(referral) {
    });
    res.on('error', function(err) {
    });
    res.on('end', function(result) {
//	var arr1 = new Array();
//	arr1.push(arr);
      msg.data = arr1;
      cf(msg);
      client.unbind();
    });
  });

});
return msg;
}
module.exports = router;
