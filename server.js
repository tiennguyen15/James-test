/**
 * Created by Admin on 04-06-17.
 */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// View Engine
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware
app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',err=>{
        if(err){
            console.log(`unable to append to the server`);
        }
    })
    next();
})
app.use((req,res,next)=>{
    res.render('maintainance.hbs')
    //next();
})

// static public
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});


// APIs
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});


app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res)=> {
    res.send({
        errMessage: 'Unable handle request'
    })
});

app.listen(3000, ()=> {
    console.log('The server listening on port 3000');
})