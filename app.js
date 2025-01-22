const express=require('express');
const path=require('path');
const app=express();
const port=8000;
const mongoose=require('mongoose');
const { error } = require('console');
const { type } = require('os');
mongoose.connect('mongodb+srv://het:4xfFHJkqjDjym8Az@mongodb.xc2fb.mongodb.net/het');
app.use('/static',express.static('static'));
app.use(express.urlencoded());
app.set('views',path.join(__dirname,'views'));
const UserCont=new mongoose.Schema({
    Name:{type:String,required:true},
    Phone:{type:String,required:true,unique:true},
    Email:{type:String,required:true,unique:true},
    Your_Concern:{type:String},
});
const contact=mongoose.model('contact',UserCont);
console.log('connected successfully');
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'views','index.html'))
});
app.get('/home',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'views','index.html'))
});
app.get('/contact',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'views','contact.html'));
});
app.use(express.json()); // Middleware to parse JSON
app.post('/contact', async (req, res) => {
    try {
        const { name, phone, email, desc } = req.body;
        const cont = new contact({
            Name: name,
            Phone: phone,
            Email: email,
            Your_Concern: desc,
        });

        await cont.save();
        res.status(200).json({ message: 'Contact Saved' }); // Send a JSON response
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).json({ message: 'An Error Occurred' });
    }
});
app.listen(port,()=>{
   console.log(`this port successfully run on port ${port}`)
});