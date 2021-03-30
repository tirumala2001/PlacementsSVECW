var express = require('express')  
var app = express()  
  
var mongojs = require('mongojs');

 app.use(express.static('public'));
 app.set('view engine', 'ejs');  

var cString="mongodb+srv://tirumala:tirumala@cluster0.di2ga.mongodb.net/placementPortal?retryWrites=true&w=majority";
var db = mongojs(cString, ["studentDetails"]);

app.get('/', function (req, res) {

res.sendFile(__dirname+"/public/Login.html")  

})  

app.get('/signupSubmit',function(req,res){

	var d={
		regd : req.query.regd,
		name : req.query.name,
		email : req.query.email,
		passsword : req.query.password
	}
	db.studentDetails.insert(d,function(err,docs){
		if(err){
			res.send("Something went wrong! please try again")
		}
		else{
			db.internships.find({},function(err,docs){
			res.render("studentDashboard",{data: docs})
		})
		}
	})
	console.log(req.query.regd)
})

app.get('/loginSubmit',function(req,res){
	
	var d= {
		email : req.query.email,
		passsword : req.query.password
	}
	db.studentDetails.find(d,function(err,docs){
		if(err){
			res.send("Something went wrong! please try again")
		}
		if(docs.length>0){
			db.internships.find({},function(err,docs){
			res.render("studentDashboard",{data: docs})
	})
		}
		else{
			res.send("please check yourname and password")
		}
	})
	console.log(req.query.email)
})

app.get('/facultySignupSubmit',function(req,res){

	var d={
		name : req.query.name,
		email : req.query.email,
		passsword : req.query.password
	}
	db.facultyDetails.insert(d,function(err,docs){
		if(err){
			res.send("Something went wrong! please try again")
		}
		else{
			res.sendFile(__dirname+"/public/facultydashboard.html")
		}
	})
	console.log(req.query.name)
})

app.get('/facultyLoginSubmit',function(req,res){
	
	var d= {
		email : req.query.email,
		passsword : req.query.password
	}
	db.facultyDetails.find(d,function(err,docs){
		if(err){
			res.send("Something went wrong! please try again")
		}
		if(docs.length>0){
			res.sendFile(__dirname+"/public/facultydashboard.html")
		}
		else{
			res.send("please check yourname and password")
		}
	})
	console.log(req.query.email)
})

app.get('/jobOppertunitySubmit',function(req,res){

	var d={
		company : req.query.company,
		type : req.query.type,
		position : req.query.position,
		package : req.query.package,
		eligible : req.query.eligible,
		duration : req.query.duration
	}
	if(d.type=="internship"){
		db.internships.insert(d,function(err,docs){
		if(err){
			res.send("Something went wrong! please try again")
		}
		else{
			res.sendFile(__dirname+"/public/facultydashboard.html")
		}
	})
	console.log(req.query.name)

	}
	else{
		db.drive.insert(d,function(err,docs){
		if(err){
			res.send("Something went wrong! please try again")
		}
		else{
			res.sendFile(__dirname+"/public/facultydashboard.html")
		}
	})
	console.log(req.query.name)

	}
})

app.get('/studentdash',function(req,res){
	
	db.drive.find({},function(err,docs){
			res.render("studentDashboard1",{data: docs})
	})
})

app.get('/studentdash1',function(req,res){
	
	db.internships.find({},function(err,docs){
			res.render("studentDashboard",{data: docs})
	})
})


 app.listen(3005, function () {  
console.log('Example app listening on port 3000!')  
})
