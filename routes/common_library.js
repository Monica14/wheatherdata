var express = require('express');
var router = express.Router();
var mysql = require('mysql');
// var base_url = window.location.origin;

con = mysql.createConnection({
	     host: "localhost",
	     user: "root",
	     password: "monica@123",
	     database: 'rewards'
});

// var ajax = function(data,url)
// {
// 	$.ajax({
//     		type : 'post',
//             dataType: 'json',
//             data : data,
//     		url: base_url+url,
//             success : function(data)
//             {
//                 alert(data);
//             }
//     	});
// }

var tablenames = function(dbname,callback)
{
	finalstr1 = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='"+dbname+"' ";
	con.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var databasenames = function(callback)
{
	finalstr1 = "show DATABASES";
	con.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var columnedit = function(dbname,tablename,field_data,field_list,callback)
{
  //ALTER TABLE `form_name` CHANGE `name` `name` VARCHAR(16)
  tablename = tablename.trim();
  finalstr1 = "ALTER TABLE `"+tablename+"` CHANGE "+field_data;
  console.log(finalstr1);
  var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "monica@123",
         database: "rewards"
    });
  con1.query(finalstr1, function (err,     result) {
    if(err){
      callback(err,null);
    
    }

    else{
      callback(null,result);
    }
    });
}

var columnadd = function(dbname,tablename,field_list,callback)
{
	finalstr1 = "ALTER TABLE "+tablename+" ADD COLUMN "+field_list;
	var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "monica@123",
         database: dbname.trim()
    });
	con1.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var columndel = function(dbname,tablename,field_list,callback)
{
	finalstr1 = "ALTER TABLE `"+tablename+"` DROP `"+field_list+"`";
  console.log(finalstr1);
	var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "monica@123",
         database: dbname
    });
	con1.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var columnlist = function(dbname,tablename,field_list,callback)
{
  var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "monica@123",
         database: 'rewards'
    });
	finalstr1 = "select * from information_schema.columns where table_schema = 'rewards' and table_name = '"+tablename+"'";
	console.log(finalstr1);
	con1.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var columnlistnew = function(dbname,tablename,field_list,callback)
{
  finalstr1 = "select * from information_schema.columns where table_schema = '"+dbname+"' and table_name = '"+tablename+"' ";
  var con1 = mysql.createConnection({
         host: "localhost",
         user: "root",
         password: "monica@123",
         database: dbname.trim()
    });
  con1.query(finalstr1, function (err,     result) {
    if(err){
      callback(err,null);
    
    }

    else{
      callback(null,result);
    }
    });
}

var insert = function(table,data,callback)
{
	con = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "monica@123",
       database: 'rewards'
});
	str = "insert into "+table+" (";
	for(ans in data){
		str+= ans + ","
	}
	finalstr= str.slice(0,-1);
	finalstr+=")";

	finalstr+=" values ('";
	for(ans in data){
		finalstr+= data[ans] + "','"
	}
	finalstr1= finalstr.slice(0,-2);
	finalstr1+=")";
	console.log(finalstr1);

	con.query(finalstr1, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var select = function(table,where,callback)
{
	con = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "monica@123",
       database: 'rewards'
});
	query = "select * from "+table+" "+where;
	console.log(query)
	con.query(query, function (err,     result) {
   	if(err){
   		callback(err,null);		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var selectdist = function(table,where,dist,callback)
{
	con1 = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "monica@123",
       database: 'rewards'
});
	query = "select distinct "+dist+" from "+table+" "+where;
	console.log(query);
	con1.query(query, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}

   	else{
   		callback(null,result);
   	}
    });
}

var update = function(table,setval,where,callback)
{
	//console.log(setval);	
	str = "update `"+table+"` set ";
	//console.log(setval);
	for(ans in setval)
	{		
		str += ans+'= "'+setval[ans]+'" ,'
	}
	str = str.slice(0,-1);
	str = str+where;
	//console.log(str);
	con.query(str, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}
   	else{
   		callback(null,result);
   	}
    });
}

var deleterecord = function(table,setval,where,callback)
{
  con = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "monica@123",
       database: 'rewards'
  });
	str = "DELETE FROM `"+table+"` "+where;	
	console.log(str);
	con.query(str, function (err,     result) {
   	if(err){
   		callback(err,null);
		
   	}
   	else{
   		callback(null,result);
   	}
    });
}


module.exports = {
	insert : insert,
	update : update,
	deleterecord : deleterecord,
	select : select,
	selectdist : selectdist,
	tablenames : tablenames,
	databasenames : databasenames,
	columnadd : columnadd,
	columndel : columndel,
	columnlist : columnlist,
  columnedit : columnedit
}
