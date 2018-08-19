const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

let server = express();

//middleware to register partials.....
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase(text);
})

server.set('view engine','hbs');

//middleware to write log...
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

server.get('/',(req,res) => {
	res.render('home.hbs',{
		headTitle:'Home Page',
		welcomeMessage:'Welcome to my home page!',
	})
})

server.get('/about',(req,res)=>{
	res.render('about.hbs',{
		headTitle: 'About Page',
		paraDetail: 'This is a sample paragraph',
	});
})

server.get('/project',(req,res)=>{
    res.render('project.hbs',{
        headTitle: 'Portfolio Page',
        portfolioMessage: 'This is the project portfolio page',
    });
})

server.get('/bad',(req,res)=>{
	res.send({
		errorMessage: 'This is a bad request'
	})
})



server.listen(port, () =>{
	console.log('listening on port :' + port );	
});
