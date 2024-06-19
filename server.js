 //lordS
const express=require('express');
const app=express();

const db=require('./db');
require('dotenv').config();
const bodyParser=require('body-parser');
app.use(bodyParser.json());

const Person=require('./models/Person')
const MenuItem=require('./models/MenuItem');

//simple get 
app.get('/',(req,res)=>
{
    res.send("Hello world");
})



//import the router file (personRoutes)
const personRoutes=require('./routes/personRoutes');
const MenuRoutes=require('./routes/menuRoutes');
//use the routers
app.use('/person',personRoutes);
app.use('/menu',MenuRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>
{
    console.log('server started successfully')
})