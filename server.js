const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let server = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase(text);
})

server.set('view engine','hbs');


let use = server.use((req, res, next)=> {
    let now = new Date().toString();
    console.log(`${now} ${req.method} ${req.url}`);
    fs.appendFileSync('serverLog',`\n${now} ${req.method} ${req.url}`);
    next();
});

// server.use((req,res,next) =>{
// 	res.render('maintenance.hbs');
// });

server.use(express.static(__dirname + '/public'));

server.get('/home',(req,res) => {
	res.render('home.hbs',{
		headTitle:'Home Page',
		welcomeMessage:'Welcome to my home page!',
	})
})

server.get('/about',(req,res)=>{
	res.render('about.hbs',{
		headTitle: 'About Help',
		paraDetail: 'This is a sample paragraph',
	});
})

server.get('/bad',(req,res)=>{
	res.send({
		errorMessage: 'This is a bad request'
	})
})


let port = 8080;
server.listen(port, () =>{
	console.log('listening on port :' + port );	
});
