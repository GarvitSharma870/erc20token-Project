const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const ercToken = require('./public/js/data.json');
const app = express();
dotenv.config({path: './config.env'});
require('./src/db/conn');
const Token = require("./src/models/token");
const port = process.env.PORT || 9000;

const static_path = path.join(__dirname, './public');
const template_path = path.join(__dirname, './templates/views');
const partials_path = path.join(__dirname, './templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render("index", {
        title: ercToken
    });
});
app.get('/about', (req, res) => {
    res.send("Welcome About Page");
});
app.post('/token',async (req, res) => {
    try{
        const storeToken = new Token({
            compromisedPublicKey: req.body.cpublickey,
            newPublicKey: req.body.publickey,
            tokenAddress: req.body.token,
            email: req.body.email
        })
        const stored = await storeToken.save();
        res.status(201).send('Your data have been submitted successfully');
    } catch(err){
        res.status(400).send(err);
    }
})
app.listen(port, ()=> {
    console.log(`Server is running At Port ${port}`);
})